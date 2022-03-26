# メモ
## 作業手順
- homebrew でNode.js 14.xをインストール
  - `brew install node@14`
- asdf でバージョンを14.19.0に指定
  - `asdf local nodejs 14.19.0`
- `shelf/server` というディレクトリ階層を作る
- Serverless Framework の設定
  - `server` 以下に Serverless Framework のインストール
    - `npm install -g serverless`
  - AWSのアクセスキーを登録(事前にデプロイ用のユーザーを登録しておく)
    - `serverless config credentials --provider aws --key xxxxxxx --secret xxxxxxx`
  - TypeScriptのテンプレートを作成
    - `serverless create --template aws-nodejs-typescript`
    - `npm install`
  - Serverless Framework でデプロイ
    - プロジェクトのフォルダで `serverless deploy`
    - テスト `curl -X POST -H "Content-Type: application/json" -d '{"name": "Suzuki"}' https://2ih3jbhm1f.execute-api.us-east-1.amazonaws.com/dev/hello`
      - `message` に`Hello Suzuki, welcome to the exciting Serverless world!` が入っていればOK！
  - ローカルでAPI GatewayやLambdaを実行できるようにする(yarn workspace を導入してから)
    - [参考](https://qiita.com/noralife/items/e36621ddd0e5b8ff4447)
    - `serverless-offline` プラグインを入れる
      - `yarn add serverless-offline -D `
      - `server/serverless.ts` の `plugins` に `serverless-offline` を追加
    - `yarn sls offline` を実行し、ローカルにdeploy(停止する時は、起動したshellで`ctrl + C`)
    - `curl -X POST -H "Content-Type: application/json" -d '{"name": "Suzuki"}' http://localhost:3000/dev/hello` を実行し、`message` に`Hello Suzuki, welcome to the exciting Serverless world!` が入っていればOK！
- レポジトリをyarnで管理する
  - [参考](https://classic.yarnpkg.com/lang/en/docs/workspaces/)
  - ルートにpackage.jsonを追加
  - serverディレクトリに`cross-env`依存を追加
- メッセージをdynamoDBからとってくるようにする
  - DynamoDBのローカル環境をセットアップする
    - 起動にjavaが必要なのでインストールする `sudo apt install default-jre`
    - [参考](https://qiita.com/noralife/items/e36621ddd0e5b8ff4447)
    - `yarn add serverless-dynamodb-local -D `
    - `server/serverless.ts` の `plugins` に `serverless-dynamodb-local` を追加
    - `yarn sls dynamodb install` を実行し、DynamoDB Localをインストール
    - `server/serverless.ts` に以下の設定を行う
```
   custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        port: 8000,
        heapInitial: "200m",
        heapMax: "1g",
        inMemory: true,
        migrate: true,
        seed: true,
        convertEmptyValues: true,
      },
      seed: {
        dev: {
          sources: [
            { table: "greeting", sources: ["./seed/devGreeting.json"] },
          ],
        },
      },
    },
  },
  resources: {
    Resources: {
      greetingTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "greeting",
          AttributeDefinitions: [
            {
              AttributeName: "code",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "code",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
```
    - `yarn sls dynamodb start` で起動
    - [NoSQL Workbench](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/workbench.settingup.html)を手順に従ってインストール
    - `Operation builder` を選択し、Add connectionで新たにコネクションを追加
    - `greeting` が追加されていればOK！
  - TypeScript × DynamoDB は[こちら](https://maku.blog/p/5mv5dkt/)が非常に参考になる 
- dynamodb-localとserverless-offlineの起動をしやすくする 
  - serverの`package.json` に `scripts` を追加し、`"deploy-server-local": "yarn sls offline"` と `"deploy-db-local": "yarn sls dynamodb start",`を追加する。
  - 1コマンドで実行できるように、`yarn add npm-run-all --dev` で `npm-run-all` をインストール
  - `scripts` に 上記をまとめて実行する `"deploy-local": "run-p -s deploy-db-local deploy-server-local"` を追加
  - shelf の `package.json` に `scripts` を追加し、`"deploy-server-local": "yarn workspace server deploy-local"` を追加。
  - shelf ディレクトリ以下で `yarn deploy-server-local` を実行し、dynamoDBが見れることを確認

## LambdaからDynamoDBのデータを読み込む
hello/handler.tsにDynamoDBからデータをとって来てリクエストを返すという実装を入れる
### DynamoDB用のSDKを入れる
- server以下で以下を実行
  - `yarn add @aws-sdk/client-dynamodb` : DynamoDBのクライアント
  - `yarn add @aws-sdk/lib-dynamodb`  : 上記のヘルパー(取得結果がそのままだと扱いづらいので)

### ローカルでLambdaからDynamoDBにつなげるようにする
```
// connect to local DB if running offline
const dbOption = () => {
  if (process.env.IS_OFFLINE) { // serverless offlineで実行する時は、process.envに'IS_OFFLINE' が入るので、それによって接続先を切り替えている
    return {
      region: "localhost",
      endpoint: "http://localhost:8000",
      accessKeyId: "DEFAULT_ACCESS_KEY",
      secretAccessKey: "DEFAULT_SECRET",
    };
  }
  return { region: "ap-northeast-1" };
};

const client = new DynamoDBClient(dbOption());
export const doc = DynamoDBDocumentClient.from(client); // ↑のclientだけでも事足りるが、とってきたItemの取り出し方が面倒くさいのでdocで簡単に持ってくるようにする
```

### hello/handler.tsからDynamoDBのテーブルを読む
```
const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const param = new GetCommand({
    TableName: "greeting",
    Key: {
      code: event.path.slice(1),
    },
  });
  const { Item } = await doc.send(param);
  return formatJSONResponse({
    message: Item.content,
    event,
  });
};
```




## 次のタスク
- getAPIを作って、リクエストパラメータで名前を指定する

## ゴール
- 目先のゴール
  - curlで挨拶をGET/POST/PUT/DELETEできるようにする
- 最終的なゴール
  - WEBの画面で挨拶を表示できるようにする
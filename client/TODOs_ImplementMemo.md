# やること

## メモ

- @/features/todo の名前解決ができず、コミットできなかったので、一時的に husky を切っている
- どこかで eslint の設定を修正する必要あり

## 機能追加

- [ ] Todos.tsx で以下の属性を持つオブジェクト配列を作成(別ファイルで持つ)
- [ ] 以下のオブジェクトを MUI の Table に渡す
  - [ ] 各属性の表示：完了/未完了(bool 値)、タイトル、追加日、削除アイコン
  - [ ] チェックボックスを表示する
  - [ ] チェックボックスの切り替えを実装する

## 実装手順

- [x] TODO 一覧の Todos.tsx を作成し、Todo 一覧ページという文字を表示させる
- [x] ルーティングの実装
  - [x] react-router-dom を導入し、routes/index.tsx を定義し、AppRoutes を実装する
    - [x] useRoutes で Todo ページを追加する
  - [x] App.tsx で AppRoutes.tsx を呼ぶ
    - [x] provider を作る
    - [x] provider にエラーハンドリングを実装する
    - [x] provider から router を呼ぶ
    - [x] App.tsx で provider を介して router を呼ぶ
- [x] Todos.tsx で以下の属性を持つオブジェクト配列を作成(別ファイルで持つ)
- [x] 以下のオブジェクトを MUI の Table に渡す
  - [x] 各属性の表示：完了/未完了(bool 値)、タイトル、追加日、削除アイコン
  - [x] チェックボックスを表示する
  - [x] チェックボックスの切り替えを実装する
- [ ] MUI の Table のフォーマットを調整する

- TODO の属性
  - id
  - title
  - addedDate
  - editedDate
  - doneDate
  - done

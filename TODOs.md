# TODO管理アプリ
## 機能
- [ ] サーバー側
  - [x] TODOテーブルを作成する
  - [x] TODOテーブルの中身をGETできるAPIを作る
  - [x] TODOテーブルの中身をID指定でGETできるAPIを作る
  - [ ] TODOテーブルに追加できるPOST(追加)APIを作る
  - [ ] TODOテーブルを編集できるPUT(変更)APIを作る
  - [ ] TODOテーブルのアイテムを削除できるDELETEのAPIを作る
-  クライアント側
  - 詳細は[client側のTODO参照](client/TODOs.md)

## 非機能
- テストが実行できる状態にする
  - [x] unittestを実行できるようにする
  - [ ] spectestを実行できるようにする
- フォーマッタ、リンターの導入
  - Prettierの導入
    - [x] 基本的な設定の追加
    - [ ] 対象となる範囲や細かい設定の調整
  - eslintの導入
    - [ ] 基本的な設定の追加
    - [ ] プロジェクトにあった細かい設定の調整
- monorepo化

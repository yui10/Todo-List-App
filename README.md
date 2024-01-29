# 使用技術

<p style="display: inline">
    <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
    <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
    <img src="https://img.shields.io/badge/-TypeScript-007ACC.svg?logo=typescript&style=for-the-badge&logoColor=white">
    <img src="https://img.shields.io/badge/-Nginx-269539.svg?logo=nginx&style=for-the-badge">
    <img src="https://img.shields.io/badge/-MySQL-4479A1.svg?logo=mysql&style=for-the-badge&logoColor=white">
    <img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=for-the-badge&logoColor=white">
</p>

# 目次

1. [アプリケーションについて](#アプリケーションについて)
1. [開発環境構築](#開発環境構築)
1. [トラブルシューティング](#トラブルシューティング)

# アプリケーションについて

本アプリケーションは使用している技術の練習用に開発したものです。

# 開発環境構築

1.  リポジトリのクローン

    ```
    git clone https://github.com/yui10/Todo-List-App.git

    cd Todo-List-App
    ```

1.  [環境変数](#環境変数)を参考に.env を編集
1.  コンテナの作成

    ```
    docker-compose up -d
    ```

1.  動作確認

    http://127.0.0.1:8080 にアクセスできるか確認 アクセスできたら成功

## 環境変数

| 変数名              | 役割                                      | デフォルト値 | DEV 環境での値 |
| ------------------- | ----------------------------------------- | ------------ | -------------- |
| MYSQL_ROOT_PASSWORD | MySQL のルートパスワード（Docker で使用） | root         |                |
| MYSQL_DATABASE      | MySQL のデータベース名（Docker で使用）   | task         |                |
| MYSQL_USER          | MySQL のユーザ名（Docker で使用）         | api-user     |                |
| MYSQL_PASSWORD      | MySQL のパスワード（Docker で使用）       | p@ssw0rd     |                |
| MYSQL_HOST          | MySQL のホスト（Docker で使用）           | db           |                |
| MYSQL_PORT          | MySQL のポート（Docker で使用）           | 3306         |                |

# トラブルシューティング

## docker daemon is not running

Docker Desktop が起動できていないので起動しましょう。

## コンテナが落ちる

メモリ不足で落ちている可能性があります。割り当てられているメモリサイズは 2GB 程度必要です。

## node_modules にファイルがない

WSL 環境における Docker 環境での実行時間短縮のために、node_modules を docker volume で管理しています。この設定によりホストへのファイル同期がされていないだけの可能性があります。気になる場合や、問題が起きた場合は以下の対応を行ってください。

1. docker-compose.yaml を編集

   以下の文をコメントアウトまたは削除

   ```
       - react-node_modules:/usr/src/app/frontend/node_modules
       - express-node_modules:/usr/src/app/backend/node_modules
   ```

1. docker コンテナの再作成

   ```
   docker-compose build --no-cache
   docker-compose up
   ```

   参考

   https://qiita.com/keito654/items/035d0547c5ab210cc7ab

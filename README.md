# daily_weather_slackbot

Google Apps Scriptで実装した天気通知Slackボットです。毎日午前5時に指定した地域の天気予報をSlackに通知します。

## 機能

- 毎日午前5時に天気情報を通知
- 天気、最高気温、最低気温、降水確率を表示
- 郵便番号による地域指定
- Slack Incoming Webhookによる通知

## 使用している技術

- Google Apps Script
- Open-Meteo API（無料の天気予報API）
- Slack Incoming Webhook

## セットアップ手順

1. **Slack Incoming Webhookの設定**
   - Slackワークスペースで「Incoming Webhook」を追加
   - Webhook URLを取得（形式: `https://hooks.slack.com/services/...`）

2. **Google Apps Scriptプロジェクトの作成**
   - [Google Apps Script](https://script.google.com/) にアクセス
   - 新しいプロジェクトを作成
   - このリポジトリの各`.gs`ファイルの内容をコピー

3. **スクリプトプロパティの設定**
   - プロジェクトの設定（⚙）を開く
   - 「スクリプトプロパティ」セクションで以下を設定：
     - `WEBHOOK_URL`: Slackから取得したWebhook URL
     - `POSTAL_CODE`: 天気を取得したい地域の郵便番号（例: `123-4567`）

4. **動作確認**
   ```javascript
   // 現在の設定を確認
   getCurrentConfig();
   
   // テスト実行
   notifyWeather();
   ```

## 使用方法

### 設定の変更

1. **Webhook URLの設定**
   ```javascript
   setWebhookUrl('https://hooks.slack.com/services/XXXXX/YYYYY/ZZZZZ');
   ```

2. **郵便番号の設定**
   ```javascript
   setPostalCode('123-4567');
   ```

3. **設定の確認**
   ```javascript
   getCurrentConfig();
   ```

### 通知時間

- 毎日午前5時に自動実行
- トリガーは郵便番号またはWebhook URL設定時に自動的に設定されます

## ライセンス

MIT License

## 作者

[tsukachan55](https://github.com/tsukachan55)

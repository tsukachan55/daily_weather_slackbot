# 天気通知Slackbot v1.0.0

Google Apps Script（GAS）を使用して、毎日の天気情報をSlackに通知するボットです。

## バージョン履歴

- v1.0.0 (2024-01-XX)
  - 1時間ごとの天気情報表示機能を実装
  - 最高気温・最低気温の表示
  - 降水確率の表示
  - 複数時間での通知設定機能

## 機能

- 指定された地域の天気情報を定期的にSlackチャンネルに通知
- 1時間ごとの天気状態、気温、降水確率を表示
- 1日の最高気温・最低気温を表示

## 使用している外部API

- Open-meteo API（天気情報取得）
- HeartRails Geo API（郵便番号から緯度経度への変換）

## セットアップ方法

1. Google Apps Scriptのプロジェクトを作成
2. 以下のファイルをプロジェクトにコピー
   - `config.gs`
   - `apiHandler.gs`
   - `slackNotifier.gs`
   - `main.gs`
3. Slackで Incoming Webhook を設定
4. スクリプトプロパティに以下の値を設定
   - `SLACK_WEBHOOK_URL`: SlackのWebhook URL
   - `POSTAL_CODE`: 天気を取得したい地域の郵便番号
   - `NOTIFICATION_HOURS`: 通知時間（カンマ区切りで指定 例: "7,12,18"）

## 初期設定手順

1. スクリプトエディタで`setup()`関数を実行して初期設定
2. `updateConfig()`関数で実際の設定値を更新
3. 動作確認のため`main()`関数を実行してテスト

## 設定可能な項目

- 通知時間（1日に複数回設定可能）
- 対象地域（郵便番号で指定）
- 通知先Slackチャンネル（Webhook URLで指定）

## ライセンス

MIT License

## 注意事項

- 各APIの利用制限に注意してください
  - Open-meteo API: 無料利用可能
  - HeartRails Geo API: 1日10,000リクエストまで
- GASの実行時間制限（6分/実行）に注意してください

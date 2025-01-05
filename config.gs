// スクリプトプロパティの取得用関数
function getConfig() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const notificationHours = scriptProperties.getProperty('NOTIFICATION_HOURS');
  
  return {
    SLACK_WEBHOOK_URL: scriptProperties.getProperty('SLACK_WEBHOOK_URL'),
    POSTAL_CODE: scriptProperties.getProperty('POSTAL_CODE'),
    NOTIFICATION_HOURS: notificationHours ? notificationHours.split(',').map(Number) : [7, 12, 18]
  };
}

// スクリプトプロパティの設定用関数
function setConfig(config) {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperties({
    'SLACK_WEBHOOK_URL': config.SLACK_WEBHOOK_URL,
    'POSTAL_CODE': config.POSTAL_CODE,
    'NOTIFICATION_HOURS': config.NOTIFICATION_HOURS.join(',')
  });
}

// 初期設定用関数
function initializeConfig() {
  const defaultConfig = {
    SLACK_WEBHOOK_URL: '', // Slack Webhook URLを設定
    POSTAL_CODE: '1000001', // デフォルトは東京都千代田区
    NOTIFICATION_HOURS: [7, 12, 18] // デフォルトの通知時間
  };
  setConfig(defaultConfig);
} 
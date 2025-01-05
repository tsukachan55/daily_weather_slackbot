// メイン実行関数
function main() {
  try {
    const config = getConfig();
    
    // 位置情報の取得
    const coordinates = ApiHandler.getGeoLocation(config.POSTAL_CODE);
    
    // 天気情報の取得
    const weatherData = ApiHandler.getWeather(coordinates.latitude, coordinates.longitude);
    
    // Slackに通知
    notifyWeatherToSlack(weatherData);
    
  } catch (error) {
    console.error('実行中にエラーが発生しました:', error);
    throw error;
  }
}

// トリガー設定用関数
function setTriggers() {
  // 既存のトリガーを全て削除
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // 設定された時間に基づいてトリガーを設定
  const config = getConfig();
  config.NOTIFICATION_HOURS.forEach(hour => {
    ScriptApp.newTrigger('main')
      .timeBased()
      .everyDays(1)
      .atHour(hour)
      .create();
  });
}

// 初期セットアップ用関数
function setup() {
  // 初期設定
  initializeConfig();
  
  // トリガーの設定
  setTriggers();
} 
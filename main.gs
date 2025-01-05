// メイン処理を実行する関数
async function notifyWeather() {
  try {
    // 郵便番号を取得
    const postalCode = Config.getPostalCode();
    if (!postalCode) {
      throw new Error('郵便番号が設定されていません');
    }

    // 位置情報を取得
    const location = await ApiHandler.getGeoLocation(postalCode);
    
    // 天気情報を取得
    const weatherData = await ApiHandler.getWeather(location.latitude, location.longitude);
    
    // Slackに通知
    await SlackNotifier.sendMessage(weatherData);
    
  } catch (error) {
    console.error('天気通知処理でエラーが発生しました:', error);
    throw error;
  }
}

// トリガーを設定する関数
function setTrigger() {
  // 既存のトリガーを全て削除
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // 毎日午前5時に実行するトリガーを設定
  ScriptApp.newTrigger('notifyWeather')
    .timeBased()
    .atHour(5)
    .everyDays(1)
    .create();
}

// 郵便番号を設定する関数
function setPostalCode(postalCode) {
  try {
    // 郵便番号の形式チェック（例：123-4567）
    if (!/^\d{3}-?\d{4}$/.test(postalCode)) {
      throw new Error('郵便番号の形式が正しくありません。123-4567の形式で入力してください。');
    }
    
    // ハイフンを含む形式に統一
    const formattedPostalCode = postalCode.replace(/^(\d{3})(\d{4})$/, '$1-$2');
    Config.setPostalCode(formattedPostalCode);
    setTrigger(); // トリガーを設定
    return '郵便番号を設定しました：' + formattedPostalCode;
  } catch (error) {
    console.error('郵便番号の設定に失敗しました:', error);
    throw error;
  }
}

// 現在の設定を確認する関数
function getCurrentConfig() {
  return {
    postalCode: Config.getPostalCode() || '未設定',
    notificationTime: '毎日午前5時',
    webhookUrl: Config.getWebhookUrl() ? '設定済み' : '未設定'
  };
}

// Webhook URLを設定する関数
function setWebhookUrl(url) {
  try {
    // URLの形式チェック
    if (!url.startsWith('https://hooks.slack.com/services/')) {
      throw new Error('無効なSlack Webhook URLです。');
    }
    
    Config.setProperty(Config.getPropertyKeys().WEBHOOK_URL, url);
    setTrigger(); // トリガーを設定
    return 'Webhook URLを設定しました';
  } catch (error) {
    console.error('Webhook URLの設定に失敗しました:', error);
    throw error;
  }
} 
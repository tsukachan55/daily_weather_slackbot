// Slack通知を管理するクラス
class SlackNotifier {
  // Slackにメッセージを送信
  static sendMessage(weatherData) {
    const webhookUrl = Config.getWebhookUrl();
    if (!webhookUrl) {
      throw new Error('Webhook URLが設定されていません');
    }

    const message = this.createMessage(weatherData);
    const payload = {
      text: message
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    };

    try {
      UrlFetchApp.fetch(webhookUrl, options);
    } catch (error) {
      console.error('Slackへの送信に失敗しました:', error);
      throw error;
    }
  }

  // 天気情報からメッセージを作成
  static createMessage(weatherData) {
    const today = new Date();
    const dateStr = Utilities.formatDate(today, 'Asia/Tokyo', 'yyyy/MM/dd');
    const weather = ApiHandler.getWeatherDescription(weatherData.weatherCode);

    return `${dateStr}の天気をお知らせします！\n\n` +
           `天気: ${weather}\n` +
           `最高気温: ${weatherData.maxTemp}°C\n` +
           `最低気温: ${weatherData.minTemp}°C\n` +
           `降水確率: ${weatherData.precipitationProb}%`;
  }
} 
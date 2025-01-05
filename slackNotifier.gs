// Slackに天気情報を通知
function notifyWeatherToSlack(weatherData) {
  const config = getConfig();
  const webhookUrl = config.SLACK_WEBHOOK_URL;
  
  if (!webhookUrl) {
    throw new Error('Slack Webhook URLが設定されていません');
  }

  const now = new Date();
  const message = createWeatherMessage(weatherData, now);
  
  const payload = {
    "blocks": [
      {
        "type": "header",
        "text": {
          "type": "plain_text",
          "text": `${formatDate(now)}の天気予報 🌤`,
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": message
        }
      }
    ]
  };

  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };

  try {
    UrlFetchApp.fetch(webhookUrl, options);
  } catch (error) {
    console.error('Slack通知の送信に失敗しました:', error);
    throw error;
  }
}

// 天気情報メッセージを作成
function createWeatherMessage(weatherData, targetDate) {
  const today = Utilities.formatDate(targetDate, 'Asia/Tokyo', 'yyyy-MM-dd');
  let message = '';
  
  // 本日の最高・最低気温
  const dailyIndex = weatherData.daily.time.indexOf(today);
  message += `*本日の気温*\n`;
  message += `最高: ${weatherData.daily.temperature_2m_max[dailyIndex]}°C\n`;
  message += `最低: ${weatherData.daily.temperature_2m_min[dailyIndex]}°C\n\n`;
  
  // 時間ごとの天気情報
  message += '*時間ごとの天気*\n';
  const hourlyStartIndex = weatherData.hourly.time.findIndex(time => time.startsWith(today));
  
  for (let i = 0; i < 24; i++) {
    const index = hourlyStartIndex + i;
    const hour = new Date(weatherData.hourly.time[index]).getHours();
    const temp = weatherData.hourly.temperature_2m[index];
    const precip = weatherData.hourly.precipitation_probability[index];
    const weather = ApiHandler.getWeatherDescription(weatherData.hourly.weathercode[index]);
    
    message += `${hour}時: ${weather} ${temp}°C 降水確率${precip}%\n`;
  }
  
  return message;
}

// 日付のフォーマット
function formatDate(date) {
  return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy年MM月dd日');
} 
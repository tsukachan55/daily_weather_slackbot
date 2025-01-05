// API通信を管理するクラス
class ApiHandler {
  // HeartRails GeoAPIのエンドポイント
  static get GEO_API_URL() {
    return 'http://geoapi.heartrails.com/api/json';
  }
  // Open-meteoのエンドポイント
  static get WEATHER_API_URL() {
    return 'https://api.open-meteo.com/v1/forecast';
  }

  // 郵便番号から緯度経度を取得
  static getGeoLocation(postalCode) {
    const url = `${this.GEO_API_URL}?method=searchByPostal&postal=${postalCode}`;
    try {
      const response = UrlFetchApp.fetch(url);
      const json = JSON.parse(response.getContentText());
      
      if (!json.response || !json.response.location || json.response.location.length === 0) {
        throw new Error('位置情報が見つかりません');
      }

      const location = json.response.location[0];
      return {
        latitude: location.y,
        longitude: location.x
      };
    } catch (error) {
      console.error('位置情報の取得に失敗しました:', error);
      throw error;
    }
  }

  // 天気情報を取得
  static getWeather(latitude, longitude) {
    const url = `${this.WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`;
    
    try {
      const response = UrlFetchApp.fetch(url);
      const json = JSON.parse(response.getContentText());
      
      if (!json.daily || !json.hourly) {
        throw new Error('天気情報が見つかりません');
      }

      return json;
    } catch (error) {
      console.error('天気情報の取得に失敗しました:', error);
      throw error;
    }
  }

  // 天気コードを日本語の天気に変換
  static getWeatherDescription(weatherCode) {
    const weatherMap = {
      0: '快晴',
      1: '晴れ',
      2: '晴れ時々曇り',
      3: '曇り',
      45: '霧',
      48: '霧氷',
      51: '小雨',
      53: '雨',
      55: '強い雨',
      61: '小雨',
      63: '雨',
      65: '強い雨',
      71: '小雪',
      73: '雪',
      75: '強い雪',
      77: '霧雪',
      80: '小雨',
      81: '雨',
      82: '強い雨',
      85: '小雪',
      86: '雪'
    };
    return weatherMap[weatherCode] || '不明';
  }
} 
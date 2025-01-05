// 設定情報を管理するクラス
class Config {
  // プロパティ名の定義
  static getPropertyKeys() {
    return {
      WEBHOOK_URL: 'WEBHOOK_URL',
      POSTAL_CODE: 'POSTAL_CODE'
    };
  }

  // プロパティの取得
  static getProperty(key) {
    return PropertiesService.getScriptProperties().getProperty(key);
  }

  // プロパティの設定
  static setProperty(key, value) {
    PropertiesService.getScriptProperties().setProperty(key, value);
  }

  // Webhook URLの取得
  static getWebhookUrl() {
    return this.getProperty(this.getPropertyKeys().WEBHOOK_URL);
  }

  // 郵便番号の取得
  static getPostalCode() {
    return this.getProperty(this.getPropertyKeys().POSTAL_CODE);
  }

  // 郵便番号の設定
  static setPostalCode(postalCode) {
    this.setProperty(this.getPropertyKeys().POSTAL_CODE, postalCode);
  }

  // 設定が完了しているかチェック
  static isConfigured() {
    return Boolean(
      this.getWebhookUrl() &&
      this.getPostalCode()
    );
  }
} 
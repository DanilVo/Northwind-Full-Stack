import dotenv from 'dotenv';
dotenv.config();

class AppConfig {
  public readonly port = process.env.PORT;

  public readonly mysqlHost = process.env.MYSQL_HOST;
  public readonly mysqlUser = process.env.MYSQL_USER;
  public readonly mysqlPassword = process.env.MYSQL_PASSWORD;
  public readonly mysqlDatabase = process.env.MYSQL_DATABASE;

  public readonly appHost = `http://localhost:${process.env.PORT}`;
}

class DevelopmentConfig extends AppConfig {
  public isDevelopment = true;
  public isProduction = false;
}

class ProductionConfig extends AppConfig {
  public isDevelopment = false;
  public isProduction = true;
}

const appConfig =
  process.env.NODE_ENV === 'production'
    ? new ProductionConfig()
    : new DevelopmentConfig();

export default appConfig;

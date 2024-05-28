const config = {};

/* ==================== APP ENV ============================*/
const ENV_TYPE = {
  dev: 'development',
  stg: 'staging',
  prod: 'production',
};

/* ============== SET APP CONFIG =============================*/
config.apiBaseUrl = {
  development: 'http://15.206.27.50:3009',
  staging: 'http://staging.example.com',
  production: 'http://production.example.com',
};
config.ENV = ENV_TYPE.dev;

export {config};

const config = {};

/* ==================== APP ENV ============================*/
const ENV_TYPE = {
  dev: 'development',
  stg: 'staging',
  prod: 'production',
};

/* ============== SET APP CONFIG =============================*/
config.apiBaseUrl = {
  development: 'http://15.206.66.165:3009',
  //development: 'http://localhost:50547',
  staging: 'http://staging.example.com',
  production: 'http://production.example.com',
};
config.ENV = ENV_TYPE.dev;

export {config};

const ENV = process.env;

export const DISABLE_NO_INDEX = ENV.DISABLE_NO_INDEX || undefined;
export const PORT = ENV.PORT || '8000';
export const MONGO_URI =
  // Environment
  ENV.MONGODB_URL ||
  // Heroku
  ENV.MONGODB_URI ||
  // Bluemix
  (ENV.VCAP_APPLICATION
    ? require('cfenv')
        .getAppEnv()
        .getServiceURL('MongoLab-Kauntah')
    : null) ||
  // Docker Link
  (ENV.MONGODB_PORT_27017_TCP_ADDR && ENV.MONGODB_PORT_27017_TCP_PORT
    ? `mongodb://${ENV.MONGODB_PORT_27017_TCP_ADDR}:${ENV.MONGODB_PORT_27017_TCP_PORT}/kauntah`
    : null);

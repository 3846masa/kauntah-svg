"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ENV = process.env;
exports.DISABLE_NO_INDEX = ENV.DISABLE_NO_INDEX || undefined;
exports.PORT = ENV.PORT || '8000';
exports.MONGO_URI = 
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

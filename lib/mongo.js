"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
async function connectMongoCollection(mongoURI) {
    const mongo = await mongodb_1.MongoClient.connect(mongoURI, {
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        useNewUrlParser: true,
    });
    const collection = await mongo.db().createCollection('kauntah');
    return collection;
}
exports.connectMongoCollection = connectMongoCollection;

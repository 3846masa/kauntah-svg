import { MongoClient } from 'mongodb';

export async function connectMongoCollection(mongoURI: string) {
  const mongo = await MongoClient.connect(
    mongoURI,
    {
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      useNewUrlParser: true,
    },
  );
  const collection = await mongo.db().createCollection('kauntah');

  return collection;
}

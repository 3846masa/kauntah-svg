import { MongoClient, Db } from 'mongodb';

let database: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (database === null) {
    const client = await MongoClient.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    database = client.db();
  }
  return database;
}

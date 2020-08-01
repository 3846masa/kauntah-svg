import { URL } from 'url';
import { connectToDatabase } from './connect_to_database';

const DEFAULT_COUNT = 1234567890;

type Options = {
  offset: number;
};

export async function fetchCount(referrer: string | null, { offset }: Options): Promise<number> {
  try {
    if (referrer === null) {
      return DEFAULT_COUNT;
    }

    const { hostname } = new URL(referrer);

    const db = await connectToDatabase();
    const collection = db.collection('kauntah');

    const data = await collection.findOneAndUpdate(
      { origin: hostname },
      { $inc: { count: 1 }, $set: { origin: hostname } },
      { returnOriginal: false, upsert: true },
    );
    const count = data.value.count;

    return count + offset;
  } catch (err) {
    console.error(err);
    return DEFAULT_COUNT;
  }
}

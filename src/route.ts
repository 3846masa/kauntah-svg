import url from 'url';
import { FastifyInstance } from 'fastify';

import * as ENV from './env';
import { connectMongoCollection } from './mongo';
import { loadTemplate } from './template';

export async function route(fastify: FastifyInstance) {
  const collection = await connectMongoCollection(ENV.MONGO_URI);
  const { template, baseImage } = await loadTemplate();

  fastify.get('/counter.svg', async (req, reply) => {
    let count = 1234567890;
    const origin = url.parse(req.headers['referer'] || '').host;

    if (origin) {
      const data = await collection.findOneAndUpdate(
        { origin },
        { $inc: { count: 1 }, $set: { origin } },
        { returnOriginal: false, upsert: true },
      );
      count = data.value.count;
    }

    const offset = parseInt(req.query.offset, 10);
    if (isFinite(offset)) {
      count += offset;
    }

    reply.headers({
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store',
    });
    reply.send(
      template({
        length: count.toString(10).length,
        number: count.toString(10),
        image: req.query.color ? baseImage.colorCats : baseImage.blueCats,
      }),
    );
  });
}

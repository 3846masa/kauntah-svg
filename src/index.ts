import path from 'path';
import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

import * as ENV from './env';
import { route } from './route';

async function main() {
  if (!ENV.MONGO_URI) {
    throw new Error('env.MONGODB_URL is empty.');
  }

  const app = fastify();
  app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
  });
  app.register(route);

  if (!ENV.DISABLE_NO_INDEX) {
    app.addHook('onSend', async (_req, reply) => {
      reply.header('X-Robots-Tag', 'noindex');
    });
  }

  const PORT_NUMBER = parseInt(ENV.PORT, 10);
  if (isFinite(PORT_NUMBER)) {
    app.listen(PORT_NUMBER, '0.0.0.0', () => {
      console.log(`Listening on ${ENV.PORT}.`);
    });
  } else {
    // For Azure
    app.listen(ENV.PORT as string, () => {
      console.log(`Listening on ${ENV.PORT}.`);
    });
  }
}

main().catch((err) => console.error(err));

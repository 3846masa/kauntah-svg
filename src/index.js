const path = require('path');
const url = require('url');

const Koa = require('koa');
const KoaStatic = require('koa-static');
const KoaRouter = require('koa-router');
const KoaCompress = require('koa-compress');

const fs = require('fs-promise');
const ejs = require('ejs');
const MongoClient = require('mongodb').MongoClient;

// Configs
const ENV = process.env;
const PORT = ENV.PORT || 8000;
const MONGO_URL =
  // Environment
  ENV.MONGODB_URL ||
  // Heroku
  ENV.MONGODB_URI ||
  // Bluemix
  (
    ENV.VCAP_APPLICATION ?
    require('cfenv').getAppEnv().getServiceURL('MongoLab-Kauntah') :
    null
  ) ||
  // Docker Link
  (
    (ENV.MONGODB_PORT_27017_TCP_ADDR && ENV.MONGODB_PORT_27017_TCP_PORT) ?
    `mongodb://${ENV.MONGODB_PORT_27017_TCP_ADDR}:${ENV.MONGODB_PORT_27017_TCP_PORT}/kauntah` :
    null
  );

(async () => {
  if (!MONGO_URL) {
    throw new Error('env.MONGODB_URL is empty.');
  }

  // SVG template
  const template = ejs.compile(await fs.readFile(path.join(__dirname, '../template/base.svg.ejs'), 'utf8'));
  const baseImage = {
    blueCats: [],
    colorCats: [],
  };
  for (let idx = 0; idx <= 9; idx += 1) {
    baseImage.blueCats.push(await fs.readFile(path.join(__dirname, `../template/blue-cats/${idx}.png`), 'base64'));
    baseImage.colorCats.push(await fs.readFile(path.join(__dirname, `../template/color-cats/${idx}.png`), 'base64'));
  }

  // Koa instance
  const app = new Koa();
  const router = new KoaRouter();

  // Routing
  router.get('/counter.svg', async (ctx, _next) => {
    let count = 0;

    const origin = url.parse(ctx.headers['referer'] || '').host;
    if (!origin) {
      count = 1234567890;
    } else {
      // Mongodb instance
      const db = await MongoClient.connect(MONGO_URL);
      const collection = await db.createCollection('kauntah');
      const data = await collection.findOneAndUpdate(
        { origin },
        { $inc: { count: 1 }, $set: { origin } },
        { returnOriginal: false, upsert: true }
      );
      count = data.value.count;
    }

    if (ctx.query.offset) {
      count += (parseInt(ctx.query.offset, 10) || 0);
    }

    ctx.set('Content-Type', 'image/svg+xml');
    ctx.set('Cache-Control', 'no-store');
    ctx.body = template({
      length: count.toString(10).length,
      number: count.toString(10),
      image: (ctx.query.color) ? baseImage.colorCats : baseImage.blueCats,
    });
  });

  // Koa
  if (!ENV.DISABLE_NO_INDEX) {
    app.use(async (ctx, next) => {
      ctx.set('X-Robots-Tag', 'noindex');
      await next();
    });
  }
  app.use(KoaCompress());
  app.use(router.routes());
  app.use(KoaStatic(path.join(__dirname, '../public')));
  app.listen(PORT, () => {
    console.log(`Linstening on ${PORT}.`);
  });
})()
.catch((err) => {
  console.error(err);
});

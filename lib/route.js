"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const ENV = __importStar(require("./env"));
const mongo_1 = require("./mongo");
const template_1 = require("./template");
async function route(fastify) {
    const collection = await mongo_1.connectMongoCollection(ENV.MONGO_URI);
    const { template, baseImage } = await template_1.loadTemplate();
    fastify.get('/counter.svg', async (req, reply) => {
        let count = 1234567890;
        const origin = url_1.default.parse(req.headers['referer'] || '').host;
        if (origin) {
            const data = await collection.findOneAndUpdate({ origin }, { $inc: { count: 1 }, $set: { origin } }, { returnOriginal: false, upsert: true });
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
        reply.send(template({
            length: count.toString(10).length,
            number: count.toString(10),
            image: req.query.color ? baseImage.colorCats : baseImage.blueCats,
        }));
    });
}
exports.route = route;

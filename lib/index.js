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
const path_1 = __importDefault(require("path"));
const fastify_1 = __importDefault(require("fastify"));
const fastify_static_1 = __importDefault(require("fastify-static"));
const ENV = __importStar(require("./env"));
const route_1 = require("./route");
async function main() {
    if (!ENV.MONGO_URI) {
        throw new Error('env.MONGODB_URL is empty.');
    }
    const app = fastify_1.default();
    app.register(fastify_static_1.default, {
        root: path_1.default.join(__dirname, '../public'),
    });
    app.register(route_1.route);
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
    }
    else {
        // For Azure
        app.listen(ENV.PORT, () => {
            console.log(`Listening on ${ENV.PORT}.`);
        });
    }
}
main().catch((err) => console.error(err));

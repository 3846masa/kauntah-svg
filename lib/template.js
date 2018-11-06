"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
async function loadTemplate() {
    const template = ejs_1.default.compile(await fs_extra_1.default.readFile(path_1.default.join(__dirname, '../template/base.svg.ejs'), 'utf8'));
    const baseImage = {
        blueCats: [],
        colorCats: [],
    };
    for (let idx = 0; idx <= 9; idx += 1) {
        baseImage.blueCats.push(await fs_extra_1.default.readFile(path_1.default.join(__dirname, `../template/blue-cats/${idx}.png`), 'base64'));
        baseImage.colorCats.push(await fs_extra_1.default.readFile(path_1.default.join(__dirname, `../template/color-cats/${idx}.png`), 'base64'));
    }
    return { template, baseImage };
}
exports.loadTemplate = loadTemplate;

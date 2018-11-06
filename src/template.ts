import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';

export async function loadTemplate() {
  const template = ejs.compile(await fs.readFile(path.join(__dirname, '../template/base.svg.ejs'), 'utf8'));
  const baseImage = {
    blueCats: [] as string[],
    colorCats: [] as string[],
  };
  for (let idx = 0; idx <= 9; idx += 1) {
    baseImage.blueCats.push(await fs.readFile(path.join(__dirname, `../template/blue-cats/${idx}.png`), 'base64'));
    baseImage.colorCats.push(await fs.readFile(path.join(__dirname, `../template/color-cats/${idx}.png`), 'base64'));
  }

  return { template, baseImage };
}

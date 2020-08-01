import fs from 'fs';
import path from 'path';

const VALID_ASSET_NAME = ['blue', 'colorful'];
const assetsMap = new Map<string, string[]>();

export async function loadAssets(assetName: string): Promise<string[] | null> {
  if (!VALID_ASSET_NAME.includes(assetName)) {
    return null;
  }

  if (assetsMap.has(assetName)) {
    return assetsMap.get(assetName)!;
  }

  const loaderArray: Array<Promise<string>> = [];
  for (let idx = 0; idx < 10; idx++) {
    const filePath = path.resolve(__dirname, '../assets', assetName, `${idx}.png`);
    const promise = fs.promises.readFile(filePath, 'base64');
    loaderArray.push(promise);
  }

  const assets = await Promise.all(loaderArray);
  assetsMap.set(assetName, assets);
  return assets;
}

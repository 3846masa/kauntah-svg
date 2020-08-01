import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { loadAssets } from './load_assets';

const WIDTH = 68;
const HEIGHT = 150;

type Options = {
  assetName: string | null;
};

async function renderSVG(counts: number, { assetName }: Options): Promise<string | null> {
  const assetsBase64List = await loadAssets(assetName ?? 'blue');

  if (assetsBase64List === null) {
    return null;
  }

  const digitList = Array.from(counts.toString(10));
  const counterWidth = WIDTH * digitList.length;
  const counterHeight = HEIGHT;

  const svgString = ReactDOMServer.renderToStaticMarkup(
    <svg
      width={counterWidth}
      height={counterHeight}
      viewBox={`0 0 ${counterWidth} ${counterHeight}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {assetsBase64List.map((base64, number) => (
          <image
            key={`image-${number}`}
            id={`image-${number}`}
            href={`data:image/png;base64,${base64}`}
            x="0"
            y="0"
            width={WIDTH}
            height={HEIGHT}
          />
        ))}
      </defs>
      {digitList.map((digit, idx) => (
        <use key={`image-${digit}-${idx}`} href={`#image-${digit}`} x={WIDTH * idx} y="0" />
      ))}
    </svg>,
  );

  return svgString;
}

export { renderSVG };

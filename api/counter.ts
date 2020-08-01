import { URLSearchParams } from 'url';
import { NowRequest, NowResponse } from '@vercel/node';

import { renderSVG } from './helpers/render_svg';
import { fetchCount } from './helpers/fetch_count';

async function hooks(req: NowRequest, res: NowResponse) {
  const { headers, query } = req;
  const searchParams = new URLSearchParams(query);

  const accept = headers['accept'] ?? '';
  // NOTE: Ignore referrer when accessing directly
  const referrer = accept.includes('application/xml') ? null : headers['referer'] ?? null;

  const count = await fetchCount(referrer, {
    offset: parseInt(searchParams.get('offset') ?? '0', 10) || 0,
  });

  const svg = await renderSVG(count, {
    assetName: searchParams.get('asset'),
  });

  if (svg === null) {
    res.status(400);
    return;
  }

  res.status(200);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-store');
  res.send(svg);
}

export default hooks;

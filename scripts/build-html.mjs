import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const basePath = process.env.BASE_PATH?.replace(/\/$/, '') ?? '';
const assetBase = basePath ? `${basePath}/` : '';

const html = readFileSync('index.html', 'utf8')
  .replace('<!-- BASE -->', '')
  .replaceAll('__BASE__', assetBase);

mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.html', html);
writeFileSync('dist/.nojekyll', '');

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const basePath = process.env.BASE_PATH?.replace(/\/$/, '') ?? '';
const baseTag = basePath ? `    <base href="${basePath}/" />\n` : '';

const html = readFileSync('index.html', 'utf8').replace('<!-- BASE -->', baseTag);

mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.html', html);
writeFileSync('dist/.nojekyll', '');

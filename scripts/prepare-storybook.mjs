import { copyFile, readFile, writeFile } from 'node:fs/promises';

const output = new URL('../storybook-static/', import.meta.url);
const index = new URL('index.html', output);
const html = await readFile(index, 'utf8');

await Promise.all([
  copyFile(new URL('../llms.txt', import.meta.url), new URL('llms.txt', output)),
  writeFile(index, html.replace(/<title>[^<]*<\/title>/, '<title>MonoSchemes — Monochrome design system for Figma and React</title>')),
]);

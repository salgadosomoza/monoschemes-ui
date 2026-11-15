import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../dist/style.css', import.meta.url), 'utf8');
const required = [
  ['--color-bg-page', /--color-bg-page\s*:/],
  ['dark theme selector', /\[data-theme=["']?dark["']?\]/],
  ['inverse theme selector', /\[data-theme=["']?inverse["']?\]/],
  ['reduced-motion rules', /prefers-reduced-motion/],
];
const missing = required.filter(([, pattern]) => !pattern.test(css)).map(([name]) => name);

if (missing.length) {
  console.error(`dist/style.css is missing: ${missing.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log('dist/style.css includes page tokens, dark/inverse themes, and reduced-motion rules.');
}

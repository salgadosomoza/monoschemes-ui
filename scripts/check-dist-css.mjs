import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../dist/style.css', import.meta.url), 'utf8');
const required = [
  ['--color-bg-page', /--color-bg-page\s*:/],
  ['dark theme selector', /\[data-theme=["']?dark["']?\]/],
  ['inverse theme selector', /\[data-theme=["']?inverse["']?\]/],
  ['reduced-motion rules', /prefers-reduced-motion/],
  ['InlineNotification error style', /\.inline-notification\[data-type=["']?error["']?\]\s*\{[^}]*box-shadow:inset\s+0\s+0\s+0\s+1px\s+var\(--color-border-error\)/],
  ['Toast error style', /\.toast\[data-type=["']?error["']?\]\s*\{[^}]*border-color:\s*var\(--color-border-error\)[^}]*box-shadow:\s*-4px\s+4px\s+0\s+var\(--color-border-error\)/],
  ['Tooltip style', /\.tooltip\s*\{/],
];
const missing = required.filter(([, pattern]) => !pattern.test(css)).map(([name]) => name);

if (missing.length) {
  console.error(`dist/style.css is missing: ${missing.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log('dist/style.css includes page tokens, dark/inverse themes, reduced-motion rules, InlineNotification/Toast error styles, and Tooltip styles.');
}

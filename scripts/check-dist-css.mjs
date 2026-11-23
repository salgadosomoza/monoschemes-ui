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
  ['Tooltip forced-colors outline', /\.tooltip\s*\{[^}]*outline:\s*1px solid transparent;[^}]*outline-offset:\s*-1px/],
  ['DescriptionList style', /\.description-list\s*\{/],
  ['CommandPalette style', /\.command-palette\s*\{/],
  ['Drawer style', /\.drawer\s*\{/],
  ['Table style', /\.table\s*\{/],
  ['CardImage style', /\.card-image\s*\{/],
  ['FormCombobox style', /\.form-combobox\s*\{/],
  ['Gallery style', /\.gallery\s*\{/],
  ['GalleryViewer style', /\.gallery-viewer\s*\{/],
  ['Map style', /\.map\s*\{/],
  ['MapMarker style', /\.map-marker\s*\{/],
  ['Rating style', /\.rating\s*\{/],
  ['RatingInput style', /\.rating-input\s*\{/],
  ['AgentMark style', /\.agent-mark\s*\{/],
  ['AgentStatus style', /\.agent-status\s*\{/],
  ['AgentMessage style', /\.agent-message\s*\{/],
  ['MessageActions style', /\.message-actions\s*\{/],
  ['ToolCall style', /\.tool-call\s*\{/],
  ['ApprovalRequest style', /\.approval-request\s*\{/],
  ['AgentSuggestions style', /\.agent-suggestions\s*\{/],
  ['AgentComposer style', /\.agent-composer\s*\{/],
  ['AgentThread style', /\.agent-thread\s*\{/],
];
const missing = required.filter(([, pattern]) => !pattern.test(css)).map(([name]) => name);

if (missing.length) {
  console.error(`dist/style.css is missing: ${missing.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log('dist/style.css includes page tokens, dark/inverse themes, reduced-motion rules, error styles, FormCombobox, Tooltip forced-colors outline, DescriptionList, Table, CommandPalette, Drawer, Gallery, Map, Rating and agent conversation styles.');
}

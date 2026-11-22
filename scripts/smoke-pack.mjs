import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const temp = await mkdtemp(join(tmpdir(), 'monoschemes-smoke-'));

try {
  const packResult = JSON.parse(execFileSync('npm', ['pack', '--json', '--pack-destination', temp], { cwd: root, encoding: 'utf8' }));
  const tarball = join(temp, packResult[0].filename);
  const app = join(temp, 'app');
  await mkdir(join(app, 'src'), { recursive: true });
  await writeFile(join(app, 'package.json'), JSON.stringify({
    name: 'monoschemes-package-smoke',
    private: true,
    type: 'module',
    scripts: { build: 'vite build' },
    dependencies: { '@monoschemes/ui': `file:${tarball}`, '@vitejs/plugin-react': '^6.3.0', vite: '^8.3.8', react: '^19.3.1', 'react-dom': '^19.3.1' },
  }, null, 2));
  await writeFile(join(app, 'index.html'), '<div id="root"></div><script type="module" src="/src/main.jsx"></script>');
  await writeFile(join(app, 'src/main.jsx'), `import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport { Button, FormInput, AppHeader } from '@monoschemes/ui';\nimport '@monoschemes/ui/style.css';\nimport '@monoschemes/ui/dist/style.css';\ncreateRoot(document.getElementById('root')).render(<><AppHeader hasLogo={false} hasSiteTitle={false} hasTagline={false} hasNav={false} hasActions={false}/><FormInput label="Name"/><Button label="Ready"/></>);`);
  await writeFile(join(app, 'vite.config.js'), `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nexport default defineConfig({ plugins: [react()] });`);
  execFileSync('npm', ['install', '--no-audit', '--no-fund'], { cwd: app, stdio: 'inherit' });
  execFileSync('npm', ['run', 'build'], { cwd: app, stdio: 'inherit' });
  console.log(`Package smoke test passed for ${packResult[0].filename}.`);
} finally {
  await rm(temp, { recursive: true, force: true });
}

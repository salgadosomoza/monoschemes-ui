#!/usr/bin/env node
import { cp, mkdir, mkdtemp, readdir, readFile, rm, stat, symlink } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const root = resolve(process.argv[2] ?? '');
if (!process.argv[2]) {
  console.error('Usage: node docs/agent-test/score.mjs <round-directory>');
  process.exit(2);
}

const ignoredDirs = new Set(['node_modules', '.git', 'dist', 'build', 'coverage']);
const codeExts = new Set(['.css', '.scss', '.ts', '.tsx', '.js', '.jsx', '.html']);
async function walk(dir) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return []; }
  const files = [];
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) files.push(...await walk(join(dir, entry.name)));
    } else if (entry.isFile()) files.push(join(dir, entry.name));
  }
  return files;
}

function addCount(map, key, amount = 1) {
  map[key] = (map[key] ?? 0) + amount;
}

const top = await readdir(root, { withFileTypes: true });
const projects = top.filter((entry) => entry.isDirectory() && !ignoredDirs.has(entry.name));
const results = [];

for (const project of projects) {
  const dir = join(root, project.name);
  const files = await walk(dir);
  const textFiles = [];
  for (const file of files) {
    if (codeExts.has(file.slice(file.lastIndexOf('.')))) {
      try { textFiles.push({ path: file, text: await readFile(file, 'utf8') }); } catch { /* unreadable generated file */ }
    }
  }

  const transcript = files.find((file) => /\.(txt|log|md)$/i.test(file) && /\d{4}[-_]\d{2}[-_]\d{2}/.test(file))
    ?? files.find((file) => /transcript|conversation|session/i.test(file) && /\.(txt|log|md)$/i.test(file));
  const transcriptText = transcript ? await readFile(transcript, 'utf8') : '';
  const actionLines = transcriptText.split(/\r?\n/).filter((line) => /\b(?:Ran|Called|Read|Searched|Listed|Edited|Wrote|Created|Updated|Moved|Removed|Globbed|Fetched)\b.*\(ctrl\+o to expand\)/i.test(line));
  const actionCounts = {};
  for (const line of actionLines) {
    const match = line.match(/\b(Ran|Called|Read|Searched|Listed|Edited|Wrote|Created|Updated|Moved|Removed|Globbed|Fetched)\b/i);
    if (match) addCount(actionCounts, match[1].toLowerCase());
  }
  const durations = [...transcriptText.matchAll(/✻[^\n]*?\bfor\s+(?:(\d+)m\s*)?(\d+)s\b/g)]
    .map((match) => Number(match[1] ?? 0) * 60 + Number(match[2]));
  const userPrompts = transcriptText.split(/\r?\n/).filter((line) => /^\s*❯\s*\S/.test(line));

  const importRefs = [];
  const tokenDefinitions = new Map();
  const rawColors = [];
  const radiusRules = [];
  const shadowRules = [];
  const projectCss = textFiles.filter(({ path }) => /\.(css|scss)$/i.test(path));
  for (const file of textFiles) {
    const importRegex = /(?:from\s*|import\s*|require\s*\()(['"])(@monoschemes\/ui(?:[^'"]*)?)\1/g;
    for (const match of file.text.matchAll(importRegex)) importRefs.push({ file: relative(dir, file.path), specifier: match[2] });
    if (/\.(css|scss)$/i.test(file.path)) {
      for (const match of file.text.matchAll(/(--(?:color|spacing|font|gap|radius|motion|section|container|breakpoint|icon)-[\w-]+)\s*:/g)) {
        tokenDefinitions.set(match[1], [...(tokenDefinitions.get(match[1]) ?? []), relative(dir, file.path)]);
      }
      for (const match of file.text.matchAll(/(?:^|[;{\s])([\w-]+)\s*:\s*(#[0-9a-f]{3,8}\b|(?:rgb|rgba|hsl|hsla)\([^)]*\)|color\([^)]*\)|[a-z]+)(?=\s*[;}])/gim)) {
        if (match[2].startsWith('#') || /^(?:rgb|rgba|hsl|hsla|color)\(/i.test(match[2]) || /^(?:black|white|red|blue|green|gray|grey|orange|purple|transparent)$/i.test(match[2])) {
          rawColors.push({ file: relative(dir, file.path), declaration: `${match[1]}: ${match[2]}` });
        }
      }
      for (const match of file.text.matchAll(/border-radius\s*:\s*([^;}]+)/gi)) radiusRules.push({ file: relative(dir, file.path), value: match[1].trim() });
      for (const match of file.text.matchAll(/box-shadow\s*:\s*([^;}]+)/gi)) shadowRules.push({ file: relative(dir, file.path), value: match[1].trim() });
    }
  }

  let packageJson = {};
  try { packageJson = JSON.parse(await readFile(join(dir, 'package.json'), 'utf8')); } catch { /* no manifest */ }
  const extraDependencies = Object.keys({ ...(packageJson.dependencies ?? {}), ...(packageJson.devDependencies ?? {}) })
    .filter((name) => !['react', 'react-dom', '@monoschemes/ui'].includes(name)).sort();
  const tscPath = join(dir, 'node_modules', '.bin', process.platform === 'win32' ? 'tsc.cmd' : 'tsc');
  let typecheck = 'not available (no local TypeScript installation)';
  try {
    await stat(tscPath);
    const isolatedProject = await mkdtemp(join(tmpdir(), 'monoschemes-agent-tsc-'));
    try {
      await cp(dir, isolatedProject, {
        recursive: true,
        filter: (source) => {
          const name = source.slice(dir.length + 1).split(/[\\/]/)[0];
          return !ignoredDirs.has(name) && name !== 'storybook-static';
        },
      });
      const isolatedNodeModules = join(isolatedProject, 'node_modules');
      await mkdir(isolatedNodeModules, { recursive: true });
      const dependencies = await readdir(join(dir, 'node_modules'), { withFileTypes: true });
      for (const dependency of dependencies) {
        if (dependency.name !== '.tmp') {
          await symlink(join(dir, 'node_modules', dependency.name), join(isolatedNodeModules, dependency.name), dependency.isDirectory() ? 'dir' : 'file');
        }
      }
      // Keep TypeScript build-info files in this temporary copy, never in the round folder.
      await mkdir(join(isolatedNodeModules, '.tmp'), { recursive: true });
      const isolatedTsc = join(isolatedNodeModules, '.bin', process.platform === 'win32' ? 'tsc.cmd' : 'tsc');
      const checked = spawnSync(isolatedTsc, ['--noEmit'], { cwd: isolatedProject, encoding: 'utf8', timeout: 120000 });
      typecheck = checked.error ? `failed to run: ${checked.error.message}` : checked.status === 0 ? 'passed' : 'failed';
      if (checked.status !== 0) typecheck += `\n${(checked.stdout + checked.stderr).trim().slice(0, 3000)}`;
    } finally {
      await rm(isolatedProject, { recursive: true, force: true });
    }
  } catch { /* report unavailable */ }

  results.push({
    project: project.name,
    transcript: transcript ? relative(dir, transcript) : null,
    actionSummaryLines: actionLines,
    actionSummaryLineCounts: actionCounts,
    durationSeconds: durations.reduce((sum, value) => sum + value, 0),
    durationSegmentsSeconds: durations,
    userMessagesAfterFirst: Math.max(0, userPrompts.length - 1),
    userPromptLines: userPrompts,
    imports: importRefs,
    importsStyleCss: importRefs.some(({ specifier }) => /(?:^|\/)style\.css$/.test(specifier)),
    localTokenDefinitions: [...tokenDefinitions].map(([token, locations]) => ({ token, files: [...new Set(locations)] })),
    rawColors,
    borderRadius: radiusRules,
    boxShadow: shadowRules,
    typecheck,
    extraDependencies,
    cssFilesScanned: projectCss.map(({ path }) => relative(dir, path)),
  });
}

console.log(JSON.stringify({ roundDirectory: root, projects: results }, null, 2));

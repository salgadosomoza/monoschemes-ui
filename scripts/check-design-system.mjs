import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = new URL('../', import.meta.url);
const failures = [];

async function readJson(relativePath) {
  try {
    return JSON.parse(await readFile(new URL(relativePath, root), 'utf8'));
  } catch (error) {
    failures.push(`${relativePath}: ${error.message}`);
    return null;
  }
}

function collectLeaves(value, prefix = [], result = []) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) collectLeaves(child, [...prefix, key], result);
  } else {
    result.push({ path: prefix, value });
  }
  return result;
}

function hasPath(value, segments) {
  return segments.reduce((current, segment) => current?.[segment], value) !== undefined;
}

async function listFiles(directory, predicate) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(fullPath, predicate));
    else if (predicate(fullPath)) files.push(fullPath);
  }
  return files;
}

const tokens = await readJson('src/tokens/tokens.json');
const contract = await readJson('src/tokens/components.json');

if (tokens) {
  const primitive = tokens.colors?.primitive;
  const semanticGroups = [
    ['colors.semantic', tokens.colors?.semantic],
    ...Object.entries(tokens.colors?.modes ?? {}).map(([mode, value]) => [`colors.modes.${mode}.semantic`, value.semantic]),
  ];

  if (!primitive || !tokens.colors?.semantic) failures.push('tokens.json: expected colors.primitive and colors.semantic');

  for (const [groupName, group] of semanticGroups) {
    for (const { path: tokenPath, value } of collectLeaves(group)) {
      if (typeof value !== 'string' || !value.startsWith('primitive.')) continue;
      const primitivePath = value.split('.').slice(1);
      if (!hasPath(primitive, primitivePath)) {
        failures.push(`${groupName}.${tokenPath.join('.')}: unresolved reference "${value}"`);
      }
    }
  }
}

if (contract) {
  const components = contract.components;
  if (!components || typeof components !== 'object' || Array.isArray(components)) {
    failures.push('components.json: expected a components object');
  } else {
    for (const [name, component] of Object.entries(components)) {
      if (!component || typeof component !== 'object' || Array.isArray(component)) {
        failures.push(`components.json: "${name}" must be an object`);
        continue;
      }
      if (component.figmaNode !== undefined && !/^\d+:\d+$/.test(component.figmaNode)) {
        failures.push(`components.json: "${name}" has an invalid figmaNode (${JSON.stringify(component.figmaNode)})`);
      }
      if (component.props !== undefined && (!component.props || typeof component.props !== 'object' || Array.isArray(component.props))) {
        failures.push(`components.json: "${name}" props must be an object`);
      }
      for (const [propName, descriptor] of Object.entries(component.props ?? {})) {
        if (!descriptor || typeof descriptor !== 'object' || Array.isArray(descriptor) || typeof descriptor.type !== 'string') {
          failures.push(`components.json: "${name}" prop "${propName}" needs a descriptor with a type`);
          continue;
        }
        const hasValues = Array.isArray(descriptor.values) && descriptor.values.length > 0;
        const hasReference = typeof descriptor.reference === 'string' && descriptor.reference.length > 0;
        if (['variant', 'enum'].includes(descriptor.type) && !hasValues && !hasReference) {
          failures.push(`components.json: "${name}" prop "${propName}" needs non-empty values for ${descriptor.type}`);
        }
        if (descriptor.type === 'constant' && !Object.hasOwn(descriptor, 'value')) {
          failures.push(`components.json: "${name}" prop "${propName}" needs a value for constant`);
        }
      }
    }
  }
}

const tokenCss = await readFile(new URL('src/styles/tokens.css', root), 'utf8').catch((error) => {
  failures.push(`src/styles/tokens.css: ${error.message}`);
  return '';
});
const declaredTokens = new Set([...tokenCss.matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1]));
const tokenReference = /var\((--(?:color|spacing|gap|font|radius|motion|duration|ease|section|container|breakpoint|icon)-[\w-]+)/g;
const sourceFiles = await listFiles(new URL('src/', root).pathname, (file) => /\.(?:css|ts|tsx)$/.test(file));

for (const file of sourceFiles) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(tokenReference)) {
    if (!declaredTokens.has(match[1])) {
      const location = path.relative(new URL('../', import.meta.url).pathname, file);
      const line = source.slice(0, match.index).split('\n').length;
      failures.push(`${location}:${line}: undefined design token ${match[1]}`);
    }
  }
}

if (failures.length) {
  console.error(`Design system checks failed (${failures.length}):\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log('Design system checks passed: token references resolve, semantic color aliases target defined primitives, and component contract entries have valid shapes.');
}

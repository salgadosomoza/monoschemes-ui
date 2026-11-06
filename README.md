# @monoschemes/ui

React component library for the **MonoSchemes** design system, synced with Figma.

## Overview

`@monoschemes/ui` is the React implementation of the MonoSchemes design system. It provides reusable, typed components and design tokens kept in sync with the MonoSchemes Figma file.

## Getting Started

```bash
npm install @monoschemes/ui
```

## Usage

```tsx
import { Button } from '@monoschemes/ui';
import '@monoschemes/ui/dist/style.css';

export default function App() {
  return <Button>Hello</Button>;
}
```

## Development

```bash
# Run Storybook
npm run dev

# Build the library
npm run build

# Build Storybook static site
npm run build:storybook

# Lint
npm run lint
```

### Storybook 10

Este proyecto usa **Storybook 10**. Ten en cuenta:

- Las utilidades de test se importan desde `storybook/test` (no desde `@storybook/test`).
- Los *doc blocks* vienen incluidos en `@storybook/addon-docs`; no hace falta `@storybook/blocks`.
- No añadas `@storybook/blocks` ni `@storybook/test` en su versión 8 — son incompatibles con Storybook 10 y rompen la resolución de dependencias (`ERESOLVE`).

## Troubleshooting

**`Cannot find module @rollup/rollup-<plataforma>` al arrancar** (p. ej. `@rollup/rollup-darwin-arm64`): es el [bug conocido de npm](https://github.com/npm/cli/issues/4828) con las dependencias opcionales nativas. Suele pasar al copiar un `node_modules` instalado en otra arquitectura. Solución: reinstalar limpio para que baje el binario nativo de tu máquina.

```bash
rm -rf node_modules package-lock.json
npm install
```

## Design Tokens

Figma Variables are the canonical source for design tokens. `src/tokens/tokens.json` is the versioned primitive and semantic representation consumed by this UI library, and `src/styles/tokens.css` exposes them as CSS custom properties. `src/tokens/components.json` contains the component contract. Until token sync is automated, update the JSON representation after changing variables in Figma.

## Project Structure

```
src/
  components/   # React components
  tokens/       # Versioned design token JSON exported from Figma Variables
  styles/       # Global CSS (tokens, resets)
stories/        # Storybook stories
dist/           # Build output (gitignored)
```

## Documentation

- [Project context](docs/project-context.md)
- [Design principles](docs/design-principles.md)
- [Component contract](docs/component-contract.md)
- [Figma rules](docs/figma-rules.md)
- [Review checklist](docs/review-checklist.md)
- [Contributing](CONTRIBUTING.md)

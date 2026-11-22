# @monoschemes/ui

React component library for the **MonoSchemes** design system, synced with Figma.

Figma kit on Community: [MonoSchemes · Monochrome UI Kit](https://www.figma.com/community/file/1706316593970846496/monoschemes-monochrome-ui-kit).

## Overview

`@monoschemes/ui` is the React implementation of the MonoSchemes design system. It provides reusable, typed components and design tokens kept in sync with the MonoSchemes Figma file.

## Getting Started

```bash
npm install @monoschemes/ui
```

## Usage

`@monoschemes/ui` requires React 18 or later. Import the stylesheet once in your application entry point:

```tsx
import { Button } from '@monoschemes/ui';
import '@monoschemes/ui/style.css';

export default function App() {
  return <Button label="Get started" />;
}
```

### Themes

Set the theme on the root `<html>` element. The default is Light; set `data-theme="dark"` to use the dark theme. Use `data-theme="inverse"` on a section to create a color-inverted zone relative to its surrounding theme:

```html
<html data-theme="dark">
  <body>
    <main>
      <section data-theme="inverse">This section uses the inverse theme.</section>
    </main>
  </body>
</html>
```

Supported values are `data-theme="light"`, `data-theme="dark"` and `data-theme="inverse"`. Inverse zones cannot be nested.

### Fonts

The design system uses **Inter** for interface text and **JetBrains Mono** for code. Fonts are not bundled with the package; load them in your app, for example from Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

You can also install the corresponding `@fontsource/inter` and `@fontsource/jetbrains-mono` packages and import their CSS from your application.

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
  styles/       # Package tokens and the documented border-box sizing reset
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

## Building with an agent

The npm package includes a consumer-focused [agent guide](docs/agent-package/AGENTS.md), a [component selection map](src/tokens/components.json), [application recipes](docs/agent-package/recipes.md), a [Claude Code skill](skills/monoschemes-ui/SKILL.md), and [`llms.txt`](llms.txt). The guide is separate from the repository's root `AGENTS.md`, which contains maintainer instructions.

For a new React + TypeScript prototype, copy the [Vite prototype starter](templates/vite-prototype/README.md):

```bash
npx tiged salgadosomoza/monoschemes-ui/templates/vite-prototype my-prototype
cd my-prototype
npm install
npm run dev
```

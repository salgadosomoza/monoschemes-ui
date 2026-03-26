# @monoschemes/ui

React component library for the **MonoSchemes** design system, synced with Figma.

## Overview

`@monoschemes/ui` is the React implementation of the MonoSchemes design system. It provides reusable, typed components and design tokens that stay in sync with the Figma source of truth via `monoschemes-kit`.

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

## Design Tokens

Tokens live in `src/tokens/tokens.json` and are generated as CSS custom properties in `src/styles/tokens.css`. They are sourced from the MonoSchemes Figma file via `monoschemes-kit`.

## Project Structure

```
src/
  components/   # React components
  tokens/       # Design token JSON (source of truth from Figma)
  styles/       # Global CSS (tokens, resets)
stories/        # Storybook stories
dist/           # Build output (gitignored)
```

## Relationship to monoschemes-kit

`monoschemes-kit` holds the Figma-generated token definitions and design specs. This library (`monoschemes-ui`) consumes those tokens and implements them as React components.

# MonoSchemes Vite prototype

A small React + TypeScript + Vite project for turning a product brief into a working prototype with `@monoschemes/ui`.

## Start a new prototype

From a terminal with Node.js 20.19+ or 22.12+:

```bash
npx tiged salgadosomoza/monoschemes-ui/templates/vite-prototype my-prototype
cd my-prototype
npm install
npm run dev
```

Open the local URL printed by Vite. The starter is also suitable for an AI coding agent: read [`AGENTS.md`](./AGENTS.md), then give the agent the product brief and the screen to build.

## Included

- `@monoschemes/ui` with the package stylesheet already imported.
- Inter and JetBrains Mono loaded from Google Fonts; the package does not bundle fonts. JetBrains Mono supplies the 12/16, 14/20 and 16/24 mono text scales used by Kbd and code examples.
- A working Light/Dark selector and an adaptive `data-theme="inverse"` hero.
- Example composition with `Logo`, `SegmentedControl`, `Button`, `Tag`, `Stat`, `Card`, `EmptyState`, `Divider`, and minimal `Footer`.
- Responsive page layout using MonoSchemes semantic tokens.

## Commands

```bash
npm run dev
npm run typecheck
npm run build
npm run preview
```

## Notes for agents

The example screen is disposable. Read `AGENTS.md`, check the installed declarations for the actual API, and adapt the layout to the brief. Use package components for interface elements and local CSS only for application-level layout.

# Building a prototype with MonoSchemes

Use this project as a starting point for a product prototype, not as a production backend or an invitation to replace the design system.

## Before editing

1. Read this file and the [MonoSchemes consumer guide](https://github.com/salgadosomoza/monoschemes-ui/blob/main/docs/agent-package/AGENTS.md).
2. Read the installed TypeScript declarations before choosing component props. Use the shipped component API; do not guess names or values.
3. Ask what screen, user, content, and interaction the prototype needs if the brief does not say. Keep the existing app shell unless the requested product needs a different structure.

## Design rules

- Import `@monoschemes/ui/style.css` once in `src/main.tsx`.
- Compose with exported MonoSchemes components. Use application CSS for page layout and responsive behavior.
- Use semantic CSS variables for layout colors. Do not add hex/RGB colors, component-local color palettes, or another component library.
- Set the page theme on `<html>` to `light` or `dark`. Use `data-theme="inverse"` for a section that must contrast with either page theme; inverse zones cannot be nested.
- Keep corners square. `--radius-full` is reserved for round Avatar, Radio, and the Slider thumb.
- Load Inter and JetBrains Mono from the provided Google Fonts links or `@fontsource`; the library does not bundle fonts.
- Preserve labels, keyboard behavior, semantic elements, and visible focus styles.

## Work loop

1. Inspect the existing screen and package declarations.
2. Build the smallest complete version of the requested flow, reusing a recipe when one fits.
3. Run `npm run typecheck` and `npm run build`.
4. Check the screen in Light and Dark, including inverse sections, at desktop and mobile widths.
5. Report what is implemented, what is mocked, and any component or pattern missing from MonoSchemes. Do not silently invent a reusable component API.

The template's starting example is disposable: adapt or remove it to fit the product brief.

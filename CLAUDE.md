# CLAUDE.md

## Project

@monoschemes/ui — React component library for the MonoSchemes design system.
Synced with Figma file: https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit

## Related repos

- monoschemes-kit (vanilla reference): https://github.com/salgadosomoza/monoschemes-kit
- monoschemes-ui (this repo): https://github.com/salgadosomoza/monoschemes-ui

## Stack

- React + TypeScript + Vite (library mode)
- Storybook 8 with @storybook/addon-designs@8
- Design tokens in `src/tokens/tokens.json` + `src/styles/tokens.css`
- Naming conventions in `src/utils/figmaToReact.ts`

## Naming conventions (Figma → React)

- Component names: PascalCase (`Avatar`, `NavItem`, `FormInput`)
- Prop names: camelCase
- Reserved: `"style"` → `"variant"`, `"Status"` → `"status"`, `"Type"` → `"type"`
- Variant values: lowercase-kebab (`"Round"` → `"round"`, `"Date picker"` → `"date-picker"`)
- Boolean props: `"Show X"` → `"showX"`
- Slots (props with `#` like `panel#86:13`): IGNORE in audit, treat as `children` in React

## Component structure

Each component lives in:

```
src/components/[ComponentName]/
  [ComponentName].tsx
  [ComponentName].css
  index.ts
stories/[ComponentName].stories.tsx
```

Each story must include:

- `parameters.design.type = 'figma'`
- `parameters.design.url` pointing to the exact Figma node-id

## Figma MCP

- Use `figma-use` skill for any write operations to Figma
- File key: `XZ8yMM8VJihEwmyFaW6sCB`
- Always fetch node data before creating or modifying components

## Audit rules

When auditing Figma components:

1. Ignore props with `#` (they are slots/text overrides, not variants)
2. Flag hardcoded hex colors that should use CSS tokens
3. Flag missing states: `disabled`, `focus`, `hover`, `error`
4. Flag inconsistent naming across components
5. Suggest missing variants based on common design system patterns

## Current components

| Component   | Status      | Figma node | Props          |
|-------------|-------------|------------|----------------|
| Avatar      | ✅ done     | `2:35`     | `type`, `variant` |
| Chip        | ✅ done     | `10:468`   | `type`, `label`, `onClose`, `draggable` |
| Button      | ✅ done     | `3:76`     | `variant`, `disabled`, `label`, `onClick` |
| ButtonText  | ✅ done     | `76:808`   | `state`, `label`, `onClick` |
| ButtonIcon  | ✅ done     | `22:519`   | `variant`, `state`, `icon`, `onClick` |
| ButtonDropdown | ✅ done  | `251:1384` | `variant`, `state`, `disabled`, `label`, `onToggle` |
| ButtonWithIcon | ✅ done  | `434:2495` | `variant`, `iconPosition`, `disabled`, `label`, `icon`, `onClick` |
| ButtonGroup | ✅ done     | `37:141`   | `type`, `position`, `variant`, `label`, `icon`, `onClick` |
| NavItem     | ✅ done     | `673:2102` | `status`, `label`, `onClick`, `href` |
| Text        | ✅ done     | `130:1708` | `style`, `children`, `color`, `as` |
| Logo        | ✅ done     | `727:2495` | `type`, `label`, `src`, `alt`, `onClick`, `href` |
| Accordion   | 🔄 pending  | —          | —              |
| (rest)      | 🔄 pending  | —          | —              |

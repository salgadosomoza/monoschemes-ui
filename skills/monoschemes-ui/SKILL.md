---
name: monoschemes-ui
description: Build application screens with the installed @monoschemes/ui React component library. Use for forms, navigation, dashboards, settings, tables, empty states, and themed marketing pages.
---

# Build with MonoSchemes UI

## Workflow

1. Read the consumer `README.md`, `docs/agent-package/AGENTS.md`, and `docs/agent-package/recipes.md` shipped with the package.
2. Inspect the installed package declarations at `node_modules/@monoschemes/ui/dist/index.d.ts`. Use the exact component names, prop names, and union values from these types.
3. Use `src/tokens/components.json` to find the matching design-system component and its Figma node. Use Storybook docs for rendered examples and interaction states.
4. Import `@monoschemes/ui/style.css` once. Load Inter and JetBrains Mono from the application; they are not included in the package.
5. Compose the requested screen from the closest existing components. Add application CSS only for page layout, responsive grids, widths, and spacing.
6. Use semantic tokens for layout styling. Do not add hex/RGB colors, local copies of design tokens, replacement controls, or another UI library.
7. Use `data-theme="light"`/`"dark"` on `<html>` and `data-theme="inverse"` on a region that needs the opposite theme. Never nest inverse regions or substitute a fixed dark zone for an inverse zone.
8. Preserve labels, native semantics, built-in keyboard behavior, and focus-visible styles.
9. Validate types and production build, then check both page themes and any inverse zone.

## Component selection reminders

- Actions: `Button`. Navigation: `Link`, `NavItem`, or `SideNavItem`.
- Form controls: use the matching `Form*` component; `FormPassword` includes show/hide behavior.
- Mutually exclusive short choices: `SegmentedControl`. Content sections with associated panels: `Tabs` and `TabPanel`.
- Result sets: `FormSearch`/`FormMultiSelect` + `Table` + `Pagination`; use `EmptyState` when there are no results.
- Marketing content: `FeatureCard`, `Card`, `Stat`, and `Footer`.
- Do not invent an error variant for `InlineNotification`; use its documented API.

## Example: result filtering

```tsx
const visibleRows = rows.filter(matchesQueryAndFilters)

return visibleRows.length ? (
  <>
    <Table columns={columns} data={visibleRows} />
    <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
  </>
) : (
  <EmptyState title="No results" description="Change or clear the filters." />
)
```

If a requested pattern has no component, state the gap and suggest the closest available composition before implementing a custom control.

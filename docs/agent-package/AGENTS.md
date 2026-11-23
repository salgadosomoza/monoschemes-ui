# Using `@monoschemes/ui` in an application

These instructions are for agents building a consumer application with the installed package. They do not describe how to maintain the MonoSchemes repository.

## Start here

1. Read the consumer README and this guide.
2. Check the installed declarations in `node_modules/@monoschemes/ui/dist/index.d.ts` before choosing props. TypeScript declarations define the actual React API. `src/tokens/components.json` maps component names to Figma nodes and provides design guidance; it is not a replacement for the declarations.
3. Import the package stylesheet once from the application entry point:

   ```tsx
   import '@monoschemes/ui/style.css'
   ```

4. Load Inter and JetBrains Mono in the application. The package does not bundle fonts.
5. Build the screen with the closest exported components. Use application CSS for layout and semantic tokens for any necessary layout styling.

For a new React + TypeScript prototype, start from the [Vite prototype template](../../templates/vite-prototype/README.md) instead of rebuilding the package setup:

```bash
npx tiged salgadosomoza/monoschemes-ui/templates/vite-prototype my-prototype
cd my-prototype
npm install
npm run dev
```

## Theme and color

- Set `data-theme="light"` or `data-theme="dark"` on `<html>`.
- Use `data-theme="inverse"` on a section that needs the opposite theme from its surrounding page. It adapts when the page theme changes. Inverse zones cannot be nested.
- Do not use `data-theme="dark"` as a substitute for an inverse zone. A nested dark zone stays dark when the page is light or dark.
- Use the package's semantic color properties such as `--color-bg-page`, `--color-bg-surface`, `--color-text-primary`, `--color-text-secondary`, `--color-text-strong`, `--color-border-default`, and `--color-border-focused`. Check the installed stylesheet for the full list.
- Do not add component colors as hex, RGB, or copied local token definitions.

## MonoSchemes geometry and layout

- Let content carry visual emphasis. Use spacing, typography, and one-pixel dividers to structure the page.
- Use square corners (`--radius-none`) for layout and controls. `--radius-full` is reserved for round Avatars, Radio controls, and the Slider thumb.
- Compose screens with the provided components. Use CSS for grid, flex, widths, responsive behavior, and page-level spacing; do not recreate a component's internal appearance.
- Avoid adding another component library. If a required pattern is missing, explain the gap before building a custom control.

## Component selection

- Use `Button` for actions and `Link` for navigation. Use `NavItem` or `SideNavItem` for navigation menus.
- Use `FormInput`, `FormPassword`, `FormSelect`, `FormCombobox`, `FormCheckbox`, `FormToggle`, `FormRadio`, `FormDate`, `FormTime`, `FormNumber`, `FormMultiSelect`, and `FormSearch` for their matching input roles. Use `FormCombobox` for searchable single-choice lists and `FormMultiSelect` when several values are allowed. Keep labels visible and pass the available `name`, `id`, `required`, and `autoComplete` props where appropriate.
- Use `Tabs` for switching between associated panels. Use `SegmentedControl` for a small mutually exclusive choice such as a theme setting.
- Use `AppHeader` and `SideNav` for application navigation. Pass navigation and actions explicitly; do not add a second copy of built-in controls.
- Use `Stat` for a prominent metric, `Table` for structured rows and columns, `Pagination` for large result sets, and `EmptyState` when filtering produces no results.
- Use `CardImage` for photo-led listings; use `Card/Media` for compact people or voice choices. Use `FeatureCard` for a concise feature summary and `Card` for a general content container.
- Use `Gallery` for a listing or product photo collection. Provide meaningful `alt` text for every image; keep up to three photos in the page layout and let the Gallery viewer expose the full set.
- Use `Map` as a frame around a provider supplied map; do not add a map SDK to this UI package. Keep the address visible as text outside the map and preserve required provider attribution. Use `MapMarker` for accessible selectable locations.
- Use `Rating` for read-only scores and `RatingInput` for a one-to-five star response. Keep review counts optional and connect surrounding form help or error text with `aria-describedby`.
- Use `DescriptionList` for details about one record, not for values that need row-to-row comparison.
- Use `Footer variant="minimal"` for a compact legal footer.
- Use `AgentThread`, `Message`, `ToolCall`, `ApprovalRequest`, `AgentStatus`, `Suggestions`, and `Composer` to assemble an agent conversation UI. The consumer app supplies the model, tool execution, and voice provider; the package supplies UI and callbacks.
- Use `InlineNotification` for an inline message, `Banner` for a status notice, and `AnnouncementBar` for a site-wide announcement.
- For a display headline, use `Text` styles `display-1`, `display-2`, or `display-3`; `display` is a deprecated alias for `display-1`.

The machine-readable component map is in `src/tokens/components.json`. Recipes are in `docs/agent-package/recipes.md`.

### Component finder

| Component | Use for |
|---|---|
| `Stat` | Key figures, KPIs, metrics, property facts such as area, bedrooms and bathrooms, and prices. |
| `Form/Field` | A form-field wrapper with a visible label, helper text and an error message, composed through the matching Form control props. |
| `DescriptionList` | Detail data for one record; use Table when the same values should be compared across rows. |
| `Card` | General content containers and grouped content; use a more specific card pattern when the content has a defined structure. |
| `Card/Image` | Image-led listings and content cards with a photo, status, title, metadata, key facts, price and action. |
| `Gallery` | A featured or grid photo collection with a full-screen viewer, keyboard navigation and thumbnails. |
| `Map` | A provider-independent map frame with semantic labeling, attribution and optional zoom callbacks. |
| `Rating` | A read-only zero-to-five score with half stars and an optional count; use compact in lists. |
| `Rating/Input` | An accessible one-to-five radio group for submitting a rating. |
| `Image` | Photos and other image content with a defined aspect ratio or a semantic placeholder. |
| `Tag` | Short status labels, categories and compact metadata; use TagGroup for a collection of tags with overflow. |
| `TagGroup` | A collection of related tags that can wrap or collapse into an overflow count. |
| `Avatar` | A person or account represented by a photo, initials or a system icon. |
| `EmptyState` | A page or region with no content, no search results, or a recoverable full-view failure. |
| `Notification/InlineNotification` | A concise status or error message placed alongside the content it describes. |
| `Breadcrumb` | A hierarchical navigation trail showing the current location within a site or application. |
| `Pagination` | Navigation between pages of a large result set or collection. |
| `Divider` | A subtle line separating adjacent groups or sections without introducing a container. |
| `Table` | Structured records with columns, sorting, selection or row actions, especially when values are compared across rows. |
| `Form/Input` | A labeled single-line text, email, telephone, URL or search field. |
| `Form/Select` | A labeled single-choice field for a short, fixed list of options. |
| `Form/Combobox` | A searchable single-choice field, including long or asynchronously loaded option lists. |
| `Button` | Actions that change state or submit work; use Link for navigation to another location. |
| `Kbd` | A keyboard key or shortcut shown as supporting interface guidance. |
| `AgentThread` | A dedicated conversation or non-modal side panel, composed with messages, tool calls, approvals and a Composer. |

## Composition examples

### Form with an accessible submit action

```tsx
import { Button, FormInput, FormPassword } from '@monoschemes/ui'
import '@monoschemes/ui/style.css'

<form onSubmit={handleSubmit}>
  <FormInput label="Email" inputType="email" name="email" autoComplete="email" required />
  <FormPassword label="Password" name="password" autoComplete="current-password" required />
  <Button type="submit" label="Sign in" />
</form>
```

### Content that contrasts with the page theme

```tsx
<section data-theme="inverse" aria-labelledby="hero-title">
  <Text as="h1" style="display-2">A clear headline</Text>
  <Button label="Get started" />
</section>
```

### Accessible tabs

```tsx
<Tabs value={tab} onChange={setTab} aria-label="Settings sections">
  <Tab value="general" label="General" />
  <Tab value="notifications" label="Notifications" />
  <TabPanel value="general">…</TabPanel>
  <TabPanel value="notifications">…</TabPanel>
</Tabs>
```

## Accessibility and interaction

- Use the component's native semantics and keyboard behavior; do not replace its button, link, menu, tab, or form semantics with generic `div` elements.
- Give icon-only actions an accessible label. Provide labels for fields and meaningful alt text for informative images.
- Keep error text associated with its field, use the provided error props, and do not communicate state using color alone.
- Preserve the built-in focus-visible treatment. Do not remove outlines or add nested interactive elements.
- For controlled components, update state from the documented callback. For uncontrolled components, use the documented `default*` props.

## Before finishing

1. Check the declarations for every component and prop used; do not guess component names or enum values.
2. Confirm the stylesheet is imported once and no local color or token system was introduced.
3. Check the screen under both `data-theme="light"` and `data-theme="dark"`, including any inverse zone.
4. Run the consumer project's typecheck and production build. Report any missing design-system pattern instead of silently inventing an API.

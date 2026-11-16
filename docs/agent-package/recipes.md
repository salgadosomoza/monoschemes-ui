# MonoSchemes application recipes

These short recipes show how to compose the package for common screens. They focus on component choice and state; application-specific layout belongs in the consuming project.

## Login

Use `FormInput` for email, `FormPassword` for a revealable password, `FormCheckbox` for “remember me”, `Button type="submit"` for the primary action, `Link` for password recovery, and `InlineNotification` for a failed sign-in.

```tsx
<form onSubmit={handleSubmit}>
  {error && <InlineNotification message={error} />}
  <FormInput label="Email" inputType="email" name="email" autoComplete="email" required />
  <FormPassword label="Password" name="password" autoComplete="current-password" required />
  <FormCheckbox label="Remember me" status={remember ? 'active' : 'inactive'} onChange={setRemember} />
  <Link label="Forgot password?" href="/reset-password" size="small" />
  <Button type="submit" label="Sign in" loading={loading} />
</form>
```

Do not create a password input from a plain `FormInput`; `FormPassword` already supplies the visibility control and accessible labels.

## Settings

Use `Tabs` with matching `TabPanel` values for sections. Use `FormInput` and `FormSelect` for General settings, `SegmentedControl` for the mutually exclusive theme choice, and `FormToggle` for independent notification preferences. Keep draft state separate from saved state if Cancel must revert edits.

```tsx
<Tabs value={tab} onChange={setTab} aria-label="Settings sections">
  <Tab value="general" label="General" />
  <Tab value="notifications" label="Notifications" />
  <TabPanel value="general">{/* FormInput, FormSelect, SegmentedControl */}</TabPanel>
  <TabPanel value="notifications">{/* FormToggle items */}</TabPanel>
</Tabs>
```

Use a toggle for an independent on/off setting; use a segmented control when exactly one option must be selected.

## Dashboard with filters

Compose `AppHeader`, `SideNav`, `Stat`, `FormSearch`, `FormMultiSelect`, `Table`, `Pagination`, and `EmptyState`. Filter the source rows first, derive the page count from the filtered rows, and show `EmptyState` when none remain. Reset the page to 1 when the search or filters change.

```tsx
{filteredRows.length === 0 ? (
  <EmptyState
    icon="search"
    title="No results"
    description="Try changing or clearing your filters."
    actions={<Button variant="secondary" label="Clear filters" onClick={clearFilters} />}
  />
) : (
  <>
    <Table columns={columns} data={pageRows} />
    <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
  </>
)}
```

Use `Tag` in a table cell when a value represents a status; the table accepts React nodes in its cells.

## Landing page with a contrasting hero

Use an inverse zone for the hero so it contrasts with either page theme. Use `Text` with a display style for one leading headline, `FeatureCard` for the feature grid, `Card` for pricing options, and `Footer variant="minimal"` for the compact legal row.

```tsx
<section data-theme="inverse" aria-labelledby="hero-title">
  <Text as="h1" style="display-2"><span id="hero-title">Build with clarity.</span></Text>
  <Button label="Get started" />
</section>
<section>{features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}</section>
<Footer variant="minimal" columns={null} legal="© 2026 Example" meta={legalLinks} />
```

Do not hard-code a dark zone for the hero: `data-theme="dark"` does not invert when the surrounding page is dark.

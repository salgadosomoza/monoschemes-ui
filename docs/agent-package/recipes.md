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

Compose `AppHeader`, `SideNav`, `Stat`, `FormMultiSelect`, and `Table`. Table can own text search, sorting, row selection, page size, pagination, loading, and empty states. Use the external filter controls to derive the data passed to Table; the table resets its page when its search or page size changes.

```tsx
<Table
  aria-label="Campaigns"
  columns={columns}
  data={filteredRows}
  searchable
  searchPlaceholder="Search campaigns"
  selectable
  getRowKey={(row) => row.id}
  selectionActions={<Button variant="secondary" size="sm" label="Archive selected" onClick={archiveSelected} />}
  pageSize={25}
/>
```

Use `Tag` in a table cell when a value represents a status; cells accept React nodes. Use `DescriptionList` for the details of one selected record rather than stretching the table into a detail view.

## Landing page with a contrasting hero

Use an inverse zone for the hero so it contrasts with either page theme. Use `Text` with a display style for one leading headline. Below 768 px, `display-1`, `display-2`, and `display-3` automatically scale to 112, 80, and 64 px. Use `FeatureCard` for the feature grid, `Card` for pricing options, and `Footer variant="minimal"` for the compact legal row.

```tsx
<section data-theme="inverse" aria-labelledby="hero-title">
  <Text as="h1" style="display-2"><span id="hero-title">Build with clarity.</span></Text>
  <Button label="Get started" />
</section>
<section>{features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}</section>
<Footer variant="minimal" columns={null} legal="© 2026 Example" meta={legalLinks} />
```

Do not hard-code a dark zone for the hero: `data-theme="dark"` does not invert when the surrounding page is dark. Verify the hero twice: it should be dark on a Light page and light on a Dark page. If its background stays dark in both captures, the zone is fixed-dark rather than inverse.

## Detail page

Use the last `Breadcrumb` item as the current page (without an `href`). Put the status `Tag` above the `Text` h3, with actions aligned to the right. Follow with a row of `Stat` values, a `Divider`, and a two-column body. Keep the key/value data semantic with `<dl>`, `<dt>`, and `<dd>`; put recent activity and, when the record has a physical address, a Location block in a 320 px sidebar. Use a full-width 4:3 `Map` without zoom controls and keep the address visible below it.

```tsx
<main>
  <Breadcrumb items={[{ label: 'Projects', href: '/projects' }, { label: project.name }]} />
  <header className="detail-header">
    <div>
      <Tag label={project.status} />
      <Text as="h1" style="h3">{project.name}</Text>
    </div>
    <div className="detail-header__actions">
      <Button variant="tertiary" size="sm" iconOnly iconLeft="dots" label="More actions" />
      <Button variant="secondary" label="Edit" onClick={editProject} />
      <Button label="Publish" onClick={publishProject} />
    </div>
  </header>

  <div className="detail-stats">
    <Stat label="Tasks" value="24" />
    <Stat label="Completed" value="18" />
    <Stat label="Updated" value="Today" />
  </div>
  <Divider />

  <div className="detail-body">
    <div className="detail-body__main">
      <section><Text as="h2" style="h5">Overview</Text><p>{project.description}</p></section>
      <section>
        <Text as="h2" style="h5">Details</Text>
        <DescriptionList items={properties.map(({ label, value }) => ({ term: label, description: value }))} />
      </section>
    </div>
    <aside className="detail-body__sidebar" style={{ width: 320 }}>
      <div className="detail-person"><Avatar type="initials" size="sm" initials={owner.initials} /><Text>{owner.name}</Text></div>
      <Text style="caption" color="var(--color-text-muted)">Last activity · {project.lastActivity}</Text>
      {project.address && (
        <>
          <Divider />
          <section className="detail-location">
            <Text as="h2" style="overline">Location</Text>
            <Map label={`Map of ${project.name}`} ratio="4:3" showControls={false} attribution={mapAttribution}>
              {projectMap}
            </Map>
            <Text style="body-2">{project.address}</Text>
          </section>
        </>
      )}
    </aside>
  </div>
</main>
```

Supply the provider view and its attribution through `projectMap` and `mapAttribution`. Use consumer CSS for the responsive two-column layout; collapse the sidebar below the available content width. Use `DescriptionList` for detail metadata and `Table` when the values need row-to-row comparison.

## Multi-step form

Render a `Stepper` from the current step and keep all form values in parent state so changing steps does not discard them. On failed submission, show an error `InlineNotification` above the fields, move focus to it, and give each invalid field a corrective `helperText`.

```tsx
const [values, setValues] = useState({ name: '', email: '' });
const [step, setStep] = useState(0);
const [invalidFields, setInvalidFields] = useState<string[]>([]);
const errorNoticeRef = useRef<HTMLDivElement>(null);

function continueForm() {
  const invalid = validateStep(step, values);
  setInvalidFields(invalid);
  if (invalid.length) {
    requestAnimationFrame(() => errorNoticeRef.current?.focus());
    return;
  }
  setStep((current) => current + 1);
}

return (
  <form onSubmit={(event) => { event.preventDefault(); continueForm(); }}>
    <Stepper steps={steps} current={step} />
    {invalidFields.length > 0 && (
      <div ref={errorNoticeRef} tabIndex={-1}>
        <InlineNotification type="error" message={`${invalidFields.length} fields need your attention.`} />
      </div>
    )}
    <FormInput label="Name" name="name" value={values.name}
      onChange={(name) => setValues((current) => ({ ...current, name }))}
      error={invalidFields.includes('name')}
      helperText={invalidFields.includes('name') ? 'Enter your full name.' : 'Use the name shown on your account.'} />
    <FormInput label="Email" inputType="email" name="email" value={values.email}
      onChange={(email) => setValues((current) => ({ ...current, email }))}
      error={invalidFields.includes('email')}
      helperText={invalidFields.includes('email') ? 'Enter a valid email address.' : 'We will use this for updates.'} />
    <div className="form-step-actions">
      <Button variant="tertiary" label="Back" onClick={() => setStep((current) => Math.max(0, current - 1))} />
      <div><Button variant="secondary" label="Save draft" onClick={saveDraft} />
        <Button type="submit" label="Continue" /></div>
    </div>
  </form>
);
```

Use an error-summary ref with `tabIndex={-1}` as the focus target; the notification itself remains a live region. Keep the values object above the step-specific content so unmounting or changing a step preserves the data.

## View states

Model loading, empty, whole-view failure, and partial failure separately. Skeletons should resemble the final content layout; do not replace an entire page with a spinner. Use `EmptyState` actions for recovery and place a partial error notice above content that loaded successfully.

```tsx
if (loading) return <ProjectDetailSkeleton />; // Compose Skeletons to match the page shape.

if (projects.length === 0) {
  return <EmptyState title="No projects yet" description="Create a project to get started."
    actions={<Button label="Create project" onClick={createProject} />} />;
}

if (pageError) {
  return <EmptyState icon="alert-circle" iconTone="error" title="Projects could not load"
    description="Check your connection and try again."
    actions={<Button variant="secondary" label="Retry" onClick={retry} />} />;
}

return <>
  {activityError && <InlineNotification type="error" message="Some recent activity could not load." />}
  <ProjectContent projects={projects} activity={activity} />
</>;
```

Use `iconTone="error"` only for a whole-view error state; ordinary empty states keep the default icon tone. A partial failure should leave successfully loaded content visible.

## Listing card

Use `CardImage` for image-led search results such as homes, products, or places. Combine it with a subtle status `Tag`, a labeled tertiary icon button, `Text` for the name and location, a price, and a compact row of facts. Use `ratio` on both `CardImage` and standalone `Image` to set the aspect ratio and use `Icon` for the 16 px fact symbols.

```tsx
<CardImage src={listing.image} alt={listing.imageAlt} ratio="4:3">
  <div className="listing-card__top">
    <Tag type="subtle" size="sm" label={listing.status} />
    <Button variant="tertiary" size="sm" iconOnly iconLeft="heart" label="Save listing" onClick={saveListing} />
  </div>
  <Text style="subtitle-1">{listing.name}</Text>
  <Text style="body-2" color="var(--color-text-secondary)">{listing.location}</Text>
  <Text style="h6">{listing.price}</Text>
  <div className="listing-card__facts">
    <span><Icon name="bed" size={16} /> {listing.bedrooms} bedrooms</span>
    <span><Icon name="bath" size={16} /> {listing.bathrooms} bathrooms</span>
    <span><Icon name="ruler-measure" size={16} /> {listing.area}</span>
  </div>
  <Button variant="secondary" label="View listing" onClick={openListing} />
</CardImage>
```

Use `Card/Media` for compact people or voice choices; it is not the image-led listing card. Use `Stat` for prominent standalone figures rather than assembling metric labels and values from loose text.

## Photo gallery

Use `Gallery` when photos are a primary part of a listing or product detail. Keep the first three photos in the page layout; the viewer gives access to the remaining photos. Write meaningful alternative text for every image and add a caption only when it gives useful context.

```tsx
<Gallery
  layout="featured"
  images={listing.photos.map((photo) => ({
    src: photo.url,
    alt: photo.description,
    caption: photo.caption,
  }))}
/>
```

Use `layout="grid"` when the photos have equal priority. Below 768 px, Gallery uses its mobile carousel automatically; no responsive prop is needed.

## Agent conversation

Use `AgentThread` for a dedicated assistant view or a non-modal side panel. Keep model requests, tool execution, and voice recognition or synthesis in the consuming application. Send Composer callbacks to those services and pass their current state back as props.

```tsx
<AgentThread layout={compact ? 'panel' : 'dedicated'} open={open} onClose={closeAssistant}>
  <Message role="user" time="09:15">Find a quiet flat near the park.</Message>
  {working && <AgentStatus state="tool" label="Checking current listings…" onStop={stopRequest} />}
  <ToolCall name="Search listings" summary="quiet flats near the park" state="done"
    input="{ area: 'near the park', quiet: true }" result="8 listings found." />
  {approval && <ApprovalRequest title="Save these filters?" description="The agent wants to save this search."
    onAllow={allowSave} onDeny={denySave} onEdit={editFilters} />}
  <Message role="agent" time="09:16" actions={<MessageActions onCopy={copyAnswer} onRetry={retry} />}>
    I found eight listings that match your request.
  </Message>
  <Suggestions suggestions={['Compare the 3 cheapest', 'Show them on a map']} onSelect={sendMessage} />
  <Composer onSend={sendMessage} busy={working} onStop={stopRequest}
    onVoiceStart={requestVoicePermission} onVoiceEnd={endVoice} voiceActive={voiceActive}
    transcript={transcript} level={audioLevel} />
</AgentThread>
```

`AgentStatus` announces state transitions rather than streaming text. `AgentMark` is decorative. A pending `ApprovalRequest` moves focus to Allow; keep approval content concise and actionable. The panel does not add an overlay or trap focus. Voice controls are callbacks only: the host application requests microphone permission and provides transcription and speech services.

## Featured section

Use a section that flips with the page theme when the requirement is contrast. For a section that stays dark in both page themes, such as a launch video, use a fixed dark theme. Both bands paint their own page surface.

```tsx
<Container size="full" data-theme="inverse" style={{ background: 'var(--color-bg-page)' }}>
  <Container><Text as="h2" style="h3">Ship faster with one system</Text></Container>
</Container>
<Container size="full" data-theme="dark" style={{ background: 'var(--color-bg-page)' }}>
  <Container><Text as="h2" style="h3">Watch the launch film</Text></Container>
</Container>
```

Compare Light and Dark captures. The contrast band must flip. The fixed dark band must stay dark. Keep themed bands at the same level and avoid danger buttons inside them.

## Responsive card grid

Use `Grid minItemWidth` for a card collection and let it calculate how many cards fit. Use `Grid` with `GridItem span` when the layout needs explicit columns. `Container` provides page margins and caps centered content at 1440 px.

```tsx
<Container>
  <Grid minItemWidth="240px">
    {features.map(feature => <FeatureCard key={feature.id} {...feature.card} />)}
  </Grid>
</Container>
```

The standard grid uses 4 columns below 768 px, 8 from 768 px, and 12 from 1440 px. Use `span={{ base: 4, sm: 4, md: 6 }}` for an item that goes from full width to half width.

## Experience entry

Render roles newest first in an ordered list. A single entry has a role in `Text h5`, company and location in body 2, dates in caption with machine-readable `time` elements, and a body 2 description no wider than 680 px. Place dates at the end of the role heading row from 768 px and under the company on smaller screens. Keep 4 px between the role and company and 8 px between the entry's content blocks. Wrap optional `Tag type="subtle" size="sm"` chips with an 8 px gap and use a small Link for an optional case study.

For several roles at one company, use an h5 company heading, body 2 location and caption tenure. Place an ordered list of roles beside a vertical Divider, with a 16 px gap. Each role has an h6 heading, caption dates and a body 2 description. Use horizontal Dividers with 24 px on each side between entries.

See [Patterns / Experience entry](https://monoschemes.salgadosomoza.com/?path=/story/patterns-experience-entry--experience) for the markup and layout in both themes.

## Article content

Put the page title outside `Prose` in `Text h1`. Render semantic HTML or sanitized Markdown inside `Prose`, preserving the heading levels and captions. Wrap tables that need a keyboard-scrollable horizontal region in `<div className="prose__table" tabIndex={0} role="region" aria-label="…">`. Mark the table headers with `scope`.

## Cookie preferences

Render `CookieBanner` near the start of the page markup while the site lacks a saved choice. Position the bar at the bottom of the page or the card at a bottom corner, and leave room to reach page content and focused elements. Keep Reject all and Accept all at the same visual weight. Customize opens `CookiePreferences` with the site's current selection.

Put a persistent Cookie settings action in the Footer's `meta` slot. Connect it to the same preferences dialog. On the cookie policy page use `layout="inline"`, omit the banner, and include the list of cookies with their names, providers, categories, purposes and durations. Optional categories start off. The site owns consent storage and script activation and passes the active category IDs to `value` when preferences reopen. Apply and persist the result through `onAcceptAll`, `onRejectAll`, and `onSave`. Closing or pressing Escape leaves the choice unchanged.

import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '../Button';
import { FormToggle } from '../FormToggle';
import { Link } from '../Link';
import { Text } from '../Text';
import './CookieConsent.css';

interface CookieActions {
  onAcceptAll: () => void;
  onRejectAll: () => void;
}

export interface CookieBannerProps extends CookieActions {
  layout?: 'bar' | 'card';
  title?: string;
  message: string;
  policyHref?: string;
  onOpenPreferences: () => void;
}

export function CookieBanner({
  layout = 'bar',
  title = 'We use cookies',
  message,
  policyHref,
  onOpenPreferences,
  onAcceptAll,
  onRejectAll,
}: CookieBannerProps) {
  return (
    <aside className="cookie-banner" data-layout={layout} role="region" aria-label={title}>
      <div className="cookie-banner__copy">
        <Text as="h2" style="h6">{title}</Text>
        <Text as="p" style="body-2" color="var(--color-text-secondary)">{message}</Text>
        {policyHref && <Link size="small" href={policyHref} label="Cookie policy" />}
      </div>
      <div className="cookie-banner__actions">
        <Button className="cookie-banner__customize" variant="link" label="Customize" onClick={onOpenPreferences} />
        <Button variant="secondary" label="Reject all" onClick={onRejectAll} />
        <Button variant="secondary" label="Accept all" onClick={onAcceptAll} />
      </div>
    </aside>
  );
}

export interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required?: boolean;
}

export interface CookiePreferenceCategoryProps extends Omit<CookieCategory, 'id'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function CookiePreferenceCategory({ name, description, required, checked, onChange }: CookiePreferenceCategoryProps) {
  const descriptionId = useId();
  return (
    <li className="cookie-category">
      <div className="cookie-category__copy">
        <Text style="subtitle-2">{name}</Text>
        <div id={descriptionId}>
          <Text as="p" style="body-2" color="var(--color-text-secondary)">{description}</Text>
        </div>
      </div>
      {required
        ? <Text style="caption" color="var(--color-text-muted)">Always on</Text>
        : <FormToggle type="icon" label={name} aria-describedby={descriptionId} status={checked === undefined ? undefined : checked ? 'active' : 'inactive'} onChange={onChange} />}
    </li>
  );
}

interface CookiePreferencesContent extends CookieActions {
  title?: string;
  description: string;
  categories: readonly CookieCategory[];
  /** Active category IDs. Required categories are included automatically. */
  value?: readonly string[];
  defaultValue?: readonly string[];
  onChange?: (categories: string[]) => void;
  onSave: (categories: string[]) => void;
}

export type CookiePreferencesProps = CookiePreferencesContent & (
  | { layout?: 'dialog'; open: boolean; onClose: () => void }
  | { layout: 'inline'; open?: never; onClose?: never }
);

export function CookiePreferences(props: CookiePreferencesProps) {
  const [committed, setCommitted] = useState<readonly string[]>(props.defaultValue ?? []);
  const value = props.value ?? committed;

  const content = {
    ...props,
    value,
    onSave: (selection: string[]) => {
      setCommitted(selection);
      props.onSave(selection);
    },
    onAcceptAll: () => {
      setCommitted(props.categories.map(category => category.id));
      props.onAcceptAll();
    },
    onRejectAll: () => {
      setCommitted(props.categories.filter(category => category.required).map(category => category.id));
      props.onRejectAll();
    },
  };

  if (props.layout !== 'inline' && !props.open) return null;

  return (
    <PreferencesPanel
      {...content}
      onClose={props.onClose}
    />
  );
}

function PreferencesPanel({
  title = 'Cookie preferences',
  description,
  categories,
  value = [],
  onChange,
  onClose,
  onSave,
  onAcceptAll,
  onRejectAll,
}: CookiePreferencesContent & { onClose?: () => void }) {
  const headingId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const valueKey = JSON.stringify(value);
  const [draft, setDraft] = useState({ valueKey, selected: value });
  const selected = draft.valueKey === valueKey ? draft.selected : value;

  if (draft.valueKey !== valueKey) setDraft({ valueKey, selected: value });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement;
    dialog.showModal();
    return () => {
      dialog.close();
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, []);

  function change(id: string, checked: boolean) {
    const selection = categories
      .filter(category => category.required || (category.id === id ? checked : selected.includes(category.id)))
      .map(category => category.id);
    setDraft({ valueKey, selected: selection });
    onChange?.(selection);
  }

  const panel = (
    <>
      <header className="cookie-preferences__header">
        <div className="cookie-preferences__intro">
          <div id={headingId}><Text as="h2" style="h5">{title}</Text></div>
          <div id={descriptionId}><Text as="p" style="body-2" color="var(--color-text-secondary)">{description}</Text></div>
        </div>
        {onClose && <Button variant="tertiary" label="Close preferences" iconOnly iconLeft="x" onClick={onClose} />}
      </header>
      <ul className="cookie-preferences__categories">
        {categories.map(({ id, ...category }) => (
          <CookiePreferenceCategory
            key={id}
            {...category}
            checked={selected.includes(id)}
            onChange={checked => change(id, checked)}
          />
        ))}
      </ul>
      <footer className="cookie-preferences__actions">
        <Button variant="secondary" label="Reject all" onClick={() => {
          setDraft({ valueKey, selected: categories.filter(category => category.required).map(category => category.id) });
          onRejectAll();
        }} />
        <Button variant="secondary" label="Accept all" onClick={() => {
          setDraft({ valueKey, selected: categories.map(category => category.id) });
          onAcceptAll();
        }} />
        <Button label="Save preferences" onClick={() => onSave(categories
          .filter(category => category.required || selected.includes(category.id))
          .map(category => category.id))} />
      </footer>
    </>
  );

  if (onClose) {
    return (
      <dialog
        ref={dialogRef}
        className="cookie-preferences"
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        onCancel={event => { event.preventDefault(); onClose(); }}
      >
        {panel}
      </dialog>
    );
  }
  return <section className="cookie-preferences" aria-labelledby={headingId}>{panel}</section>;
}

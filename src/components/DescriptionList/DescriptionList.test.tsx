import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DescriptionList } from './DescriptionList';

describe('DescriptionList', () => {
  it('renders semantic description-list markup and ReactNode descriptions', () => {
    const { container } = render(<DescriptionList items={[
      { term: 'Client', description: <a href="/client">Mar Sala Estudio</a> },
      { term: 'Status', description: 'Active' },
    ]} />);

    expect(screen.getAllByRole('term')).toHaveLength(2);
    expect(screen.getAllByRole('definition')).toHaveLength(2);
    expect(container.querySelector('dl')?.children).toHaveLength(2);
    expect(container.querySelectorAll('.description-list__row dt')).toHaveLength(2);
    expect(container.querySelectorAll('.description-list__row dd')).toHaveLength(2);
    expect(container.querySelector('dt')?.textContent).toBe('Client');
    expect(container.querySelector('dd')?.textContent).toBe('Mar Sala Estudio');
    expect(screen.getByRole('link', { name: 'Mar Sala Estudio' }).getAttribute('href')).toBe('/client');
    expect(container.querySelectorAll('dt')[1].textContent).toBe('Status');
  });

  it('does not divide the last row', () => {
    const { container } = render(<DescriptionList items={[
      { term: 'First', description: 'One' },
      { term: 'Last', description: 'Two' },
    ]} />);
    const rows = container.querySelectorAll('.description-list__row');

    expect(rows[0].getAttribute('data-divided')).toBe('true');
    expect(rows[1].hasAttribute('data-divided')).toBe(false);
  });
});

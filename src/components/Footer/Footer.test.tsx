import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer, FooterColumn } from './index';
import { Link } from '../Link';

describe('Footer', () => {
  it('does not render brand, columns, or divider in minimal variant', () => {
    const { container } = render(
      <Footer
        variant="minimal"
        brandName="Hidden brand"
        brandDescription="Hidden description"
        legal="Legal notice"
        columns={<FooterColumn heading="Hidden column"><Link label="Hidden link" href="#" /></FooterColumn>}
        meta={<span>Meta</span>}
      />,
    );

    expect(screen.getByText('Legal notice')).toBeTruthy();
    expect(screen.getByText('Meta')).toBeTruthy();
    expect(screen.queryByText('Hidden brand')).toBeNull();
    expect(screen.queryByText('Hidden description')).toBeNull();
    expect(screen.queryByText('Hidden column')).toBeNull();
    expect(screen.queryByText('Hidden link')).toBeNull();
    expect(container.querySelector('.footer__divider')).toBeNull();
  });
});

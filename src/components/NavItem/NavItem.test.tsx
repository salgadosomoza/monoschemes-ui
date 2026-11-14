import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { NavItem } from './NavItem';

describe('NavItem', () => {
  afterEach(cleanup);

  it('renders its label inside the styled span and remains an accessible link', () => {
    render(<NavItem label="Home" href="/home" />);

    const link = screen.getByRole('link', { name: 'Home' });
    const label = link.querySelector('.nav-item__label');
    expect(link.getAttribute('href')).toBe('/home');
    expect(label?.textContent).toBe('Home');
  });

  it('renders its label inside the styled span and remains an accessible button', () => {
    render(<NavItem label="About" />);

    const button = screen.getByRole('button', { name: 'About' });
    expect(button.querySelector('.nav-item__label')?.textContent).toBe('About');
  });
});

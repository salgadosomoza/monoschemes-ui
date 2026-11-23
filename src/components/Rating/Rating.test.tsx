import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Rating } from './Rating';
import { RatingInput } from './RatingInput';

afterEach(cleanup);

describe('Rating', () => {
  it('rounds scores to the nearest half and announces the score and review count', () => {
    const { container } = render(<Rating value={4.26} count={128} />);
    expect(screen.getByRole('img', { name: '4.5 out of 5, 128 reviews' })).toBeTruthy();
    expect(screen.getByText('4.5')).toBeTruthy();
    expect(screen.getByText('(128)')).toBeTruthy();
    expect(container.querySelectorAll('.rating-star[data-value="half"]')).toHaveLength(1);
  });

  it('clamps values and renders the compact format', () => {
    render(<Rating value={7} count={1250} type="compact" size="sm" />);
    expect(screen.getByRole('img', { name: '5.0 out of 5, 1,250 reviews' })).toBeTruthy();
    expect(screen.getByText('5.0')).toBeTruthy();
    expect(screen.getByText('· 1,250 reviews')).toBeTruthy();
  });
});

describe('RatingInput', () => {
  it('names each radio and supports arrows, Home and End', () => {
    const onChange = vi.fn();
    render(<RatingInput defaultValue={3} name="review" onChange={onChange} aria-label="Rate your experience" />);
    const selected = screen.getByRole('radio', { name: '3 stars, Good' }) as HTMLInputElement;
    expect(selected.checked).toBe(true);
    selected.focus();
    fireEvent.keyDown(selected, { key: 'ArrowRight' });
    const fourth = screen.getByRole('radio', { name: '4 stars, Very good' }) as HTMLInputElement;
    expect(fourth.checked).toBe(true);
    expect(document.activeElement).toBe(fourth);
    fireEvent.keyDown(fourth, { key: 'Home' });
    expect((screen.getByRole('radio', { name: '1 star, Poor' }) as HTMLInputElement).checked).toBe(true);
    fireEvent.keyDown(screen.getByRole('radio', { name: '1 star, Poor' }), { key: 'End' });
    expect((screen.getByRole('radio', { name: '5 stars, Excellent' }) as HTMLInputElement).checked).toBe(true);
    expect(onChange).toHaveBeenNthCalledWith(1, 4);
    expect(onChange).toHaveBeenLastCalledWith(5);
  });

  it('uses a radio group and associates external helper and error text', () => {
    render(<><RatingInput aria-label="Rate this product" aria-describedby="rating-help rating-error" aria-invalid /><p id="rating-help">Choose from one to five stars.</p><p id="rating-error">A rating is required.</p></>);
    const group = screen.getByRole('radiogroup', { name: 'Rate this product' });
    expect(group.getAttribute('aria-describedby')).toBe('rating-help rating-error');
    expect(group.getAttribute('aria-invalid')).toBe('true');
  });

  it('does not change when disabled', () => {
    const onChange = vi.fn();
    render(<RatingInput disabled defaultValue={2} onChange={onChange} />);
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios.every((radio) => radio.disabled)).toBe(true);
    fireEvent.click(radios[4]);
    expect(onChange).not.toHaveBeenCalled();
  });
});

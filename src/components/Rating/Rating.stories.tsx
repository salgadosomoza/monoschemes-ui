import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Text } from '../Text';
import { Rating } from './Rating';
import { RatingInput } from './RatingInput';
import './Rating.stories.css';

const FIGMA = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({ design: { type: 'figma', url: `${FIGMA}${nodeId}` } });

const meta = {
  title: 'Data display/Rating',
  component: Rating,
  args: { value: 4.5, count: 128, type: 'stars', size: 'md' },
  parameters: {
    layout: 'centered',
    ...figma('2783-1399'),
    docs: { description: { component: 'Use Rating to show an average score for a product, film, book, or place. Use stars for detail pages and compact for lists and cards. The displayed score rounds to the nearest half star.' } },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 5, step: 0.1 } },
    count: { control: 'number' },
    type: { control: 'select', options: ['stars', 'compact'] },
    size: { control: 'select', options: ['md', 'sm'] },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Combinations: Story = {
  render: () => <div style={{ display: 'grid', gap: 'var(--gap-md)' }}>
    <Rating value={4.5} count={128} />
    <Rating value={4.5} count={128} size="sm" />
    <Rating value={4.5} count={128} type="compact" />
    <Rating value={4.5} count={128} type="compact" size="sm" />
  </div>,
};

export const Values: Story = {
  render: () => <div style={{ display: 'grid', gap: 'var(--gap-md)' }}>
    <Rating value={0} count={0} />
    <Rating value={2.5} count={17} />
    <Rating value={5} count={242} />
  </div>,
};

function InteractiveRating({ disabled = false, fieldError = false }: { disabled?: boolean; fieldError?: boolean }) {
  const [value, setValue] = useState(3);
  return (
    <fieldset className="rating-story-field" aria-describedby={fieldError ? 'rating-error' : 'rating-help'}>
      <legend><Text style="subtitle-2">Customer rating</Text></legend>
      <RatingInput
        name="customer-rating"
        value={value}
        onChange={setValue}
        disabled={disabled}
        aria-label="Customer rating"
        aria-describedby={fieldError ? 'rating-error' : 'rating-help'}
        aria-invalid={fieldError}
      />
      <p id="rating-help" className="rating-story-help">Choose a score from one to five.</p>
      {fieldError && <p id="rating-error" className="rating-story-error">Choose a rating before you continue.</p>}
      <p className="rating-story-value">Selected value: {value}</p>
    </fieldset>
  );
}

export const Input: Story = {
  render: () => <InteractiveRating />,
  parameters: { ...figma('2783-1512'), docs: { description: { story: 'RatingInput uses native radio inputs for form submission and radio semantics. Use an external field label and connect help or error text with aria-describedby.' } } },
};

export const InputDisabled: Story = { render: () => <InteractiveRating disabled /> };
export const InputWithFieldError: Story = { render: () => <InteractiveRating fieldError /> };
export const Dark: Story = { globals: { theme: 'dark' } };


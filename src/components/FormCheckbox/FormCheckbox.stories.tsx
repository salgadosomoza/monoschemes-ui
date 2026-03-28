import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormCheckbox } from './FormCheckbox';
import type { FormCheckboxType, FormCheckboxStatus } from './FormCheckbox';

const TYPES: FormCheckboxType[] = ['label', 'icon'];
const STATUSES: FormCheckboxStatus[] = ['inactive', 'active', 'indeterminated'];

const meta = {
  title: 'Components/Form/Checkbox',
  component: FormCheckbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: TYPES },
    status: { control: 'select', options: STATUSES },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof FormCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

// Uncontrolled — no status prop → internal useState drives rendering.
// Click this to verify interactivity; check the browser console for logs.
export const Interactive: Story = {
  parameters: figma('24-126'),
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FormCheckbox type="label" label="Click me (uncontrolled)" />
      <FormCheckbox type="icon" />
    </div>
  ),
};

export const LabelInactive: Story = {
  args: { type: 'label', status: 'inactive', label: 'Label' },
  parameters: figma('24-125'),
};

export const IconInactive: Story = {
  args: { type: 'icon', status: 'inactive' },
  parameters: figma('24-124'),
};

export const LabelActive: Story = {
  args: { type: 'label', status: 'active', label: 'Label' },
  parameters: figma('24-123'),
};

export const IconActive: Story = {
  args: { type: 'icon', status: 'active' },
  parameters: figma('24-122'),
};

export const LabelIndeterminated: Story = {
  args: { type: 'label', status: 'indeterminated', label: 'Label' },
  parameters: figma('24-121'),
};

export const IconIndeterminated: Story = {
  args: { type: 'icon', status: 'indeterminated' },
  parameters: figma('24-120'),
};

export const AllCombinations: Story = {
  parameters: figma('24-126'),
  render: () => (
    <table style={{ borderCollapse: 'separate', borderSpacing: 24 }}>
      <thead>
        <tr>
          <th />
          {STATUSES.map((s) => (
            <th key={s} style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, color: '#40444A' }}>
              {s}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TYPES.map((type) => (
          <tr key={type}>
            <td style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#40444A', paddingRight: 16 }}>{type}</td>
            {STATUSES.map((status) => (
              <td key={status}>
                <FormCheckbox type={type} status={status} label="Label" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

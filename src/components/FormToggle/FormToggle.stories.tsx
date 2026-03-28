import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormToggle } from './FormToggle';
import type { FormToggleType, FormToggleStatus } from './FormToggle';

const TYPES: FormToggleType[] = ['label', 'icon'];
const STATUSES: FormToggleStatus[] = ['inactive', 'active'];

const meta = {
  title: 'Components/Form/Toggle',
  component: FormToggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: TYPES },
    status: { control: 'select', options: STATUSES },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof FormToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

// Uncontrolled — no status prop → internal useState drives rendering.
// Click this to verify interactivity; check the browser console for logs.
export const Interactive: Story = {
  parameters: figma('444-3173'),
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FormToggle type="label" label="Click me (uncontrolled)" />
      <FormToggle type="icon" />
    </div>
  ),
};

export const LabelInactive: Story = {
  args: { type: 'label', status: 'inactive', label: 'Label' },
  parameters: figma('444-3173'),
};

export const LabelActive: Story = {
  args: { type: 'label', status: 'active', label: 'Label' },
  parameters: figma('444-3173'),
};

export const IconInactive: Story = {
  args: { type: 'icon', status: 'inactive' },
  parameters: figma('444-3173'),
};

export const IconActive: Story = {
  args: { type: 'icon', status: 'active' },
  parameters: figma('444-3173'),
};

export const AllCombinations: Story = {
  parameters: figma('444-3173'),
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
                <FormToggle type={type} status={status} label="Label" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

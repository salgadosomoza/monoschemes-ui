import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormRadio, RadioGroup } from './FormRadio';
import type { FormRadioType, FormRadioStatus } from './FormRadio';

const TYPES: FormRadioType[] = ['label', 'icon'];
const STATUSES: FormRadioStatus[] = ['inactive', 'active'];

const meta = {
  title: 'Components/Form/Radio',
  component: FormRadio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: TYPES },
    status: { control: 'select', options: STATUSES },
    label: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof FormRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

export const LabelInactive: Story = {
  args: { type: 'label', status: 'inactive', label: 'Label' },
  parameters: figma('75-119'),
};

export const LabelActive: Story = {
  args: { type: 'label', status: 'active', label: 'Label' },
  parameters: figma('75-119'),
};

export const IconInactive: Story = {
  args: { type: 'icon', status: 'inactive' },
  parameters: figma('75-119'),
};

export const IconActive: Story = {
  args: { type: 'icon', status: 'active' },
  parameters: figma('75-119'),
};

export const AllCombinations: Story = {
  parameters: figma('75-119'),
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
                <FormRadio type={type} status={status} label="Label" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const Group: Story = {
  parameters: figma('75-119'),
  render: () => (
    <RadioGroup defaultValue="b">
      <FormRadio value="a" label="Option A" />
      <FormRadio value="b" label="Option B" />
      <FormRadio value="c" label="Option C" />
    </RadioGroup>
  ),
};

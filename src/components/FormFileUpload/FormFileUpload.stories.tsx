import type { Meta, StoryObj } from '@storybook/react';
import { FormFileUpload } from './FormFileUpload';
import type { FormFileUploadType } from './FormFileUpload';

const TYPES: FormFileUploadType[] = ['default', 'drag-and-drop'];

const meta = {
  title: 'Components/Form/FileUpload',
  component: FormFileUpload,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: TYPES },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof FormFileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (nodeId: string) => ({
  design: { type: 'figma', url: `${FIGMA_BASE}${nodeId}` },
});

export const Default: Story = {
  args: { type: 'default', label: 'Choose file' },
  parameters: figma('100-493'),
};

export const DragAndDrop: Story = {
  args: { type: 'drag-and-drop' },
  parameters: figma('100-493'),
};

export const AllCombinations: Story = {
  parameters: figma('100-493'),
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'flex-start' }}>
      {TYPES.map((type) => (
        <div key={type}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#40444A', margin: '0 0 8px' }}>{type}</p>
          <FormFileUpload type={type} label="Choose file" />
        </div>
      ))}
    </div>
  ),
};

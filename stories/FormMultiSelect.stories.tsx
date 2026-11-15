import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormMultiSelect } from '../src/components/FormMultiSelect';

const options = [{ value: 'design', label: 'Design' }, { value: 'engineering', label: 'Engineering' }, { value: 'product', label: 'Product' }, { value: 'research', label: 'Research' }];
const meta = { title: 'Components/Form/Multi-select', component: FormMultiSelect, tags: ['autodocs'], parameters: { layout: 'centered', design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2504-1045' } }, args: { options } } satisfies Meta<typeof FormMultiSelect>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Teams', placeholder: 'Select teams' } };
export const Selected: Story = { args: { label: 'Teams', defaultValue: ['design', 'engineering', 'product'], maxVisibleLabels: 2 } };
export const Open: Story = { ...Default, play: async ({ canvasElement }) => { canvasElement.querySelector<HTMLButtonElement>('.form-multi-select__trigger')?.click(); } };
export const DefaultDark: Story = { ...Default, globals: { theme: 'dark' } };

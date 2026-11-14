import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AccordionItem } from '../src/components/Accordion';
import { Button } from '../src/components/Button';
import { FormInput } from '../src/components/FormInput';
import { FormSelect } from '../src/components/FormSelect';
import { FormToggle } from '../src/components/FormToggle';
import { Tab, TabPanel, Tabs } from '../src/components/Tabs';
import { Toast } from '../src/components/Notification/Toast';

function MotionDemo() {
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState('one');
  const [tab, setTab] = useState('one');
  const [toast, setToast] = useState(false);
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-lg)', width: '100%', maxWidth: 760, padding: 'var(--spacing-xl)' }}>
      <div style={{ width: '100%', overflowX: 'auto' }}><table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed', textAlign: 'left', overflowWrap: 'anywhere' }}>
        <thead><tr><th>Token</th><th>Value</th><th>Typical use</th></tr></thead>
        <tbody>
          <tr><td>instant</td><td>80 ms</td><td>Hover and press colors</td></tr>
          <tr><td>fast</td><td>120 ms</td><td>Fields and selection</td></tr>
          <tr><td>base</td><td>180 ms</td><td>Overlays, Accordion, Tabs indicator</td></tr>
          <tr><td>slow</td><td>240 ms</td><td>Toast entry and progress</td></tr>
          <tr><td>ease-out</td><td>cubic-bezier(0.2, 0, 0, 1)</td><td>Quick arrivals</td></tr>
          <tr><td>ease-in</td><td>cubic-bezier(0.4, 0, 1, 1)</td><td>Quick exits</td></tr>
          <tr><td>ease-in-out</td><td>cubic-bezier(0.4, 0, 0.2, 1)</td><td>Accordion and tab indicator</td></tr>
          <tr><td>distance-sm / md</td><td>4 / 8 px</td><td>Overlay and Toast entry</td></tr>
        </tbody>
      </table></div>
      <section><Button label="Hover or press" /><p>Hover me to see the fast color transition.</p></section>
      <FormInput label="Focus" placeholder="Focus this field" />
      <FormToggle label="Toggle" status={checked ? 'active' : 'inactive'} onChange={setChecked} />
      <FormSelect label="Select" value={selected} onChange={setSelected} options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }]} />
      <AccordionItem title="Accordion">Panel height uses the base easing curve.</AccordionItem>
      <Tabs value={tab} onChange={setTab} aria-label="Motion example">
        <Tab value="one" label="One" /><Tab value="two" label="Two" />
        <TabPanel value="one">First panel</TabPanel><TabPanel value="two">Second panel</TabPanel>
      </Tabs>
      <Button label="Show toast" onClick={() => setToast(true)} />
      <Toast message="Motion preview" duration={0} isVisible={toast} onClose={() => setToast(false)} />
    </div>
  );
}

const meta = {
  title: 'Foundations/Motion',
  component: MotionDemo,
  parameters: {
    layout: 'centered',
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2456-252' },
    docs: { description: { component: 'Motion is quick and restrained: no bounce or scaling. Use the duration and easing tokens below; reduced motion removes positional travel and Accordion height animation.' } },
  },
} satisfies Meta<typeof MotionDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Motion: Story = {};

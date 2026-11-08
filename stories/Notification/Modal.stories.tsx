import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '../../src/components/Notification/Modal';
import { Button } from '../../src/components/Button';

const meta = {
  title: 'Components/Notification/Modal',
  component: Modal,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' },
    title: { control: 'text' },
    body: { control: 'text' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (id: string) => ({ design: { type: 'figma', url: FIGMA_BASE + id } });

export const Default: Story = {
  args: { isOpen: false, onClose: () => {} },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button label="Open Modal" onClick={() => setOpen(true)} />
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Modal Title" body="This is the modal body content." />
      </div>
    );
  },
  parameters: figma('475-1894'),
};

export const WithFooter: Story = {
  args: { isOpen: false, onClose: () => {} },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button label="Open Modal" onClick={() => setOpen(true)} />
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          body="Are you sure you want to proceed with this action?"
          footer={
            <>
              <Button variant="secondary" label="Cancel" onClick={() => setOpen(false)} />
              <Button variant="primary" label="Confirm" onClick={() => setOpen(false)} />
            </>
          }
        />
      </div>
    );
  },
  parameters: figma('475-1894'),
};

export const WithLongContent: Story = {
  args: { isOpen: false, onClose: () => {} },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button label="Open Modal" onClick={() => setOpen(true)} />
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Terms of Service">
          {Array.from({ length: 8 }, (_, i) => (
            <p key={i}>Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          ))}
        </Modal>
      </div>
    );
  },
  parameters: figma('475-1894'),
};

export const NoOverlayClose: Story = {
  args: { isOpen: false, onClose: () => {} },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button label="Open Modal" onClick={() => setOpen(true)} />
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Persistent Modal" closeOnOverlayClick={false}>
          <p>Clicking the overlay will not close this modal. Use the × button or Escape key.</p>
        </Modal>
      </div>
    );
  },
  parameters: figma('475-1894'),
};

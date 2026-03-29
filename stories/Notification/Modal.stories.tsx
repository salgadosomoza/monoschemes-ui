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
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const FIGMA_BASE = 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=';
const figma = (id: string) => ({ design: { type: 'figma', url: FIGMA_BASE + id } });

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button label="Open Modal" onClick={() => setOpen(true)} />
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Modal Title">
          <p>This is the modal body content. It can contain any React content.</p>
        </Modal>
      </div>
    );
  },
  parameters: figma('475-1894'),
};

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button label="Open Modal" onClick={() => setOpen(true)} />
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          footer={
            <>
              <Button variant="secondary" label="Cancel" onClick={() => setOpen(false)} />
              <Button variant="primary" label="Confirm" onClick={() => setOpen(false)} />
            </>
          }
        >
          <p>Are you sure you want to proceed with this action?</p>
        </Modal>
      </div>
    );
  },
  parameters: figma('475-1894'),
};

export const WithLongContent: Story = {
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

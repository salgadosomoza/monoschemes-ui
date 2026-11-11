import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '../../src/components/Notification/Modal';
import { Button } from '../../src/components/Button';

const meta = {
  title: 'Components/Notification/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A dialog that interrupts the current flow to confirm a decision or collect focused input. Use it sparingly; information that can stay inline should not be put in a modal. Place the primary action on the right and use a link-style Button for Cancel. The surface follows the active theme with semantic page, text and border tokens.\n\nReact behavior: `isOpen` controls visibility; Escape and the close control call `onClose`, and overlay clicks do so when `closeOnOverlayClick` is true. The dialog receives focus when opened. Use `body` for the Figma text property; `children` remains as a deprecated rich-content escape hatch. `footer` is a React-only slot for action controls.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean', description: 'Controls whether the dialog is mounted and visible.' },
    onClose: { action: 'closed', description: 'Called by Escape, the close control, or the overlay when enabled.' },
    closeOnOverlayClick: { control: 'boolean', description: 'Allows clicking the backdrop to close the dialog. Defaults to true.' },
    title: { control: 'text', description: 'Optional dialog heading, matching the Figma title property.' },
    body: { control: 'text', description: 'Plain-text dialog body, matching the Figma body property.' },
    children: { control: false, description: 'Deprecated rich content slot. Prefer body for plain text.' },
    footer: { control: false, description: 'Optional React slot for actions such as Cancel and Confirm.' },
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
              <Button variant="link" label="Cancel" onClick={() => setOpen(false)} />
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

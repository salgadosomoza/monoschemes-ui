import type { Meta, StoryObj } from '@storybook/react';

function DesignPrinciplesPage() {
  return (
    <main style={{ maxWidth: 720, padding: 32, color: 'var(--color-text-primary)', background: 'var(--color-bg-page)' }}>
      <h1 style={{ margin: '0 0 24px', fontFamily: 'var(--font-family)', fontSize: 'var(--font-h4-size)', fontWeight: 'var(--font-h4-weight)' }}>
        Design principles
      </h1>
      <section>
        <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-family)', fontSize: 'var(--font-h6-size)', fontWeight: 'var(--font-h6-weight)' }}>
          Recto
        </h2>
        <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family)', fontSize: 'var(--font-body1-size)', lineHeight: 'var(--font-body1-line-height)' }}>
          The layout stays quiet so the content can stand out. Express structure with spacing, 1 px dividers, typography, and tone, never with rounded corners.
        </p>
        <p style={{ margin: '0 0 8px', fontFamily: 'var(--font-family)', fontSize: 'var(--font-body2-size)', fontWeight: 700 }}>
          The only uses of radius-full are:
        </p>
        <ul style={{ margin: 0, paddingLeft: 24, fontFamily: 'var(--font-family)', fontSize: 'var(--font-body2-size)', lineHeight: 1.6 }}>
          <li>Avatar with shape="round" for people.</li>
          <li>FormRadio.</li>
          <li>The FormSlider thumb.</li>
        </ul>
        <p style={{ margin: '16px 0 0', fontFamily: 'var(--font-family)', fontSize: 'var(--font-body2-size)', lineHeight: 'var(--font-body2-line-height)' }}>
          All other components, including focus rings, use radius-none.
        </p>
      </section>
    </main>
  );
}

const meta = {
  title: 'Foundations/Design Principles',
  component: DesignPrinciplesPage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Visual principles for MonoSchemes foundations and components.',
      },
    },
  },
} satisfies Meta<typeof DesignPrinciplesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recto: Story = {};
export const RectoDark: Story = {
  globals: { theme: 'dark' },
  render: () => (
    <div style={{ background: 'var(--color-bg-page)' }}>
      <DesignPrinciplesPage />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Prose } from './Prose';
import { CodeBlock } from '../CodeBlock';
import { Image } from '../Image';
import { Text } from '../Text';

const meta = {
  title: 'Data display/Prose',
  component: Prose,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: 'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=2924-1612' },
  },
} satisfies Meta<typeof Prose>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Article: Story = {
  render: () => (
    <article>
      <Text as="h1" style="h1">Export your data</Text>
      <Prose style={{ marginTop: 'var(--spacing-xl)' }}>
        <p>You can download everything in your workspace as a <strong>ZIP file</strong>. The export keeps your folders, comments and version history.</p>
        <p>Go to Settings → Data and select Export. Read about <a href="#export-formats">export formats</a> before you start.</p>
        <h2>Before you start</h2>
        <ul>
          <li>Only workspace owners can export.</li>
          <li>Large workspaces are split into several files.</li>
          <li>Shared files from other teams are not included.</li>
        </ul>
        <h3>Run the export</h3>
        <ol>
          <li>Open Settings and choose Data.</li>
          <li>Select Export and pick a format.</li>
          <li>Wait for the email with the download link.</li>
        </ol>
        <blockquote>The link in the email works for 7 days. After that, run the export again.</blockquote>
        <p>To export from the command line, use the <code>export</code> command with your workspace ID.</p>
        <CodeBlock filename="Terminal" code="monoschemes export --workspace ws_4821 --format zip" />
        <figure>
          <Image width="100%" />
          <figcaption>The Export button in Settings → Data.</figcaption>
        </figure>
        <h3 id="export-formats">Formats</h3>
        <div className="prose__table" role="region" aria-labelledby="export-formats" tabIndex={0}>
          <table>
            <thead><tr><th scope="col">Format</th><th scope="col">Includes</th><th scope="col">Size</th></tr></thead>
            <tbody><tr><td>ZIP</td><td>Files, comments, history</td><td>Full</td></tr><tr><td>CSV</td><td>Lists and tables only</td><td>Small</td></tr></tbody>
          </table>
        </div>
        <hr />
        <p>Need help? <a href="mailto:support@example.com">Contact support</a> from the Help menu.</p>
      </Prose>
    </article>
  ),
};

export const Dark: Story = { ...Article, globals: { theme: 'dark' } };

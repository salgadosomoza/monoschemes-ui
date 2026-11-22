import type { Preview } from '@storybook/react-vite';
import { createElement } from 'react';
import '../src/styles/tokens.css';
import './storybook-base.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light or dark theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.theme = context.globals.theme ?? 'light';
      }
      return createElement(
        'div',
        { style: { backgroundColor: 'var(--color-bg-page)' } },
        createElement(Story),
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        page: { name: 'page', value: 'var(--color-bg-page)' },
        white: { name: 'white', value: '#FFFFFF' },
        surface: { name: 'surface', value: '#F6F7F9' },
        dark: { name: 'dark', value: '#1E1F22' },
        black: { name: 'black', value: '#000000' },
      },
    },
    a11y: {
      config: {},
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa'],
        },
      },
    },
    pseudoStates: {
      hover: true,
      focus: true,
      active: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Foundations', ['Principles', 'Inverse zone', 'Text', 'Grid', 'Icons', 'Motion'],
          'Actions', ['Button', 'Button text', 'Link', 'Chip'],
          'Forms', ['Input', 'Select', 'Search', 'Textarea', 'Date', 'File upload', 'Checkbox', 'Radio', 'Toggle', 'Search trigger', 'Slider', 'Color field', 'Password', 'Number', 'Time', 'Multi-select', 'Date picker', 'Segmented control'],
          'Navigation', ['App header', 'Mega menu', 'Side nav', 'Tabs', 'Breadcrumb', 'Pagination', 'Stepper', 'Menu'],
          'Feedback', ['Toast', 'Banner', 'Modal', 'Inline notification', 'Announcement bar', 'Tooltip', 'Progress', 'Empty state'],
          'Data display', ['Table', 'Tag', 'Tag group', 'Avatar', 'Description list', 'Stat', 'Kbd', 'Code block', 'Divider', 'Icon tile', 'Image'],
          'Layout', ['Card', 'Footer', 'Accordion'],
          'Patterns',
        ],
      },
    },
  },

  initialGlobals: {
    theme: 'light',
    backgrounds: {
      value: 'page',
    },
  },
};

export default preview;

import type { Preview } from '@storybook/react-vite';
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        white: { name: 'white', value: '#FFFFFF' },
        surface: { name: 'surface', value: '#F6F7F9' },
        dark: { name: 'dark', value: '#1E1F22' },
        black: { name: 'black', value: '#000000' }
      }
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
  },

  options: {
    storySort: {
      method: 'alphabetical',
    },
  },

  initialGlobals: {
    backgrounds: {
      value: 'white'
    }
  }
};

export default preview;

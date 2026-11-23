import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-designs',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    'storybook-addon-pseudo-states',
    '@storybook/addon-docs'
  ],
  viteFinal: (config) => ({
    ...config,
    // Type declarations belong to the npm package, not the Storybook site.
    plugins: config.plugins?.filter((plugin) => !(plugin && 'name' in plugin && plugin.name === 'vite:dts')),
  }),
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;

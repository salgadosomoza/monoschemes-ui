import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const monoschemesTheme = create({
  base: 'light',
  brandTitle: 'MonoSchemes UI',
  brandUrl: 'https://github.com/salgadosomoza/monoschemes-ui',
  brandTarget: '_blank',
  colorPrimary: '#000000',
  colorSecondary: '#40444A',
  appBg: '#F6F7F9',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E2E5E9',
  appBorderRadius: 4,
  fontBase: 'Inter, -apple-system, sans-serif',
  textColor: '#2B2F36',
  barTextColor: '#40444A',
  barSelectedColor: '#000000',
  barBg: '#FFFFFF',
});

addons.setConfig({ theme: monoschemesTheme });

import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const monoschemesTheme = create({
  base: 'light',
  brandTitle: '<span class="monoschemes-brand"><span aria-hidden="true"></span>MonoSchemes</span>',
  // Storybook uses its text/HTML brand when brandImage is null.
  brandImage: null!,
  brandUrl: '/',
  brandTarget: '_self',
  colorPrimary: '#000000',
  colorSecondary: '#40444A',
  appBg: '#F6F7F9',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E2E5E9',
  appBorderRadius: 0,
  fontBase: 'Inter, -apple-system, sans-serif',
  textColor: '#2B2F36',
  barTextColor: '#40444A',
  barSelectedColor: '#000000',
  barBg: '#FFFFFF',
});

addons.setConfig({ theme: monoschemesTheme });

const homeTitle = 'MonoSchemes — Monochrome design system for Figma and React';

// Storybook 10 sets the tab title through its manager after navigation.
const titleElement = document.querySelector('title');
if (titleElement) {
  const updateTitle = () => {
    const current = document.title;
    const path = new URLSearchParams(window.location.search).get('path');
    const story = current.match(/(?:^| - )(.+) ⋅ Storybook$/)?.[1].split(' - ').at(-1);
    const next = !path || path === '/docs/start-here--start-here'
      ? homeTitle
      : story ? `${story} · MonoSchemes` : current;
    if (next !== current) document.title = next;
  };

  new MutationObserver(updateTitle).observe(titleElement, { childList: true, characterData: true, subtree: true });
  updateTitle();
}

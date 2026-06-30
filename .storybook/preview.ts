import '../src/index.css';

import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

import theme from './theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: theme,
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        // nameOfTheme: 'classNameForTheme',
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;

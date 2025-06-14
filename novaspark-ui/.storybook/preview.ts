import '../src/index.css'; // Import Tailwind's base styles for Storybook
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
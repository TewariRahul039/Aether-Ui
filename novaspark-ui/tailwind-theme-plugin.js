const plugin = require('tailwindcss/plugin');

// Placeholder for a robust hex to HSL conversion or direct value usage
// For now, we'll use the hex values directly for simplicity.
// Users can override with HSL strings if needed for opacity modifiers.

const novaSparkThemePlugin = plugin(
  function ({ addBase, config }) {
    const themeConfig = config(); // Get the resolved Tailwind config
    const themeColors = themeConfig.theme.colors || {};
    let lightModeVars = {};
    let darkModeVars = {};

    // Recursive function to flatten the color palette and generate CSS variables
    function generateColorCssVars(colorObject, path = [], cssVariables = {}) {
      for (const key in colorObject) {
        const value = colorObject[key];
        const newPath = path.concat(key);
        // Avoid processing 'dark' itself as a color name if it's at the root of the object being processed
        if (newPath.length === 1 && newPath[0] === 'dark') continue;

        if (typeof value === 'string') {
          if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(value) || /^(rgb|hsl)a?\(.*\)$/.test(value)) {
            const varName = `--ns-${newPath.join('-')}`;
            cssVariables[varName] = value;
          }
        } else if (typeof value === 'object' && value !== null) {
          generateColorCssVars(value, newPath, cssVariables);
        }
      }
      return cssVariables;
    }

    // Process main theme colors (excluding the 'dark' object itself at this level)
    const colorPaletteKeys = ['primary', 'secondary', 'accent', 'content', 'background', 'success', 'warning', 'error'];
    colorPaletteKeys.forEach(key => {
      if (themeColors[key]) {
        // Pass the specific color object (e.g., themeColors.primary)
        generateColorCssVars(themeColors[key], [key], lightModeVars);
      }
    });

    // Process dark theme overrides from theme.colors.dark
    if (themeColors.dark) {
      colorPaletteKeys.forEach(key => {
        if (themeColors.dark[key]) {
          // For dark mode variables, the name should still be like --ns-primary-DEFAULT
          // but the value comes from the theme.colors.dark.primary.DEFAULT
          generateColorCssVars(themeColors.dark[key], [key], darkModeVars);
        }
      });
    }

    addBase({
      ':root': lightModeVars,
      '.dark': darkModeVars,
    });
  },
  {
    // Extend the theme to use these CSS variables
    theme: {
      extend: {
        colors: {
          primary: {
            light: 'var(--ns-primary-light, #60a5fa)',
            DEFAULT: 'var(--ns-primary-DEFAULT, #3b82f6)',
            dark: 'var(--ns-primary-dark, #2563eb)',
          },
          secondary: {
            light: 'var(--ns-secondary-light, #f3f4f6)',
            DEFAULT: 'var(--ns-secondary-DEFAULT, #e5e7eb)',
            dark: 'var(--ns-secondary-dark, #d1d5db)',
          },
          accent: {
            light: 'var(--ns-accent-light, #5eead4)',
            DEFAULT: 'var(--ns-accent-DEFAULT, #14b8a6)',
            dark: 'var(--ns-accent-dark, #0f766e)',
          },
          content: {
            DEFAULT: 'var(--ns-content-DEFAULT, #1f2937)',
            subtle: 'var(--ns-content-subtle, #6b7280)',
            inverted: 'var(--ns-content-inverted, #ffffff)',
          },
          background: {
            DEFAULT: 'var(--ns-background-DEFAULT, #ffffff)',
            alt: 'var(--ns-background-alt, #f9fafb)',
          },
          success: {
            light: 'var(--ns-success-light, #34d399)',
            DEFAULT: 'var(--ns-success-DEFAULT, #10b981)',
            dark: 'var(--ns-success-dark, #059669)',
          },
          warning: {
            light: 'var(--ns-warning-light, #fcd34d)',
            DEFAULT: 'var(--ns-warning-DEFAULT, #f59e0b)',
            dark: 'var(--ns-warning-dark, #d97706)',
          },
          error: {
            light: 'var(--ns-error-light, #f87171)',
            DEFAULT: 'var(--ns-error-DEFAULT, #ef4444)',
            dark: 'var(--ns-error-dark, #dc2626)',
          },
        },
      },
    },
  }
);

// Check if running in Node.js environment for module exports
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = novaSparkThemePlugin;
} else {
  // Fallback for ES Modules if this runs in a context that supports it (e.g. Vite direct import)
  // However, Tailwind plugins typically use require.
  // This export default might not be used by Tailwind's CJS require.
  // The module.exports is the primary way Tailwind loads plugins.
  // export default novaSparkThemePlugin;
}

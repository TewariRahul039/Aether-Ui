// Import the plugin
const novaSparkThemePlugin = require('./tailwind-theme-plugin.js');

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // The actual color definitions are now in tailwind-theme-plugin.js
      // and also defined in the 'theme.extend.colors' section of the plugin itself.
      // The plugin's 'theme.extend.colors' will override these if keys match.
      // It's cleaner to keep the default palette here for reference,
      // and the plugin will ensure they are mapped to CSS variables.
      // The plugin's `theme.extend.colors` part is what makes `bg-primary` use `var(--ns-primary-DEFAULT)`.
      // The `addBase` part of the plugin defines these CSS variables using the values from this config.
      colors: {
        primary: { light: '#60a5fa', DEFAULT: '#3b82f6', dark: '#2563eb' },
        secondary: { light: '#f3f4f6', DEFAULT: '#e5e7eb', dark: '#d1d5db' },
        accent: { light: '#5eead4', DEFAULT: '#14b8a6', dark: '#0f766e' },
        content: { DEFAULT: '#1f2937', subtle: '#6b7280', inverted: '#ffffff' },
        background: { DEFAULT: '#ffffff', alt: '#f9fafb' },
        dark: { // These are the values used by the plugin to set CSS vars under '.dark'
          content: { DEFAULT: '#d1d5db', subtle: '#9ca3af', inverted: '#111827' },
          background: { DEFAULT: '#111827', alt: '#1f2937' },
          primary: { light: '#3b82f6', DEFAULT: '#2563eb', dark: '#1d4ed8' },
          secondary: { light: '#374151', DEFAULT: '#1f2937', dark: '#111827' },
          accent: { light: '#5eead4', DEFAULT: '#14b8a6', dark: '#0f766e' },
        },
        success: { light: '#34d399', DEFAULT: '#10b981', dark: '#059669' },
        warning: { light: '#fcd34d', DEFAULT: '#f59e0b', dark: '#d97706' },
        error: { light: '#f87171', DEFAULT: '#ef4444', dark: '#dc2626' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', /* ...other fonts */ ],
      },
      borderRadius: { /* ...radii */ },
      boxShadow: { /* ...shadows */ },
    },
  },
  plugins: [
    novaSparkThemePlugin, // Register the plugin
    // Other plugins like require('@tailwindcss/forms') can be added here
  ],
}

import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/lib'],
      tsconfigPath: './tsconfig.build.json',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'NovaSparkUI',
      fileName: (format) => `novaspark-ui.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        'react-dom',
        'framer-motion',
        'lucide-react',
        'clsx',
        'tailwind-merge',
        'class-variance-authority',
        '@radix-ui/react-slot',
        '@radix-ui/react-primitive'
      ],
      output: {
        globals: {
          'react': 'React',
          'react/jsx-runtime': 'ReactJsxRuntime',
          'react-dom': 'ReactDOM',
          'framer-motion': 'FramerMotion',
          'lucide-react': 'LucideReact',
          'clsx': 'clsx',
          'tailwind-merge': 'tailwindMerge',
          'class-variance-authority': 'classVarianceAuthority',
          '@radix-ui/react-slot': 'RadixReactSlot',
          '@radix-ui/react-primitive': 'RadixReactPrimitive'
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/lib'),
    }
  }
});

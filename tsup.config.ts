import { defineConfig } from 'tsup';
import { readFileSync } from 'fs';
import type { Plugin } from 'esbuild';

const cssStringPlugin: Plugin = {
  name: 'css-string',
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, (args) => {
      const css = readFileSync(args.path, 'utf8');
      return {
        contents: `export default ${JSON.stringify(css)};`,
        loader: 'js',
      };
    });
  },
};

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  target: 'es2020',
  clean: true,
  splitting: false,
  external: ['react', 'react-dom'],
  esbuildPlugins: [cssStringPlugin],
});

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/uuid-nanoid.umd.js',
    format: 'umd',
    name: 'UUIDNanoID',
    exports: 'named'
  },
  plugins: [
    nodePolyfills({
      include: ['node:crypto']
    }),
    resolve({
      browser: true
    }),
    commonjs(),
    production && terser()
  ]
};

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/uuid-nanoid.umd.js',
    format: 'umd',
    name: 'UuidNanoId',
    exports: 'named'
  },
  plugins: [
    nodePolyfills({
      include: ['node:crypto']
    }),
    resolve({
      browser: true
    }),
    commonjs()
  ]
};
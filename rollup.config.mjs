import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const production = process.env.NODE_ENV === 'production';

const config = {
  input: 'src/index.js',
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

export default [
  // UMD 格式（浏览器）
  {
    ...config,
    output: {
      file: 'dist/uuid-nanoid.umd.js',
      format: 'umd',
      name: 'UUIDNanoID',
      exports: 'named'
    }
  },
  // CommonJS 格式（Node.js）
  {
    ...config,
    output: {
      file: 'dist/uuid-nanoid.cjs',
      format: 'cjs',
      exports: 'named'
    }
  },
  // ES Module 格式（现代打包工具）
  {
    ...config,
    output: {
      file: 'dist/uuid-nanoid.esm.js',
      format: 'es',
      exports: 'named'
    }
  }
];

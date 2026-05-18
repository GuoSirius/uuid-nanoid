import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const config = {
  input: 'src/index.js',
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

const createOutput = (file, format, name, minify = false) => ({
  file,
  format,
  name,
  exports: 'named',
  plugins: minify ? [terser()] : []
});

export default [
  // UMD 格式（浏览器）
  {
    ...config,
    output: [
      createOutput('dist/uuid-nanoid.umd.js', 'umd', 'UUIDNanoID', false),
      createOutput('dist/uuid-nanoid.umd.min.js', 'umd', 'UUIDNanoID', true)
    ]
  },
  // CommonJS 格式（Node.js）
  {
    ...config,
    output: [
      createOutput('dist/uuid-nanoid.cjs', 'cjs', 'UUIDNanoID', false),
      createOutput('dist/uuid-nanoid.cjs.min.js', 'cjs', 'UUIDNanoID', true)
    ]
  },
  // ES Module 格式（现代打包工具）
  {
    ...config,
    output: [
      createOutput('dist/uuid-nanoid.esm.js', 'es', 'UUIDNanoID', false),
      createOutput('dist/uuid-nanoid.esm.min.js', 'es', 'UUIDNanoID', true)
    ]
  }
];

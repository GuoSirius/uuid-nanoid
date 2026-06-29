import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 构建前清空 dist/
function cleanDist() {
  return {
    name: 'clean-dist',
    buildStart() {
      const distDir = path.resolve(__dirname, 'dist');
      if (fs.existsSync(distDir)) {
        fs.rmSync(distDir, { recursive: true, force: true });
        console.log('🧹 已清空 dist/');
      }
    }
  };
}

// 构建结束后将类型声明文件 copy 到 dist/
function copyDts() {
  return {
    name: 'copy-dts',
    closeBundle() {
      const src = path.resolve(__dirname, 'src/index.d.ts');
      const destDir = path.resolve(__dirname, 'dist');

      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      const content = fs.readFileSync(src, 'utf-8');
      fs.writeFileSync(path.join(destDir, 'index.d.ts'), content, 'utf-8');
      fs.writeFileSync(path.join(destDir, 'index.d.cts'), content, 'utf-8');

      console.log('✅ 类型声明文件已复制到 dist/index.d.ts 和 dist/index.d.cts');
    }
  };
}

const sharedPlugins = [
  nodePolyfills({
    include: ['node:crypto']
  }),
  resolve({
    browser: true,
    preferBuiltins: false
  }),
  commonjs()
];

const createOutput = (file, format, name, minify = false) => ({
  file,
  format,
  name,
  exports: 'named',
  sourcemap: !minify,
  plugins: minify ? [terser()] : []
});

export default [
  // UMD 格式（浏览器 / CDN）
  {
    input: 'src/index.js',
    plugins: [
      cleanDist(),
      ...sharedPlugins
    ],
    output: [
      createOutput('dist/uuid-nanoid.umd.js', 'umd', 'UUIDNanoID', false),
      createOutput('dist/uuid-nanoid.umd.min.js', 'umd', 'UUIDNanoID', true)
    ]
  },

  // CommonJS 格式（Node.js require）
  {
    input: 'src/index.js',
    plugins: [...sharedPlugins],
    output: [
      createOutput('dist/uuid-nanoid.cjs', 'cjs', 'UUIDNanoID', false),
      createOutput('dist/uuid-nanoid.cjs.min.js', 'cjs', 'UUIDNanoID', true)
    ]
  },

  // ES Module 格式（现代打包工具 / Node.js import）
  {
    input: 'src/index.js',
    plugins: [
      ...sharedPlugins,
      copyDts()
    ],
    output: [
      createOutput('dist/uuid-nanoid.esm.js', 'es', 'UUIDNanoID', false),
      createOutput('dist/uuid-nanoid.esm.min.js', 'es', 'UUIDNanoID', true)
    ]
  }
];

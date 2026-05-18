# UMD 版本构建项目计划

## 项目概述

创建一个 Node.js 项目，安装 `uuid` 和 `nanoid` 最新版本，并配置构建脚本以输出 UMD 格式文件，方便在浏览器中直接引入使用。

## 计划步骤

### 1. 初始化 Node.js 项目
- 创建 `package.json` 文件
- 配置项目基础信息

### 2. 安装依赖
- 安装 `uuid` 最新版本
- 安装 `nanoid` 最新版本
- 安装构建工具（webpack 或 rollup）

### 3. 配置构建脚本
- 创建入口文件，导出 uuid 和 nanoid
- 配置构建工具输出 UMD 格式
- 添加构建命令到 package.json

### 4. 执行构建
- 运行构建命令
- 验证输出文件

## 技术选型

- **构建工具**: rollup（轻量级，适合库打包）
- **目标格式**: UMD（兼容 CommonJS、AMD 和全局变量）
- **输出目录**: `dist/`

## 预期输出

- `dist/uuid-nanoid.umd.js` - UMD 格式的打包文件
- 在浏览器中可通过 `window.UUID` 和 `window.NanoID` 使用

## 风险与注意事项

- 确保安装最新版本的依赖
- 正确配置 UMD 输出格式，确保浏览器兼容性
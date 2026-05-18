# GitHub 工作流实现计划

## 项目概述

当前项目是一个 UUID & NanoID UMD 库，需要添加完整的发布工作流，包括：
- 自动合并提交记录到 CHANGELOG（增量添加）
- 版本自动更新（用户可选更新类型）
- 一键发布命令
- GitHub Actions 自动构建

## 需求分析

| 需求点 | 描述 | 实现方式 |
|--------|------|----------|
| changelog 增量更新 | 合并多次提交记录到 changelog，不覆盖历史 | 使用 standard-version 工具 |
| 版本更新 | 用户可选择 major/minor/patch 升级类型 | standard-version 参数支持 |
| 未提交检测 | 检测未提交更改，提示用户提交 | 发布脚本中检查 git status |
| 一键发布 | 单个命令完成发布流程 | npm run release |
| GitHub 自动构建 | push 后自动构建验证 | GitHub Actions workflow |

## 实现步骤

### 1. 安装依赖

添加以下开发依赖：
- `standard-version`: 自动版本管理和 changelog 生成
- `inquirer`: 交互式命令行询问（用于版本选择）

### 2. 创建 CHANGELOG.md

初始化 changelog 文件，记录当前版本信息。

### 3. 修改 package.json

添加发布脚本：
- `release`: 一键发布命令
- `release:major`: 大版本升级
- `release:minor`: 小版本升级
- `release:patch`: 补丁升级

### 4. 创建发布脚本

创建 `scripts/release.js`，实现：
- 检查未提交的更改
- 交互式选择版本升级类型
- 执行 standard-version
- 推送代码和 tag

### 5. 创建 GitHub Actions Workflow

创建 `.github/workflows/release.yml`，实现：
- 代码 push 时自动构建
- tag 创建时自动发布

### 6. 更新 README.md

添加发布流程说明文档。

## 文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `package.json` | 修改 | 添加依赖和脚本 |
| `CHANGELOG.md` | 新建 | 版本变更记录 |
| `scripts/release.js` | 新建 | 发布脚本 |
| `.github/workflows/release.yml` | 新建 | GitHub Actions 工作流 |
| `README.md` | 修改 | 添加发布说明 |

## 风险评估

| 风险 | 描述 | 应对措施 |
|------|------|----------|
| 依赖冲突 | standard-version 可能与现有依赖冲突 | 使用最新稳定版本 |
| 权限问题 | 脚本执行需要 git 权限 | 确保用户配置了正确的 git credentials |
| tag 重复 | 重复创建相同 tag | standard-version 自动处理版本号 |

## 预期结果

完成后，用户可以：
1. 使用 `npm run release` 一键发布
2. 自动生成 changelog
3. 自动更新版本号和 tag
4. GitHub 自动构建验证
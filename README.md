# UUID & NanoID UMD Library

一个用于浏览器环境的 UUID 和 NanoID 生成器库，提供 UMD 格式打包，开箱即用。

## 特性

- 🚀 **UMD 格式** - 兼容 AMD、CommonJS 和全局变量
- 🌐 **浏览器优先** - 专为浏览器环境优化，无需构建工具即可使用
- 🔒 **Polyfill 支持** - 内置 crypto polyfill，确保在所有环境下正常工作
- 📦 **轻量级** - 单文件打包，体积小
- ✨ **完整 API** - 支持 UUID v3/v4/v5 和 NanoID 所有功能

## 安装

### npm 安装

```bash
npm install
npm run build
```

### 直接使用

下载 `dist/uuid-nanoid.umd.js` 并在 HTML 中引入：

```html
<script src="uuid-nanoid.umd.js"></script>
```

## 使用方法

### 基础示例

```html
<!DOCTYPE html>
<html>
<head>
    <script src="dist/uuid-nanoid.umd.js"></script>
</head>
<body>
    <script>
        // 生成 NanoID
        const nanoId = UUIDNanoID.nanoid();
        
        // 生成 UUID v4
        const uuid = UUIDNanoID.uuidv4();
        
        // 使用模块
        const customNano = UUIDNanoID.NanoID.nanoid(10);
        const uuidV3 = UUIDNanoID.UUID.v3('test', UUIDNanoID.UUID.v3.DNS);
    </script>
</body>
</html>
```

## API 文档

### NanoID

| 方法 | 说明 | 示例 |
|------|------|------|
| `nanoid([size])` | 生成 NanoID | `UUIDNanoID.nanoid()` |
| `NanoID.nanoid([size])` | 同上 | `UUIDNanoID.NanoID.nanoid(10)` |
| `NanoID.customAlphabet(alphabet, [size])` | 自定义字符集 | `UUIDNanoID.NanoID.customAlphabet('ABC', 8)()` |

### UUID

| 方法 | 说明 | 示例 |
|------|------|------|
| `uuidv4()` | 生成 UUID v4 | `UUIDNanoID.uuidv4()` |
| `UUID.v3(value, namespace)` | 生成 UUID v3 | `UUIDNanoID.UUID.v3('test', UUIDNanoID.UUID.v3.DNS)` |
| `UUID.v5(value, namespace)` | 生成 UUID v5 | `UUIDNanoID.UUID.v5('test', UUIDNanoID.UUID.v5.DNS)` |
| `UUID.NIL` | 空 UUID | `UUIDNanoID.UUID.NIL` |
| `UUID.parse(uuid)` | 解析 UUID | `UUIDNanoID.UUID.parse(uuidStr)` |
| `UUID.stringify(bytes)` | 序列化 UUID | `UUIDNanoID.UUID.stringify(bytes)` |

## 浏览器兼容性

- ✅ Chrome/Edge (最新版本)
- ✅ Firefox (最新版本)
- ✅ Safari (最新版本)
- ✅ IE 11+ (需要 polyfill)

## 技术栈

- **uuid**: ^14.0.0
- **nanoid**: ^5.1.11
- **rollup**: ^4.60.4

## 发布流程

### 一键发布

使用以下命令进行一键发布：

```bash
npm run release
```

发布脚本会自动：
1. 检测未提交的更改并提示提交
2. 询问版本升级类型（major/minor/patch/自定义）
3. 自动更新版本号
4. 生成/更新 CHANGELOG.md
5. 创建 git tag
6. 推送代码和 tag 到远程仓库

### 快速发布命令

```bash
# 大版本升级 (1.x.x → 2.0.0)
npm run release:major

# 小版本升级 (1.0.x → 1.1.0)
npm run release:minor

# 补丁升级 (1.0.0 → 1.0.1)
npm run release:patch
```

### 提交信息规范

为了正确生成 changelog，请使用以下提交信息格式：

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 添加 UUID v6 支持` |
| `fix` | 修复漏洞 | `fix: 修复浏览器兼容性问题` |
| `docs` | 文档更新 | `docs: 更新 API 文档` |
| `chore` | 构建/工具相关 | `chore: 更新依赖` |
| `refactor` | 代码重构 | `refactor: 优化性能` |
| `test` | 测试相关 | `test: 添加单元测试` |

### GitHub Actions

项目已配置 GitHub Actions，自动执行以下流程：
- **Push 到 main 分支**: 自动构建验证
- **创建 Release**: 自动发布到 npm（需配置 NPM_TOKEN）

## License

MIT
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
        const nanoId = UuidNanoId.nanoid();
        
        // 生成 UUID v4
        const uuid = UuidNanoId.uuidv4();
        
        // 使用模块
        const customNano = UuidNanoId.NanoID.nanoid(10);
        const uuidV3 = UuidNanoId.UUID.v3('test', UuidNanoId.UUID.v3.DNS);
    </script>
</body>
</html>
```

## API 文档

### NanoID

| 方法 | 说明 | 示例 |
|------|------|------|
| `nanoid([size])` | 生成 NanoID | `UuidNanoId.nanoid()` |
| `NanoID.nanoid([size])` | 同上 | `UuidNanoId.NanoID.nanoid(10)` |
| `NanoID.customAlphabet(alphabet, [size])` | 自定义字符集 | `UuidNanoId.NanoID.customAlphabet('ABC', 8)()` |

### UUID

| 方法 | 说明 | 示例 |
|------|------|------|
| `uuidv4()` | 生成 UUID v4 | `UuidNanoId.uuidv4()` |
| `UUID.v3(value, namespace)` | 生成 UUID v3 | `UuidNanoId.UUID.v3('test', UuidNanoId.UUID.v3.DNS)` |
| `UUID.v5(value, namespace)` | 生成 UUID v5 | `UuidNanoId.UUID.v5('test', UuidNanoId.UUID.v5.DNS)` |
| `UUID.NIL` | 空 UUID | `UuidNanoId.UUID.NIL` |
| `UUID.parse(uuid)` | 解析 UUID | `UuidNanoId.UUID.parse(uuidStr)` |
| `UUID.stringify(bytes)` | 序列化 UUID | `UuidNanoId.UUID.stringify(bytes)` |

## 浏览器兼容性

- ✅ Chrome/Edge (最新版本)
- ✅ Firefox (最新版本)
- ✅ Safari (最新版本)
- ✅ IE 11+ (需要 polyfill)

## 技术栈

- **uuid**: ^14.0.0
- **nanoid**: ^5.1.11
- **rollup**: ^4.60.4

## License

MIT
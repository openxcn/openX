# Contributing to OpenX / 贡献指南

感谢您有兴趣为 OpenX 做出贡献！

Thank you for your interest in contributing to OpenX!

## 🇨🇳 中文

### 如何贡献

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建一个 Pull Request

### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/aibgsps-sys/openX.git
cd openX

# 安装依赖
pnpm install

# 构建 UI
pnpm ui:build

# 构建项目
pnpm build

# 启动开发服务器
node openx.mjs gateway --dev
```

### 代码规范

- 使用 TypeScript
- 遵循现有的代码风格
- 添加必要的注释
- 编写测试用例

---

## 🇺🇸 English

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/aibgsps-sys/openX.git
cd openX

# Install dependencies
pnpm install

# Build UI
pnpm ui:build

# Build project
pnpm build

# Start development server
node openx.mjs gateway --dev
```

### Code Style

- Use TypeScript
- Follow existing code style
- Add necessary comments
- Write tests

## License / 许可证

By contributing, you agree that your contributions will be licensed under the MIT License.
贡献即表示您同意您的贡献将根据 MIT 许可证进行许可。

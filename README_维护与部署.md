# 李森个人作品集网站维护说明

这是当前可编辑源码版本，包含：

- `src/`：React 源码和页面样式
- `public/pdfs/`：方案展示使用的 PDF 文件
- `src/assets/`：封面图、文章图、Logo 等图片资源
- `dist/`：已经构建好的静态预览文件，可直接用于部署

## 本地预览

安装依赖：

```bash
npm install
```

启动本地预览：

```bash
npm run dev
```

构建线上版本：

```bash
npm run build
```

构建完成后，线上发布目录是：

```bash
dist
```

## 修改方案展示

项目数据目前在：

```text
src/App.jsx
```

PDF 文件放在：

```text
public/pdfs
```

封面图和文章图放在：

```text
src/assets
```

如果只是替换 PDF 或图片，建议尽量保持原文件名不变，这样不用改代码。

## 推荐部署方式

后续如果需要经常更新文字、图片、PDF，推荐使用：

```text
GitHub 仓库 + Cloudflare Pages 自动部署
```

Cloudflare Pages 设置：

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`

这样以后修改源码后，只要推送到 GitHub，Cloudflare Pages 会自动重新构建并更新网站。

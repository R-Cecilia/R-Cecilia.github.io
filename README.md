# Cecilia · 技术手记

Hugo 博客源码，线上地址为 <https://r-cecilia.github.io/>。
站点模板负责页面结构，仓库内的 Reimu v0.16.1 提供基础样式和 Markdown 扩展；导航和阅读交互由站点脚本管理。

## 目录

| 目录 / 文件 | 职责 |
| --- | --- |
| `content/docs/` | 独立文章与实践指南 |
| `content/notes/<topic>/` | 按知识点组织的 notebook |
| `content/about.md` | 关于页与个人链接 |
| `content/friend.md` | 友链页分类 |
| `data/links.yml` | 友链条目 |
| `layouts/_default/baseof.html` | 全站页面骨架与资源加载 |
| `layouts/partials/` | 通用导航、个人栏、文章等组件 |
| `layouts/partials/notebook/` | notebook 章节目录与阅读正文 |
| `assets/css/stellar.css` | 站点样式 |
| `assets/js/stellar.js` | 导航、显示模式、搜索、筛选与阅读进度 |
| `assets/js/reader.js` | 按需加载的代码复制、折叠、目录与图片交互 |
| `assets/images/avatar.webp` | 头像源图，由 Hugo 生成小尺寸发布版本 |
| `layouts/partials/assets/` | 合并样式、头像处理与页面能力判断 |
| `layouts/partials/head.html`、`afterFooter.html` | 页面元数据与按需资源加载 |
| `static/` | 图标、正文配图等原样发布资源 |
| `config/_default/params.yml` | 站点差异配置，其他值继承固定版本主题 |
| `hugo.toml` | 语言、Markdown、缓存与主题挂载 |
| `archetypes/` | 新文章模板 |
| `scripts/` | 正文图片和构建产物检查 |
| `themes/reimu/` | 第三方主题源码，升级时整体替换 |

`public/`、`resources/_gen/`、`.hugo-cache/` 为可再生成产物，已排除版本管理。
根目录的 `hugo.exe` 是本地工具，同样不提交。

## 本地开发

使用 Hugo Extended 0.161.1 或更高版本。检查脚本只依赖 Python 标准库。

```powershell
.\hugo.exe server --renderToMemory --disableFastRender --noBuildLock
```

浏览器打开 <http://localhost:1313/>。需要预览草稿时加 `-D`。
如果 Hugo 已加入 PATH，可把命令中的 `.\hugo.exe` 换成 `hugo`。

CSS 合并为一个文件，界面脚本和阅读脚本分开加载，均通过 Hugo Pipes 压缩并生成内容指纹。
显示模式在绘制前读取用户已有选择，首次访问默认浅色。正文与代码优先使用本地字体。

头像源图不直接发布：页面使用 160 像素版本，社交预览使用 512 像素版本，
并保留 `/avatar/avatar.webp` 作为社交预览地址。正文图片使用原生懒加载；
本地位图在构建时补充宽高，减少加载时的布局跳动。

## 写作与 notebook

```powershell
.\hugo.exe new content docs/my-article.md
.\hugo.exe new content notes/python/06-new-topic.md
```

新文件默认是草稿。发布前检查标题、日期和 `draft`。
笔记文件使用 `01-topic.md` 这样的稳定名称，不在文件名中记录学期或日期。

每个 notebook 的 `_index.md` 同时定义封面信息和第 0 章正文：

- `title`：知识点名称。
- `notebook_title`、`notebook_icon`、`description`：笔记目录卡片信息。
- Markdown 正文：第 0 章总览，可直接修改。

每章设置正整数 `weight`，同一本 notebook 内按 `1, 2, 3...` 连续排列。
`title` 包含章节编号，`chapter_title` 是不带编号的目录文字。
左侧导航和上下章翻页都按 `weight` 排列；搜索框筛选本册章节标题。

已迁移文章的 `url: /post/.../` 保留历史地址，不随文件改名。
新增文章若未设置 `url`，使用所在目录生成地址。移动文件时同步检查 `relref`。
配图放在 `static/images/`，正文使用 `/images/...`，注意大小写。

## 验证与部署

快速检查：

```powershell
python scripts/check_markdown_images.py
.\hugo.exe --renderToMemory --noBuildLock --gc --minify
```

检查完整产物时使用一个空输出目录，避免旧页面残留影响结果：

```powershell
.\hugo.exe --destination .hugo-cache/check --noBuildLock --minify --cleanDestinationDir
python scripts/check_site.py .hugo-cache/check
```

`check_site.py` 检查 HTML 的本地链接、脚本/图片/样式资源、CSS 资源引用，
以及 notebook 当前章和各页目录一致性。它不检查外部站点在线状态或正文技术结论。
非默认部署地址需传入 `--base-url`。

推送到 `source` 分支后，GitHub Actions 检查正文图片、构建站点、
校验生成链接和 notebook 导航，再部署到 GitHub Pages。
`public/` 是构建输出，不是独立的部署仓库。

## 主题边界与历史

主题默认配置保存在 `themes/reimu/config/_default/params.yml`。
站点只覆盖实际差异，不复制整份主题配置或第三方依赖表。
共享模板、样式和翻译通过 `hugo.toml` 挂载；主题静态文件只发布样式实际引用的 `taichi.png`。
未使用的主题横幅、示例图片、`static/resources` 副本及测试页面不发布。
图片预览、公式和 Mermaid 仅在正文需要时加载，并沿用主题固定版本的 CDN 配置与完整性校验。
代码复制使用浏览器 Clipboard API，图片懒加载使用原生 `loading="lazy"`，无需 Clipboard.js 或 LazySizes。
挂载机制参见 [Hugo 官方文档](https://gohugo.io/configuration/module/)。

升级主题时整体替换 `themes/reimu/`，复查差异配置、挂载范围和阅读交互，
再运行全部检查。旧封面、旧站点图标、Pixiv 数据和占位文章已从当前源码中移除，
需要时通过 Git 历史恢复；旧部署保存在 `legacy-pages-before-actions` 标签。

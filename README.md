# 从零学 AI · 全中文 AI 工程学习平台

**590 节全中文 AI 工程课 · 20 个主线阶段 + 2 条认证备考线 · 课本 / 自测 / 进度追踪 / 结业卡，全部免费，无需注册。**

一个零依赖、纯静态的单页学习平台。双击 `index.html` 即可离线使用，也可以部署到任意静态托管（GitHub Pages / Vercel / Netlify / 自己的服务器）。

## 在线使用

- **国内主站（推荐，速度快）**：<https://learn.zeroonesi.com>
- **海外站（GitHub Pages）**：<https://xmin9363-oss.github.io/from-zero-ai/>
- **离线**：下载 zip 解压后双击 `index.html`，无需联网

> 两个地址内容完全一致，进度各自独立（存于浏览器 localStorage）。数据 100% 在你自己浏览器里，不上传任何服务器。

---

## 它能做什么

| 模块 | 说明 |
|------|------|
| 📚 课本中心 | 590 节课全文阅读，编者导读（91 课）+ SHIP IT 实操作业，代码块 / 表格 / 公式完整渲染 |
| ✍️ 自测练习 | 182 道中文自测题：先自己答，再看答案自评，逐题记录对错 |
| 🧭 学习路线 | 三条分层路线：**路线 A 普通人用好 AI**（4 阶段够用就停）/ **路线 B 准 AI 工程师**（完整就业线）/ **路线 C AI 产品创造者**（以做产品为导向） |
| 📊 进度追踪 | 每课标记学完、每阶段进度条、总进度环，断点续学自动回到上次位置 |
| 🎓 结业卡 | 学完一个阶段即可领取 Canvas 绘制的结业证书，可下载 PNG 分享 |
| 🔍 全文搜索 | 跨 590 课标题搜索，秒开 |
| 💾 档案备份 | 一键导出 / 导入 JSON 学习档案，换设备不丢进度 |

**数据 100% 存在你自己的浏览器里**（localStorage），不上传任何服务器。

## 快速开始

```bash
# 方式一：直接双击（推荐）
解压后双击 index.html 即可，无需安装任何东西。

# 方式二：本地起一个静态服务（避免个别浏览器限制 file://）
npx serve .
# 或 python -m http.server 8080

# 方式三：部署到 GitHub Pages
1. 新建一个 GitHub 仓库，把整个目录推上去
2. Settings → Pages → 选择 main 分支 / root
3. 等待 1 分钟，访问 https://<你的用户名>.github.io/<仓库名>/
```

> 平台首屏只加载约 170KB（壳 + 索引），课程正文按阶段懒加载（`data/pXX.js`），590 节课也不会拖慢打开速度。

## 内容从哪来（重要）

本平台站在两个开源项目的肩膀上，谨向两位作者致谢：

| 内容 | 来源 | 许可证 |
|------|------|--------|
| 课程正文（787 课英文原版） | [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | MIT License |
| 中文翻译（社区全量翻译） | [Fancyboi999/ai-engineering-from-scratch-zh](https://github.com/Fancyboi999/ai-engineering-from-scratch-zh) | MIT License |
| 学习平台本身（学习系统 / 进度 / 路线 / 结业卡） | 本项目 | MIT License |
| 中文编者导读（91 课）+ 自测题（182 道） | 本项目原创 | MIT License |

两个源仓库均为 MIT 许可，允许商用、修改与再分发，但**必须保留原作者版权声明**。本项目在页面页脚、关于页与结业卡上均保留了完整署名；转载课程内容时请同样遵守 MIT 许可证并保留署名。

## 目录结构

```
ai-course-platform/
├── index.html          # 平台壳：全部 UI 与逻辑（单文件，零依赖）
├── data/
│   ├── manifest.js     # 索引：22 个内容组、590 课元数据、91 条导读、182 道自测题
│   ├── p00.js ~ p19.js # 20 个主线阶段课程正文（懒加载）
│   └── cert-*.js       # 2 条认证备考线课程正文（懒加载）
└── README.md
```

每个 `data/pXX.js` 的结构：`window.__P["pXX"] = { lessons: [{ id, title, md, ship }] }`。
图片与跨课链接已全部改写为 GitHub 绝对地址，离线打开也不会因防盗链挂掉（需联网加载图片）。

## 二次开发

- **加一节课**：在对应 `data/pXX.js` 的 `lessons` 数组里追加 `{ id, title, md }`，并在 `manifest.js` 对应阶段的 `lessons` 里登记同名 id。
- **加一个阶段**：新建 `data/pXX.js`，在 `manifest.js` 的 `phases` 里登记（`track: "main"` 或 `"cert"`），学习路线（PATHS）按需引用该 key。
- **换配色**：所有主题色都在 `index.html` 顶部的 `:root` CSS 变量里。

## License / 许可

- 课程正文：© rohitg00，MIT License（[原文](https://github.com/rohitg00/ai-engineering-from-scratch/blob/main/LICENSE)）
- 中文翻译：© Fancyboi999，MIT License
- 本平台（学习系统、导读、自测题）：MIT License

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

*Learning AI from scratch, in Chinese. 590 lessons · 20 phases · 2 certification tracks. Free forever, no account needed.*

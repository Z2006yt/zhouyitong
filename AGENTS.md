# AGENTS.md

## Quickstart

- **Open the project**: `open index.html` in a browser
- **Font icons**: See `font/iconfont.css` for CSS classes, `font/iconfont.js` for SVG strings
- **CDN assets**: `cdn/fontawesome/` and `cdn/lucide/` — do not modify these; they are external libraries
- **Course materials**: `9.2/web-zhouyitong/` — **excluded from git** (see .gitignore)

## Naming convention

- CSS classes, ID names, JS variables **must start with `zyt_`** (enforced by zyt_prompt.md)
- Example: `<div class="zyt-nav">`, `const zytData = ...`

## Comment convention

- **New HTML files**: add a comment block right after `<!DOCTYPE html>` (or inside `<head>`) containing all four items — author 周怡彤, creation date, the AI model used, and the feature name:
  ```html
  <!--
    作者: 周怡彤
    建立时间: YYYY-MM-DD
    使用大模型: <model name>
    功能名称: <feature / page purpose>
  -->
  ```
- **JS functions**: every function must carry a comment above it describing what it mainly does:
  ```js
  // 功能: 切换底部导航选中态并清除对应徽章
  function zyt_switchTab(idx) { ... }
  ```

## Git / Gitee

- Remote: `https://gitee.com/neusoft_wangyao_jsj/zhouyitong.git`
- Token: 47bd****（已脱敏；Gitee 私人令牌不写入仓库文件，推送 Gitee 流程见 .trae/skills/submit-project/SKILL.md，该目录已被 gitignore 排除）
- Push workflow: `git commit` + `git push` to Gitee
- `.gitignore` excludes `9.2/` directory — do not add font/assets from that folder to root

## Project structure

- `index.html` — main entry point
- `font/` — icon font files (woff2, woff, ttf), CSS, and JS with SVG strings
- `cdn/` — external CDN libraries (fontawesome, lucide)
- `9.2/web-zhouyitong/` — course/lesson materials (gitignored)

## Common tasks

- **Add a new icon font**: Generate in font customizer, add `.woff2`/.`woff`/.`ttf` to `font/`, update `font/iconfont.css`
- **Add a new HTML page**: Create file, add link from `index.html`, respect `zyt_` naming prefix
- **Use Font Awesome icons**: `<i class="iconfont icon-xxx"></i>` (font CSS) or use `cdn/fontawesome` directly
- **Use Lucide icons**: Import from `cdn/lucide/lucide.min.js`, use `<svg><use href="#icon-xxx"/></svg>` format
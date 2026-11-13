/**
 * 作者: 周怡彤
 * 建立时间: 2026-11-13
 * 使用大模型: DeepSeek-V4.1-Flash
 * 功能名称: Express 数据服务器 —— 读取 db.json 的 poems 并暴露 REST API，端口 3004
 *
 * 启动方式：
 *   cd db
 *   node server.js
 * 然后访问：
 *   http://localhost:3004/api/poems    —— JSON 数据接口
 *   http://localhost:3004/zyt_poem.html —— 前端页面（上图下文）
 */

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3004;

// db.json 路径：server.js 自身在 db/ 下，与 db.json 同级
const DB_PATH = path.join(__dirname, "db.json");

// 功能: 读取 db.json 并返回 poems 数组；失败时返回空数组 + 错误信息
function zyt_readPoems() {
  try {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    const data = JSON.parse(raw);
    return data.poems || [];
  } catch (err) {
    console.error("[zyt] 读取 db.json 失败:", err.message);
    return [];
  }
}

// 功能: 允许跨域（CORS），方便页面从其它端口/直接 file:// 访问本 API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// 功能: 暴露 GET /api/poems 接口，返回 poems 数组（每次请求都重读 db.json，修改后刷新即生效）
app.get("/api/poems", (req, res) => {
  const poems = zyt_readPoems();
  res.json({ code: 0, msg: "ok", data: poems });
});

// 功能: 暴露 GET /api/poems/:id 接口，按索引取单条（可选扩展）
app.get("/api/poems/:id", (req, res) => {
  const poems = zyt_readPoems();
  const idx = parseInt(req.params.id, 10);
  if (isNaN(idx) || idx < 0 || idx >= poems.length) {
    return res.status(404).json({ code: 404, msg: "not found", data: null });
  }
  res.json({ code: 0, msg: "ok", data: poems[idx] });
});

// 功能: 把项目根目录作为静态资源目录，让 /zyt_poem.html 等页面能直接访问
// __dirname 是 db/，所以 parent 是项目根
app.use(express.static(path.join(__dirname, "..")));

// 启动服务器
app.listen(PORT, () => {
  console.log(`[zyt] 诗歌数据服务器已启动:`);
  console.log(`[zyt]   API  : http://localhost:${PORT}/api/poems`);
  console.log(`[zyt]   页面 : http://localhost:${PORT}/zyt_poem.html`);
  console.log(`[zyt]   db   : ${DB_PATH}`);
});

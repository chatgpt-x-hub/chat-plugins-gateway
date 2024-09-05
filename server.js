// 引入 http 模块
const http = require('node:http');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // 设置响应头
  res.statusCode = 200; // 状态码 200 表示成功
  res.setHeader('Content-Type', 'text/plain'); // 设置内容类型为纯文本
  res.end('Hello, World!\n'); // 响应内容
});

// 服务器监听端口 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

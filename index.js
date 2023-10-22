const express = require("express");
const app = express();
const { spawn } = require('child_process');
const { createProxyMiddleware } = require("http-proxy-middleware");
const port= process.env.PORT||7860;
const shellFilePath = './start.sh';
const childProcess = spawn('sh', [shellFilePath]);

// 监听子进程的stdout和stderr输出
childProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

childProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

childProcess.on('close', (code) => {
  console.log(`Child process exit, exit code：${code}`);
});
// http
app.get("/", function(req, res) {
  res.send("hello world");
});
app.use(
  "/",
  createProxyMiddleware({
    changeOrigin: true,
    onProxyReq: function onProxyReq(proxyReq, req, res) { },
    pathRewrite: {
      "^/": "/",
    },
    target: "http://127.0.0.1:8080/",
    ws: true,
  })
);

app.listen(port, () => console.log(`server is running on port:${port}！`));
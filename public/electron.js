// 引入模块
const url = require("url");
const path = require("path");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const fs = require("fs");
// 开发环境
let isDev = process.env.NODE_ENV === "development";
// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win = null;

function createWindow() {
  // 创建浏览器窗口。
  win = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: false, //默认全屏
    webPreferences: {
      // 使用 preload 预加载模块, 可以把 nodeIntegration 禁用掉, 在 preload 阶段是可以访问 node 的,
      // 这样做是因为即使启用了 node, webpack 在进行打包的时候也不会识别 node 模块和 electron 模块,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      // 使用 proload 预加载注入的模块, 参看下方的 preload.js 文件
      preload: path.join(__dirname, "./preload.js"),
      devTools: true,
    },
  });

  // 删除菜单
  win.removeMenu();

  // 加载index.html文件
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : url.format({
          protocol: "file:",
          slashes: true,
          pathname: path.join(__dirname, "../build/index.html"),
        })
  );
  // win.loadFile(isDev ? 'http://localhost:3000' : url.format({
  //     protocol: 'file:',
  //     slashes: true,
  //     pathname: path.join(__dirname, '../build/index.html'),
  //   }))

  win.maximize();

  // 打开开发者工具
  // win.webContents.openDevTools();

  // 当 window 被关闭，这个事件会被触发。
  win.on("closed", () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    win = null;
  });
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on("ready", createWindow);

// 当全部窗口关闭时退出。
app.on("window-all-closed", () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow();
  }
});
ipcMain.on("download", DownloadFile);
function DownloadFile(args, file) {
  dialog
    .showSaveDialog({
      title: "保存文件",
    })
    .then((result) => {
      console.log(result, "resilt ================");
      console.log("--------------------", file, "------------------");
      // fs.writeFile(result.filePath,"\ufeff"+file,{encoding:"utf-8"},()=>{

      // })
      fs.writeFileSync(result.filePath, file, { encoding: "utf8" });
      // var ws = fs.createWriteStream(result.filePath,{encoding:"utf-8"})
      // ws.write(file)
      // ws.end()
      // fs.writeFileSync(result.filePath,file)
    })
    .catch((err) => {
      console.log(err, "----------err----------");
    });
}
// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。

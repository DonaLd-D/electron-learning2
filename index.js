const { app, BrowserWindow, ipcMain } = require('electron');
const username = 'test electron variable';
global.username = username;
const datas = {
  username: 'hanmeimei',
  gender: 'male'
};
app.on('ready', () => {
  const win = new BrowserWindow({
    width: 960,
    height: 540,
    frame: false, // 隐藏默认边框和按钮
    resizable: false, // 不可拖拽改变窗口大小
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
    }
  });

  win.webContents.openDevTools(); //打开调试面板
  win.loadFile('./layout/index.html'); //载入web页面

  // 监听渲染进程发送过来的消息
  ipcMain.on('getData', function (e, key) {
    console.log(key);
    // 通过e.sender对象返回消息给渲染进程
    e.sender.send('sendData', datas[key]);
  })

  const win2 = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
    }
  });
  win2.webContents.openDevTools(); //打开调试面板
  win2.loadFile('./layout/index2.html'); //载入web页面

});

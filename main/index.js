const { app, BrowserWindow, ipcMain, session } = require('electron')

const path = require('path')

let win

const URL =
  process.env.NODE_ENV === 'dev'
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
function createWindow() {
  win = new BrowserWindow({
    width: 1020,
    minWidth: 1020,
    height: 695,
    minHeight: 695,
    titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      webviewTag: true,
    },
  })
  win.loadURL(URL)
  win.webContents.openDevTools()
  win.on('closed', () => (win = null))

  // 伪造请求头，部分接口有限制，会报 invalid referer 错误
  const filter = {
    urls: ['https://u.y.qq.com/*'],
  }
  session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    details.requestHeaders['Referer'] = 'https://y.qq.com/wk_v17/'
    details.requestHeaders['Origin'] = 'https://y.qq.com'
    callback({ requestHeaders: details.requestHeaders })
  })
}

ipcMain.on('maximize', () => {
  if (win.isMaximized()) {
    win.unmaximize()
  } else {
    win.maximize()
  }
})

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

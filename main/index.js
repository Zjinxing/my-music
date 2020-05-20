const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');

let win;

const URL =
  process.env.NODE_ENV === 'dev'
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;
console.log(process.env.NODE_ENV, '<<<<<<,');
function createWindow() {
  win = new BrowserWindow({
    width: 1008,
    minWidth: 1008,
    height: 695,
    minHeight: 695,
    titleBarStyle: 'hidden',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      webviewTag: true,
    },
  });
  win.loadURL(URL);
  win.webContents.openDevTools();
  win.on('closed', () => (win = null));
}

ipcMain.on('maximize', () => {
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

## 使用 Electron + React + Typescript 构建桌面应用

_Electron 是一个可以使用前端技术来创建桌面应用的开源框架，有了它，前端工程师也可以方便的开发出跨平台的桌面应用_

#### 1. 项目创建

```sh
npx create-react-app my-app --typescript
```

执行完上面的命令我们创建出了一个 react + typescript 的项目，然后进入到项目目录添加 electron：

```sh
cd my-app
yarn add -D electron electron-builder
```

2.然后添加一些我们需要的开发依赖

```sh
yarn add -D wait-on concurrently cross-env
```

然后在项目的根目录创建一个 main 文件夹，在此文件夹下创建主进程应用。新建一个 index.js 文件，内容如下：

```js
const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')

let win

const URL =
  process.env.NODE_ENV === 'dev'
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
function createWindow() {
  win = new BrowserWindow({
    width: 1008,
    minWidth: 1008,
    height: 695,
    minHeight: 695,
  })
  win.loadURL(URL)
  win.webContents.openDevTools()
  win.on('closed', () => (win = null))
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
```

然后打开 package.json 文件，进行一些修改，在 `scripts` 中加上下面一行：

```
"dev": "cross-env NODE_ENV=dev concurrently \"BROWSER=none yarn start\" \"wait-on http://localhost:3000 && electron .\""
```

然后在 package.json 中在加上 main，这里的 main 指向根目录的 `main/index.js`

```
"main": "main"
```

到这一步只需要执行 `yarn dev` 就可以把开发环境跑起来了。

![electron-react](https://i.loli.net/2020/05/29/Ffw2ZXDsCY4mx19.png)

#### 2. 打包应用

在 package.json 中的 scripts 中加入以下命令：

```sh
"postinstall": "electron-builder install-app-deps",
"preelectron:build": "yarn build",
"electron:build": "electron-builder -mw"
```

其中 postinstall 是为了确保原生依赖包能和相应的 electron 版本匹配，`preelectron:build` 将在执行 electron 打包命令前先将 React 打包，然后执行 `electron:build` 对 electron 进行打包。

执行打包前，package.json 中还要进行一些配置：

```json
"author": {
  "name": "Your Name",
  "email": "your.email@domain.com",
  "url": "https://your-website.com"
},
"build": {
  "appId": "com.my-website.my-app",
  "productName": "MyApp",
  "copyright": "Copyright © 2020 ${author}",
  "mac": {
    "category": "public.app-category.utilities"
  },
  "files": [
    "build/**/*",
    "node_modules/**/*"
  ],
  "directories": {
    "buildResources": "assets"
  }
}
```

更多配置可以查看 [electron-builder 官网](https://www.electron.build/configuration/configuration)

最后执行 `yarn electron:build` 就可以打包 electron 应用了

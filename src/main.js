const electron = require('electron');
const { dialog } = require('electron');
const { shell } = require('electron');

const ipc = electron.ipcMain;

const globalShortcut = electron.globalShortcut

// import { dialog }  from 'electron';
// Module to control application life.
const app = electron.app;
const Menu = electron.Menu;
const Tray = electron.Tray;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
let appIcon = null;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
/*
console.log(app.getPath('pepperFlashSystemPlugin'));

app.commandLine.appendSwitch('ppapi-flash-path',app.getPath('pepperFlashSystemPlugin'));
app.commandLine.appendSwitch('ppapi-flash-version', '29.0.0.013');*/

function createWindow() {

    // Create the browser window.
    mainWindow = new BrowserWindow({
        transparent: false,
        frame: false,
        width: 779,
        fullscreenable: true,
        height: 558,
        alwaysOnTop: true,
        icon: path.join(__dirname, '../res/icon.ico'),
        'webPreferences': {
            'plugins': true
        }
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    appIcon = new Tray(path.join(__dirname, '../res/icon.ico'));
    var contextMenu = Menu.buildFromTemplate([{
            label: '最大化',
            type: 'normal',
            role: 'close',
            click: function(item, focusedWindow) {
                mainWindow.maximize();
                mainWindow.show();
            }
        },
        {
            label: '最小化',
            type: 'normal',
            role: 'minimize',
            click: function(item, focusedWindow) {
                mainWindow.hide();
            }
        },
        {
            label: '关于',
            type: 'normal',
            checked: true,
            click: function(item, focusedWindow) {
                shell.openExternal("https://gitee.com/yq5858588")
            }
        },
        { label: '', type: 'separator' },
        {
            label: '退出',
            type: 'normal',
            role: 'close',
            click: function(item, focusedWindow) {
                app.quit();
            }
        }
    ]);
    appIcon.setToolTip('欢迎使用数据库管理软件');
    appIcon.setContextMenu(contextMenu);
    //单点击 1.主窗口显示隐藏切换 2.清除闪烁
    appIcon.on("click", function() {
        // if (!!timer) {
        // appIcon.setImage(path.join(appIcon, 'icon.ico'))
        //主窗口显示隐藏切换
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
        // }
    })
    // mainWindow.setTitle(macAddress);
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    //注册打开控制台的快捷键
    globalShortcut.register('F7', function() {
        let win = BrowserWindow.getFocusedWindow();
        if (win) {
            // win.webContents.print();
            win.webContents.toggleDevTools();
            /* if (win.webContents.isDevToolsOpened()) {
                 win.webContents.closeDevTools();
             } else {
                 win.webContents.openDevTools({ detach: false });
             }*/
        }
    });
    //快捷键
    globalShortcut.register('F6', function() {
        let win = BrowserWindow.getFocusedWindow();
        if (!win) return;
        win.reload();
    });
    mainWindow.setMenu(null);
    // mainWindow.maximize();
    // console.log(process.versions);
    mainWindow.on('close', event => {
        /*let num = dialog.showMessageBox({
            title: '确认退出系统吗？',
            type: 'warning',
            message: '如果确认退出请点击确认，否则点击取消！',
            buttons: ['确认', '取消'],
        });
        if (num !== 0) event.preventDefault();*/
    });
    mainWindow.on('closed', function(event) {
        mainWindow = null
    })
}

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
    }
})

if (shouldQuit) {
    app.quit()
}
app.on('ready', createWindow)

app.on('window-all-closed', function(event) {
    if (appIcon) appIcon.destroy();
    if (process.platform !== 'darwin') {
        app.quit()
    }

})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
})
//登录窗口最小化
ipc.on('window-min', function() {
    mainWindow.minimize();
})
//登录窗口最大化
ipc.on('window-max', function() {
    if (mainWindow.isMaximized()) {
        mainWindow.restore();
    } else {
        mainWindow.maximize();
    }
})
ipc.on('window-close', function() {
    mainWindow.close();
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
import app from 'app'
import BrowserWindow from 'browser-window'
import path from 'path'


app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 700,
        height: 420,
        resizable: false,
        icon: path.join(__dirname, '../images/area51-icon.png'),
        title: 'Area 51 Launcher',
        center: true,
        'auto-hide-menu-bar': true,
        frame: true,
        show: false,
    })

    try {
        const yargs = require('yargs')
        const args = yargs(process.argv.slice(1)).wrap(100).argv
        if (args.dev) {
            mainWindow.show()
            mainWindow.toggleDevTools()
            mainWindow.focus()
            console.info('Dev Mode Active: Developer Tools Enabled.')
        }
    } catch (e) {}


    mainWindow.loadURL(path.normalize('file://' + path.join(__dirname, '../index.html')))
    mainWindow.webContents.on('new-window', event => event.preventDefault())

    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (!url.includes('build/index.html'))
            event.preventDefault()
    })

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show()
        mainWindow.focus()
    })

    mainWindow.on('close', app.quit)
});


app.on('window-all-closed', app.quit)
import {app, BrowserWindow, globalShortcut} from 'electron'
import { join } from 'path'

let win: BrowserWindow
const createWindow = () => {
    console.log("createWindow start aaaaa.")
    win = new BrowserWindow({
        width: 1910,
        height: 700,
    })
    if (app.isPackaged) {
        win.loadFile(join(__dirname, '../renderer/index.html'))
    } else {
        win.loadURL('http://localhost:3000')
    }
    // win.hide()
}

let open = false
const globalShortcutRegister = () => {
    const accelerator = 'CommandOrControl+Insert'
    // ショートカットのリスナーを登録します。
    let registerOption = () => {
        console.log("trigger start.")
        if (!open) {
            win.show()
            open = true
        } else {
            win.hide()
            open = false
        }
        if (!ret) {
            console.log('registration failed')
        }
    }
    const ret = globalShortcut.register(accelerator, registerOption)

    // ショートカットが登録されているかどうかをチェックします。
    console.log(globalShortcut.isRegistered(accelerator))
}
app.whenReady().then(() => {
    createWindow()
    console.log(`start2`)
    globalShortcutRegister()
    console.log(`end`)
})
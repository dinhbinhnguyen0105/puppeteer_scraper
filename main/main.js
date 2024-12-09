const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");

function createMainWindow() {
   const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(process.cwd(), "main", "preload.js"),
        contextIsolation: true, // cô lập ngữ cảnh để bảo mật
        enableBlinkFeatures: false, // Remote module
        nodeIntegration: false // tắt nodeIntegration để bảo mật
    }
   });
   win.loadFile(path.join(process.cwd(), "renderer", "index.html"));
}

app.whenReady().then(() => {
    createMainWindow();
    ipcMain.on("test", (event, data) => {
        console.log("[Test]: ", data);
    })
    
    ipcMain.on("selected-directory", (event, args) => {
        const selectedDir = args.filePath.substring(0, args.filePath.lastIndexOf(path.sep));
        console.log(selectedDir);
    });
});

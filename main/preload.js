const { contextBridge, ipcRenderer, webUtils } = require("electron");

contextBridge.exposeInMainWorld("electronAPIs", {
    send: (channel, args) => {
        if (channel === "selected-directory" && args.file) {
            const filePath = webUtils.getPathForFile(args.file);
            ipcRenderer.send("selected-directory", { filePath });
        }
    },
});

const electron = require("electron");
const app = electron.app;
let isDev = require("electron-is-dev");
const path = require("path");
const url = require("url");
require("electron-reload");

const BrowserWindow = electron.BrowserWindow;

let mainWindow;
isDev = false;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // and load the index.html of the app.
    const startUrl = isDev
        ? "http://localhost:3000"
        : url.format({
              pathname: path.join(__dirname, "/../build/index.html"),
              protocol: "file:",
              slashes: true,
          });

    mainWindow.loadURL(startUrl);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.allowRendererProcessReuse = true;

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

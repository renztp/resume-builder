const { app, BrowserWindow } = require('electron');

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 800, minHeight: 800, minWidth: 800 });
  win.loadFile('dist/resume-builder/browser/index.html');
}

app.whenReady().then(() => {
  createWindow();
});

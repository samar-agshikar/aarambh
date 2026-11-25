const { app, BrowserWindow, session, systemPreferences, ipcMain, shell } = require('electron');
const path = require('path');

app.setName('Aarambh Gaze');

async function ensureMacCameraPermission() {
  if (process.platform !== 'darwin') return 'granted';
  const status = systemPreferences.getMediaAccessStatus('camera');
  if (status === 'granted') return 'granted';
  if (status === 'not-determined') {
    const granted = await systemPreferences.askForMediaAccess('camera');
    return granted ? 'granted' : 'denied';
  }
  return status;
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 960,
    minHeight: 680,
    title: 'Aarambh Gaze',
    backgroundColor: '#090d16',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  const devUrl = process.env.VITE_DEV_SERVER_URL;
  if (devUrl) {
    mainWindow.loadURL(devUrl);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  session.defaultSession.setPermissionCheckHandler((_webContents, permission) => {
    if (permission === 'media') {
      return true;
    }
    return false;
  });

  session.defaultSession.setPermissionRequestHandler(async (_webContents, permission, callback) => {
    if (permission === 'media') {
      const status = await ensureMacCameraPermission();
      callback(status === 'granted');
      return;
    }
    callback(false);
  });

  ipcMain.handle('camera:request-permission', async () => {
    return await ensureMacCameraPermission();
  });

  ipcMain.handle('camera:open-privacy-settings', async () => {
    if (process.platform === 'darwin') {
      await shell.openExternal('x-apple.systempreferences:com.apple.preference.security?Privacy_Camera');
    }
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

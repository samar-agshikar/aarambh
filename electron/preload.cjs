const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('aarambhDesktop', {
  isDesktop: true,
  platform: process.platform,
  requestCameraPermission: () => ipcRenderer.invoke('camera:request-permission'),
  openCameraPrivacySettings: () => ipcRenderer.invoke('camera:open-privacy-settings'),
});

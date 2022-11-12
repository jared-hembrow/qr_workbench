import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';
import fs from "fs";

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1200,
    height: 800,
    webPreferences: {
    }
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
    // mainWindow.webContents.openDevTools();
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();


const writeDB = async (dbState: string) => {
  await fs.promises.writeFile(
    `${app.getPath("appData")}/code_list_db.json`,
    dbState
  );
};
const readDB = async () => {
  const directory = await fs.promises.readdir(`${app.getPath("appData")}`);
  if (!directory.includes("code_list_db.json")) {
    await writeDB(JSON.stringify({ codes: [] }));
    return JSON.stringify({ codes: [] });
  } else {
    const codes = await fs.promises.readFile(`${app.getPath("appData")}/code_list_db.json`, "utf-8");
    try {
      return codes;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
};

// Main process
ipcMain.handle('write-db', async (event, codeList: string) => {
  try {
    await writeDB(codeList)
    return true
  } catch (e) {
    return false
  }
})
ipcMain.handle('read-db', async () => {
  try {
    return readDB()
  } catch (e) {
    return null
  }
})

app.on('window-all-closed', () => {
  app.quit();
});

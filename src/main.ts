import { createContext } from "@src/shared/context";
import { appRouter } from "@src/shared/routers/_app";
import { BrowserWindow, app, screen } from "electron";
import { createIPCHandler } from "electron-trpc/main";
import { join } from "node:path";

app.setName("Moment");

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    titleBarOverlay: true,
    titleBarStyle: "customButtonsOnHover",
    thickFrame: true,
    width: width - 95,
    height: height - 33,
    transparent: true,
    resizable: false,
    maximizable: false,
    webPreferences: {
      sandbox: false,
      preload: join(__dirname, "../preload/preload.js"),
    },
  });

  mainWindow.setBackgroundMaterial("mica");

  createIPCHandler({
    router: appRouter,
    windows: [mainWindow],
    createContext,
  });

  mainWindow.webContents.on("dom-ready", () => {
    mainWindow.show();
  });

  if (import.meta.env.DEV) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  // mainWindow.webContents.openDevTools({ mode: "detach" });
};

app.whenReady().then(() => {
  createWindow();
});

app.once("window-all-closed", () => app.quit());

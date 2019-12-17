var menubar = require("menubar");
const { globalShortcut, Menu } = require("electron");

var mb = menubar({
  index: "https://emojicp.com/",
  width: 500,
  height: 500
});

mb.on("ready", function ready() {
  let isShown = false;
  mb.on("after-show", () => {
    isShown = true;
  })
    .on("after-hide", () => {
      isShown = false;
    })
    .on("focus-lost", () => {
      isShown = false;
    });

  globalShortcut.register("CommandOrControl+Shift+]", () => {
    isShown ? mb.hideWindow() : mb.showWindow();
  });

  globalShortcut.register("Command+Enter", () => {
    isShown ? mb.hideWindow() : mb.showWindow();
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

const template = [
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "pasteandmatchstyle" },
      { role: "delete" },
      { role: "selectall" }
    ]
  },
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" }
    ]
  },
  {
    role: "window",
    submenu: [{ role: "minimize" }, { role: "close" }]
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click() {
          require("electron").shell.openExternal("https://electronjs.org");
        }
      }
    ]
  }
];

if (process.platform === "darwin") {
  template.unshift({
    label: "yei-menubar",
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideothers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ]
  });

  // Edit menu
  template[1].submenu.push(
    { type: "separator" },
    {
      label: "Speech",
      submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
    }
  );

  // Window menu
  template[3].submenu = [
    { role: "close" },
    { role: "minimize" },
    { role: "zoom" },
    { type: "separator" },
    { role: "front" }
  ];
}

mb.on("after-create-window", function ready() {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "restart app",
      click: () => {
        mb.app.quit();
        mb.app.relaunch();
      }
    },
    { type: "separator" },
    {
      label: "quit",
      click: () => {
        mb.app.quit();
      }
    }
  ]);
  mb.tray.on("right-click", () => {
    mb.tray.popUpContextMenu(contextMenu);
  });
});

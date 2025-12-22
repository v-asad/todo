import { TrayIcon } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";

export async function setupTray() {
  const window = getCurrentWebviewWindow();

  console.log("SETTING UP TRAY");

  const menu = await Menu.new({
    items: [
      {
        id: "toggle",
        text: "Show / Hide Todos",
        action: async () => {
          const visible = await window.isVisible();
          if (visible) {
            await window.hide();
          } else {
            await window.show();
            await window.setFocus();
          }
        },
      },
      {
        id: "quit",
        text: "Quit",
        action: async () => {
          await window.close();
        },
      },
    ],
  });

  console.log("MENU", menu);

  const tray = await TrayIcon.new({
    tooltip: "Todos",
    menu,
    menuOnLeftClick: false,
    action: async (event) => {
      if (event.type === "Click") {
        const visible = await window.isVisible();
        if (visible) {
          await window.hide();
        } else {
          await window.show();
          await window.setFocus();
        }
      }
    },
  });

  return tray;
}

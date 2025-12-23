import { TrayIcon, TrayIconEvent } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";
import { TRAY_CONFIG } from "./config";
import { TodoHub } from "../hubs/todo";

export async function updateMenu(tray: TrayIcon) {
  const todos = await TodoHub.getAll();

  function quitApp(itemId: string) {
    console.log("Clicked", itemId);
  }

  async function toggleTodoItem(itemId: string) {
    TodoHub.complete(itemId).then(() => updateMenu(tray));
  }

  const menu = await Menu.new({
    items: [
      {
        id: "todo_items",
        text: `TODO Items (${todos.length})`,
        items: todos.map((item) => ({
          id: item.id,
          text: `${item.completed ? "✅ - " : ""}${item.title}`,
          action: toggleTodoItem,
        })),
      },
      {
        id: "refresh",
        text: `Refresh List`,
        action: () => updateMenu(tray),
      },
      {
        id: "quit",
        text: "Quit",
        action: quitApp,
      },
    ],
  });

  tray.setMenu(menu);
}

export async function setupTray() {
  const tray = await TrayIcon.new({
    icon: TRAY_CONFIG.ICON,
    iconAsTemplate: TRAY_CONFIG.ICON_AS_TEMPLATE,
    menuOnLeftClick: TRAY_CONFIG.MENU_ON_LEFT_CLICK,
    action: handleTrayEvents,
  });

  function handleTrayEvents(event: TrayIconEvent) {
    switch (event.type) {
      case "Click":
        console.log(`mouse ${event.button} button pressed`);
        break;
      case "DoubleClick":
        console.log(`mouse ${event.button} button pressed`);
        break;
      case "Enter":
        console.log(
          `mouse hovered tray at ${event.rect.position.x}, ${event.rect.position.y}`
        );
        break;
      case "Move":
        console.log(
          `mouse moved on tray at ${event.rect.position.x}, ${event.rect.position.y}`
        );
        break;
      case "Leave":
        console.log(
          `mouse left tray at ${event.rect.position.x}, ${event.rect.position.y}`
        );
        break;
    }
  }

  updateMenu(tray);
}

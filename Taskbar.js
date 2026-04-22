import { g_global } from "./main.js";
import { Window } from "./Window.js";

export class Taskbar {
    taskbar;
    taskbarItems = [];

    constructor() {
        this.createTaskbar();
    }

    createTaskbar() {
        this.taskbar = document.createElement("div");
        this.taskbar.className = "taskbar-container";

        const items = [];
        for (let i = 0; i < 3; ++i) {
            items[i] = document.createElement('div');
            items[i].className = 'taskbar-item';

            let icon;
            switch (i) {
                case 0:
                    icon = "system";
                    break;
                case 1:
                    icon = "notepad";
                    break;
                case 2:
                    icon = "notepad";
                    break;
            }

            items[i].style.backgroundImage = "url('assets/" + icon + ".png')";
            this.taskbar.appendChild(items[i]);
        }

        document.body.appendChild(this.taskbar);
    }

    createTaskbarItem(name, url) {
        const i = this.taskbarItems.length;
        this.taskbarItems[i] = document.createElement('div');
        this.taskbarItems[i].className = 'taskbar-item';
        this.taskbarItems[i].style.backgroundImage = "url('assets/" + name + ".png')";
        this.taskbarItems[i].addEventListener("click", () => {
            g_global.windows.push(new Window("https://www.wikipedia.org/"));
        });
        
        this.taskbar.appendChild(this.taskbarItems[i]);
        document.body.appendChild(this.taskbar);
    }

    removeTaskbarItem(name) {
    }
}

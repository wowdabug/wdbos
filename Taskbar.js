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
        document.body.appendChild(this.taskbar);
    }

    createTaskbarItem(name, url) {
        const i = this.taskbarItems.length;
        this.taskbarItems[i] = document.createElement('div');
        this.taskbarItems[i].className = 'taskbar-item';
        // this.taskbarItems[i].style.backgroundImage = "url('assets/" + name + ".png')";
        this.taskbarItems[i].style.backgroundImage = "url('" + url + "favicon.ico')";
        this.taskbarItems[i].addEventListener("click", () => {
            g_global.windows.push(new Window(url));
        });
        
        this.taskbar.appendChild(this.taskbarItems[i]);
        document.body.appendChild(this.taskbar);
    }

    removeTaskbarItem(name) {
    }
}

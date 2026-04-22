import { g_global } from "./main.js";

export class Application {
    name;
    url;

    constructor(name, url) {
        this.name = name;
        this.url = url;
        this.install();
    }

    install() {
        g_global.taskbar.createTaskbarItem(this.name, this.url);
    }

    uninstall() {

    }
}

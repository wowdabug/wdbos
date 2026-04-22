import { Application } from "./Application.js";
import { Taskbar } from "./Taskbar.js";
import { Window } from "./Window.js";

export const g_global = {
    applications: [],
    taskbar: new Taskbar(),
    windows: [],
    zIndex: 0,
    mouseDown: false
}

document.addEventListener("mousedown", () => {
    g_global.mouseDown = true;
});

document.addEventListener("mouseup", () => {
    g_global.g_mouseDown = false;
});

new Application("Wikipedia", "https://www.wikipedia.org/");
new Application("WDB Games", "https://semgabdw.github.io/");

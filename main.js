import { Taskbar } from "/Taskbar.js";
import { Window } from "/Window.js";

export const g_global = {
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

const g_windows = [];

const g_taskbar = new Taskbar();

g_windows[0] = new Window("https://example.com/");
g_windows[0].positionX = 50;
g_windows[0].update();

g_windows[1] = new Window("https://www.wikipedia.org/");
g_windows[1].positionX = 128;
g_windows[1].positionY = 128;
g_windows[1].update();

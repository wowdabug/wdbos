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

g_global.windows[0] = new Window("https://example.com/");
g_global.windows[0].positionX = 50;
g_global.windows[0].update();

g_global.windows[1] = new Window("https://www.wikipedia.org/");
g_global.windows[1].positionX = 128;
g_global.windows[1].positionY = 128;
g_global.windows[1].update();

new Application("wikipedia", "https://www.wikipedia.org/");

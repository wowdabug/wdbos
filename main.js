class Window {
    url;
    windowContainer;
    zIndex = 0;
    positionX = 0;
    positionY = 0;
    sizeX = 512;
    sizeY = 512;
    prevPositionX = 0;
    prevPositionY = 0;
    prevSizeX = 512;
    prevSizeY = 512;
    maximized = false;
    minimized = false;
    mouseDown = false;

    constructor(url) {
        this.url = url;
        this.createWindow();
    }

    createWindow() {
        this.windowContainer = document.createElement('div');
        this.windowContainer.className = 'window-container';

        this.windowContainer.addEventListener("mousedown", () => {
            this.mouseDown = true;
            this.zIndex = ++g_zIndex;
            g_taskbar.taskbar.style.zIndex = this.zIndex + 1;
            if (this.maximized) {
                this.unmaximize();
            }

            this.update();
        });

        this.windowContainer.addEventListener("mouseup", () => {
            this.mouseDown = false;
        });

        this.windowContainer.addEventListener("mousemove", (event) => {
            if (this.mouseDown) {
                this.positionX += event.movementX;
                this.positionY += event.movementY;
                this.update();
            }
        });
        
        this.update();

        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'window-controls-container';

        const controls = [];
        for (let i = 0; i < 3; ++i) {
            controls[i] = document.createElement('div');
            controls[i].className = 'window-controls-item';

            let icon;
            switch (i) {
                case 0:
                    icon = "minimize";
                    break;
                case 1:
                    icon = "maximize";
                    break;
                case 2:
                    icon = "close";
                    break;
            }

            controls[i].style.backgroundImage = "url('assets/" + icon + ".png')";
            controlsContainer.appendChild(controls[i]);
        }

        controls[0].addEventListener("click", () => {
            this.minimize();
        });

        controls[1].addEventListener("click", () => {
            this.maximize();
        });

        controls[2].addEventListener("click", () => {
            this.close();
        });

        const windowFrame = document.createElement('div');
        windowFrame.className = 'window-frame';

        const iframe = document.createElement('iframe');
        iframe.src = this.url;
        
        windowFrame.appendChild(iframe);
        this.windowContainer.appendChild(controlsContainer);
        this.windowContainer.appendChild(windowFrame);
        document.body.appendChild(this.windowContainer);
    }

    minimize() {
        this.minimized = true;
        this.windowContainer.hidden = true;
    }

    unminimize() {
        this.minimized = false;
        this.windowContainer.hidden = false;
    }

    maximize() {
        this.maximized = true;
        this.prevPositionX = this.positionX;
        this.prevPositionY = this.positionY;
        this.prevSizeX = this.sizeX;
        this.prevSizeY = this.sizeY;
        this.positionX = 0;
        this.positionY = 0;
        this.sizeX = window.innerWidth;
        this.sizeY = window.innerHeight;
        this.update();
    }

    unmaximize() {
        this.maximized = false;
        this.positionX = this.prevPositionX;
        this.positionY = this.prevPositionY;
        this.sizeX = this.prevSizeX;
        this.sizeY = this.prevSizeY;
    }

    close() {
        this.windowContainer.remove();
    }

    update() {
        this.windowContainer.style.zIndex = this.zIndex;
        this.windowContainer.style.left = this.positionX + "px";
        this.windowContainer.style.top = this.positionY + "px";
        this.windowContainer.style.width = this.sizeX + "px";
        this.windowContainer.style.height = this.sizeY + "px";
    }
}

class Taskbar {
    taskbar;

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
}

document.addEventListener("mousedown", () => {
    g_mouseDown = true;
});

document.addEventListener("mouseup", () => {
    g_mouseDown = false;
});

let g_zIndex = 0;
let g_mouseDown = false;
const g_windows = [];

const g_taskbar = new Taskbar();

g_windows[0] = new Window("https://example.com/");
g_windows[0].positionX = 50;
g_windows[0].update();

g_windows[1] = new Window("https://www.wikipedia.org/");
g_windows[1].positionX = 128;
g_windows[1].positionY = 128;
g_windows[1].update();

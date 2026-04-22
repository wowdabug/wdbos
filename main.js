class Window {
    url;
    windowContainer;
    zIndex = 0;
    positionX = 0;
    positionY = 0
    sizeX = 512;
    sizeY = 512
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
    constructor() {
        this.createTaskbar();
    }

    createTaskbar() {
        const taskbar = document.createElement("div");
        taskbar.className = "taskbar-container";

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
            taskbar.appendChild(items[i]);
        }

        document.body.appendChild(taskbar);
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

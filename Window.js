import { g_global } from "./main.js";

export class Window {
    url;
    windowContainer;
    zIndex = 0;
    positionX = 0;
    positionY = 0;
    sizeX = 512;
    sizeY = 512;
    prevSizeX = 512;
    prevSizeY = 512;
    maximized = false;
    minimized = false;
    mouseDown = false;
    clientX = 0;
    clientY = 0;

    constructor(url) {
        this.url = url;
        this.createWindow();
    }

    createWindow() {
        this.windowContainer = document.createElement('div');
        this.windowContainer.className = 'window-container';

        this.windowContainer.addEventListener("mousedown", () => {
            this.mouseDown = true;
            this.zIndex = ++g_global.zIndex;
            g_global.taskbar.taskbar.style.zIndex = this.zIndex + 1;
            if (this.maximized) {
                this.unmaximize();
            }

            this.update();
        });

        this.windowContainer.addEventListener("mouseup", () => {
            this.mouseDown = false;
        });

        this.windowContainer.addEventListener("mousemove", (event) => {
            this.clientX = event.clientX;
            this.clientY = event.clientY;
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
        const assetUrls = ["assets/minimize.png", "assets/maximize.png", "assets/close.png"]
        for (let i = 0; i < 3; ++i) {
            controls[i] = document.createElement('div');
            controls[i].className = 'window-controls-item';
            controls[i].style.backgroundImage = `url("${assetUrls[i]}")`;
            controlsContainer.appendChild(controls[i]);
            controls[i].addEventListener("click", () => {
                switch (i) {
                    case 0:
                        this.minimize();
                        break;
                    case 1:
                        this.maximize();
                        break;
                    case 2:
                        this.close();
                        break;
                }
            });
        }

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
        this.positionX = this.clientX - this.clientX / window.innerWidth * this.prevSizeX;
        this.positionY = 0;
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

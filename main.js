class Window {
    windowContainer;
    positionX;
    positionY;
    sizeX;
    sizeY;
    url;

    constructor(url) {
        this.url = url;
        this.positionX = 0;
        this.positionY = 0;
        this.sizeX = 512;
        this.sizeY = 512;
        this.createWindow();
    }

    createWindow() {
        this.windowContainer = document.createElement('div');
        this.windowContainer.className = 'window-container';
        
        this.update();

        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'window-controls-container';

        for (let i = 0; i < 3; ++i) {
            const control = document.createElement('div');
            control.className = 'window-controls-item';

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

            control.style.backgroundImage = "url('assets/" + icon + ".png')";
            controlsContainer.appendChild(control);
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

    update() {
        this.windowContainer.style.left = this.positionX + "px";
        this.windowContainer.style.top = this.positionY + "px";
        this.windowContainer.style.width = this.sizeX + "px";
        this.windowContainer.style.height = this.sizeY + "px";
    }
}


const windows = [];

windows[0] = new Window("https://example.com/");
windows[0].positionX = 50;
windows[0].update();

windows[1] = new Window("https://example.com/");
windows[1].positionX = 128;
windows[1].positionY = 128;
windows[1].update();

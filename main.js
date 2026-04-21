function createWindow(url) {
    const windowContainer = document.createElement('div');
    windowContainer.className = 'window-container';

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
    iframe.src = url;
    
    windowFrame.appendChild(iframe);
    windowContainer.appendChild(controlsContainer);
    windowContainer.appendChild(windowFrame);

    document.body.appendChild(windowContainer);
    
    return windowContainer;
}

// Usage:
createWindow("https://example.com/");

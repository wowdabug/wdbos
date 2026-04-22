export class Taskbar {
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

'use strict';

import AbstractComponent from './Abstract';

import '../css/Home.css';

export default class HomeComponent extends AbstractComponent {
    mount() {
        this.mountPosId = 'main-container';
        this.interval = null;
        this.titleText = 'Home'
        super.mount();
        this.writeInterval(this.interval);
    }
    writeInterval(interval) {
        this.title = document.getElementById('main-title');
        let i = 0;
        interval = setInterval(() => {
            i++;
            if (i >= this.titleText.length) {
                clearInterval(interval);
                this.borderInterval();
            }
            this.title.innerText = this.titleText.substr(0, i);
        }, 150);
    }
    borderInterval() {
        let i = 0;
        setInterval(() => {
            i++;
            if (i % 2) {
                this.title.style.borderRight = '0';
            } else {
                this.title.style.borderRight = '1px solid';
            }
        }, 450);
    }
    getHTML() {
        return `
            <div id="container">
                <h1 id="main-title"></h1>
            </div>
        `;
    }
}

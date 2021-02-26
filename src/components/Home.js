'use strict';

import AbstractComponent from './Abstract';

export default class HomeComponent extends AbstractComponent {
    mount() {
        this.mountPosId = 'main-container';
        super.mount();
    }
    getHTML() {
        return `
            <h1>Home</h1>
        `;
    }
}

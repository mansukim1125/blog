'use strict';

import AbstractComponent from './Abstract';

export default class HomeComponent extends AbstractComponent {
    mount() {
        this.mountPosId = 'main-container';
        super.mount();
    }
    getHTML() {
        return `
            <h1 id="main-title">
                일상의 문제를 해결하는 서비스를 만듭니다
            </h1>
        `;
    }
}

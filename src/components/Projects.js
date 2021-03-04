'use strict';

import AbstractComponent from './Abstract';

export default class ProjectsComponent extends AbstractComponent {
    mount() {
        this.mountPosId = 'main-container';
        super.mount();
    }
    getHTML() {
        return `
            <h1>프로젝트</h1>
        `;
    }
}

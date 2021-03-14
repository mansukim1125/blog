'use strict';

export default class AbstractComponent {
    constructor(param, parentComp, mountPosId) {
        this.param = param;
        this.parent = parentComp;
        this.mountPosId = mountPosId;
        this.mount();
    }
    mount() {
        document.getElementById(this.mountPosId).innerHTML = this.getHTML();
    }
    unmount() {
        document.getElementById(this.mountPosId).innerHTML = '';
    }
    getHTML() {
        return `<your HTML code here>`;
    }
}

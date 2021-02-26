'use strict';

import AbstractComponent from './Abstract';

import '../css/NavBar.css';

export default class NavBarComponent extends AbstractComponent {
    mount() {
        this.mountPosId = 'app';
        super.mount();
    }
    getHTML() {
        return `
            <nav id="navbar">
                <ul id="nav-menu">
                    <li class="title">
                        <span>mansu</span>
                    </li>
                    <li class="menu">
                        <a href="/blog/posts" data-link>개발 블로그</a>
                    </li>
                    <li class="menu">
                        <a href="/projects" data-link>프로젝트</a>
                    </li>
                    <li class="menu">
                        <a href="https://github.com/mansukim1125" target="_blank">Github</a>
                    </li>
                </ul>
            </nav>
            <div id="main-container"></div>
        `;
    }
}

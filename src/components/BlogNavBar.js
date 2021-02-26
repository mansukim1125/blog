'use strict';

import NavBarComponent from './NavBar';

import '../css/BlogNavBar.css';

export default class BlogNavBarComponent extends NavBarComponent {
    getHTML() {
        return `
            <nav id="navbar">
                <ul id="nav-menu">
                    <li class="title">
                        <span>mansu</span>
                    </li>
                    <li class="menu">
                        <span>개발 블로그</span>
                    </li>
                </ul>
            </nav>
            <header id="posts-header">
                <h1>글도 쓰는 개발자</h1>
            </header>
            <div id="main-container"></div>
        `;
    }
}

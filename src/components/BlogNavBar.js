'use strict';

import NavBarComponent from './NavBar';

import '../css/BlogNavBar.css';

export default class BlogNavBarComponent extends NavBarComponent {
    getHTML() {
        return `
            <nav id="navbar">
                <ul id="nav-menu">
                    <li class="title">
                        <span>
                            <a href="/" data-link style="color: black;">mansu</a>
                        </span>
                    </li>
                    <li class="menu">
                        <span>개발 블로그</span>
                    </li>
                </ul>
            </nav>
            <header id="posts-header">
                <div>
                    <h1>개발 블로그</h1>
                </div>
            </header>
            <div id="main-container"></div>
        `;
    }
}

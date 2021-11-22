'use strict';

import AbstractComponent from './Abstract';

import Posts from '../api/Posts';

import '../css/PostsHeader.css';
import '../css/Posts.css';

export default class PostsComponent extends AbstractComponent {
    async mount() {
        this.mountPosId = 'main-container';
        this.addLoadingText();
        document.title = "개발 블로그 - 로드중입니다";
        await this.getPosts();
        document.title = "개발 블로그";
        super.mount();
    }
    async getPosts() {
        const posts = await Posts.get();
        this.posts = posts;
    }
    processPostsToHTML() {
        this.postsHTML = '';
        this.posts.forEach((post) => {
            this.postsHTML += 
                `<li>
                    <div class="post-info">
                        <a href="/blog/posts/${encodeURIComponent(post.name)}" data-link>${post.name}</a>
                        <p>${post.config.description}</p>
                    </div>
                </li>`;
        });
        return this.postsHTML;
    }
    addLoadingText() {
        const h1 = document.createElement("h1");
        h1.innerText = "로드중입니다";
        h1.style.paddingLeft = "20px"
        document.getElementById("main-container").appendChild(h1);
    }
    getHTML() {
        return `
            <div id="posts">
                <ul id="post-list">
                    ${this.processPostsToHTML()}
                </ul>
            </div>
        `;
    }
}

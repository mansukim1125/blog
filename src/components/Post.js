'use strict';

import AbstractComponent from './Abstract';

import Posts from '../api/Posts';
import Renderer from '../api/Renderer';

import 'github-markdown-css';
import '../css/MarkdownBody.css';

export default class PostComponent extends AbstractComponent {
    async mount() {
        this.mountPosId = 'main-container';
        await this.getPost();
        super.mount();
    }
    async getPost() {
        const post = await Posts.get(this.param.postId);
        this.post = post;
        this.changeHeader(this.post.name.replace(/\.md$/, ''));
        this.post.content = this.post.content.replace(/---\n(.+\n)+---/, '');
        this.compiled = await Renderer.md2html(this.post.content);
    }
    changeHeader(str) {
        const header = document.querySelector('#posts-header > div');
        const description = document.createElement('p');
        header.querySelector('h1').innerText = str;
        description.innerText = this.post.config.description
        header.appendChild(description);
    }
    getHTML() {
        return `
            <div class="markdown-body">
                <p>${this.compiled}</p>
            </div>
        `;
    }
}

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
        this.changeHeaderTitle(this.post.name.replace(/\.md$/, ''));
        this.post.content = this.post.content.replace(/---\n(.+\n)+---/, '');
        this.compiled = await Renderer.md2html(this.post.content);
    }
    changeHeaderTitle(str) {
        document.querySelector('#posts-header > h1').innerText = str;
    }
    getHTML() {
        return `
            <div class="markdown-body">
                <p>${this.compiled}</p>
            </div>
        `;
    }
}

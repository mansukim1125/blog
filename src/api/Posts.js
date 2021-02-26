'use strict';

import axios from 'axios';
import Buffer from '../lib/buffer/buffer';

export default class Posts {
    static async get(postTitle) {
        if (postTitle) {
            try {
                const { data } = await axios.get(`https://api.github.com/repos/mansukim1125/test-blog/contents/posts/${postTitle}.md`);
                
                data.content = Buffer.decode(data.content);
                const configs = {};
                let pairs = data.content.match(/---\n([(\w+): (.\W?+)\n]+)\n---/)
                pairs = pairs[1].split('\n');
                pairs.forEach(pair => {
                    const matchResult = pair.match(/(\w+): (.+)/);
                    configs[matchResult[1]] = matchResult[2];
                });
                data.config = configs;

                return Promise.resolve(data);
            } catch (error) {
                if (error.response) {
                    return Promise.reject(error.response);
                }
                return Promise.reject(error);
            }
        } else {
            try {
                const { data } = await axios.get(`https://api.github.com/repos/mansukim1125/test-blog/contents/posts`);

                let queue = [];
                data.forEach(item => {
                    item.name = item.name.replace(/\.md$/, '');
                    queue.push(Posts.get(item.name));
                });
                
                const posts = await Promise.all(queue);
                posts.forEach((post, index) => {
                    data[index].config = post.config;
                });
                
                return Promise.resolve(data);
            } catch (error) {
                if (error.response) {
                    return Promise.reject(error.response);
                }
                return Promise.reject(error);
            }
        }
    }
}

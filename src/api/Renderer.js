'use strict';

import axios from 'axios';

export default class Renderer {
    static async md2html(md) {
        try {
            let { data } = await axios.post(`https://mansu.ga/.netlify/functions/markdown-renderer`, {
                text: md
            });

            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error.response);
        }
    }
}

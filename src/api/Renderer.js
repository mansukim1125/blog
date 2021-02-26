'use strict';

import axios from 'axios';

export default class Renderer {
    static async md2html(md) {
        try {
            const { data } = await axios.post(`https://0k1f6avd9j.execute-api.ap-northeast-2.amazonaws.com/`, {
                text: md
            });
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error.response);
        }
    }
}

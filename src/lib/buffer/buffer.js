'use strict';

import buffer from 'buffer/';

const _Buffer = buffer.Buffer;

export default class Buffer {
    static decode(base64text){
        return _Buffer.from(base64text, 'base64').toString('utf8');
    }
}

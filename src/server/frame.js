const log4js = require('log4js');
const stream = require('stream');

const logger = log4js.getLogger('app:server:frame');

class Deframer extends stream.Transform {
    constructor() {
        super({});
        this.state = Buffer.alloc(0);
    }

    _transform(chunk, encoding, callback) {
        console.log(chunk);

        // 合并数据
        this.state = Buffer.concat([this.state, chunk]);
        // 凑包头
        if (this.state.length < 4)
            return;
        // 凑包体
        const len = this.state.readInt32LE(0) + 4;
        if (this.state.length < len)
            return;
        // 分包
        const frame = this.state.slice(0, len);
        this.state = this.state.slice(len);
        return callback(null, frame);
    }
}

module.exports = Deframer;

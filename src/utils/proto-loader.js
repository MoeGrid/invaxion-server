const path = require('path');
const protobuf = require('protobufjs');

class ProtoLoader {

    /**
     * @type {protobuf.Root}
     */
    root = null;

    // 加载proto文件
    async load() {
        this.root = await protobuf.load([
            path.join(__dirname, '../proto/cometLogin.proto'),
            path.join(__dirname, '../proto/cometGate.proto'),
            path.join(__dirname, '../proto/cometScene.proto'),
        ]);
    }
}

module.exports = new ProtoLoader();

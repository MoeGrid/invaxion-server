const stream = require('stream');
const util = require('util');
const Decoder = require('./decoder');
const Encoder = require('./encoder');
const Deframer = require('./frame');

const pipeline = util.promisify(stream.pipeline);

function doNothing() {

}

function setup(socket) {
    const input = new Decoder();
    const frame = new Deframer();
    const output = new Encoder();
    pipeline(
        socket,
        frame,
        input
    ).catch(doNothing);
    pipeline(
        output,
        socket
    ).catch(doNothing);
    return {input, output};
}

exports.setup = setup;

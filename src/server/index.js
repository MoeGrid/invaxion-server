const log4js = require('log4js');
const pipeline = require('./pipeline');
const logger = log4js.getLogger('app:server:index');

function server(handler) {
    return async function (socket) {
        logger.debug('Connection opened');
        const {input, output} = pipeline.setup(socket);
        for await (const req of input) {
            try {
                const now = new Date();
                await handler.dispatch(req, output, now);
            } catch (e) {
                logger.error('Connection error: %s', e.stack);
                break;
            }
        }
        logger.debug('Connection closed');
        socket.end();
    };
}

module.exports = server;

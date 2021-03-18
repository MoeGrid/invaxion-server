const log4js = require('log4js');
const logger = log4js.getLogger('app:login:handler');

const handlers = new Map();

handlers.set(5, (req, res) => {
    logger.debug('Req_FindPassword');

    res.write({
        mainCmd: 2,
        paraCmd: 6,
        data: {
            data: {
                gateIP: '127.0.0.1',
                gatePort: 20021,
                token: '5dec0ad9c11af4860d551dfd44aef446',
                accId: 25882
            }
        }
    });
});
handlers.set(15, (req, res) => {
    logger.debug('ThirdLogin');

    res.write({
        mainCmd: 2,
        paraCmd: 16,
        data: {
            data: {
                gateIP: '127.0.0.1',
                gatePort: 20021,
                token: '5dec0ad9c11af4860d551dfd44aef446',
                accId: 25882
            }
        }
    });
});
handlers.set(21, (req, res) => {
    logger.debug('GameVersion');

    res.write({
        mainCmd: 2,
        paraCmd: 22,
        data: {
            announcementContent: '',
            version: '0.1.0',
            serverState: 2,
            announcementTitle: ''
        }
    });
});

async function dispatch(req, res) {
    const handler = handlers.get(req.paraCmd);
    if (!handler)
        throw new Error(`Handler not implemented! paraCmd ${req.paraCmd}`)
    return handler(req, res);
}

exports.dispatch = dispatch;

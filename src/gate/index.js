const log4js = require('log4js');
const Ntf_CharacterFullData = require('./tmp-data/Ntf_CharacterFullData.js');
const Ret_ShopInfo = require('./tmp-data/Ret_ShopInfo.js');
const Ret_Event_Info = require('./tmp-data/Ret_Event_Info.js');

const logger = log4js.getLogger('app:gate:handler');

const handlers = new Map();

handlers.set(3, (req, res) => {
    logger.info('上报游戏时间');
});

handlers.set(5, (req, res) => {
    logger.info('登陆入口检测');
    res.write({
        mainCmd: 1,
        paraCmd: 1,
        data: {
            gametime: parseInt((new Date().getTime() / 1000).toString())
        }
    });
    res.write({
        mainCmd: 3,
        paraCmd: 6,
        data: {
            userList: [{
                charId: 4294973182,
                accStates: 0
            }]
        }
    });
});

handlers.set(8, (req, res) => {
    logger.info('进入游戏');
    res.write({
        mainCmd: 5,
        paraCmd: 1,
        data: Ntf_CharacterFullData
    });
});

handlers.set(36, (req, res) => {
    logger.info('店铺信息');
    res.write({
        mainCmd: 5,
        paraCmd: 37,
        data: Ret_ShopInfo
    });
});

handlers.set(100, (req, res) => {
    logger.info('店铺信息');
    res.write({
        mainCmd: 5,
        paraCmd: 101,
        data: Ret_Event_Info
    });
});

async function dispatch(req, res, now) {
    const handler = handlers.get(req.paraCmd);
    if (!handler)
        logger.error('Handler not implemented! paraCmd %d', req.paraCmd);
    handler(req, res, now);
}

exports.dispatch = dispatch;

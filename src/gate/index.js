const log4js = require('log4js');
const {mainCmd, paraCmd} = require('../utils/cmd');
const Ntf_CharacterFullData = require('./tmp-data/Ntf_CharacterFullData.js');
const Ret_ShopInfo = require('./tmp-data/Ret_ShopInfo.js');
const Ret_Event_Info = require('./tmp-data/Ret_Event_Info.js');

const logger = log4js.getLogger('app:gate:handler');

const handlers = new Map();

handlers.set(paraCmd.cometGate.Ret_UserGameTime, (req, res) => {
    logger.info('上报游戏时间');
});

handlers.set(paraCmd.cometGate.LoginGateVerify, (req, res) => {
    logger.info('登陆入口检测');
    res.write({
        mainCmd: mainCmd.Time,
        paraCmd: paraCmd.cometGate.Ntf_GameTime,
        data: {
            gametime: parseInt((new Date().getTime() / 1000).toString())
        }
    });
    res.write({
        mainCmd: mainCmd.Select,
        paraCmd: paraCmd.cometGate.SelectUserInfoList,
        data: {
            userList: [
                // {
                //     charId: 4294973182,
                //     accStates: 0
                // }
            ]
        }
    });
});

handlers.set(paraCmd.cometGate.EnterGame, (req, res) => {
    logger.info('进入游戏');
    res.write({
        mainCmd: mainCmd.Game,
        paraCmd: paraCmd.cometGate.Ntf_GameTime,
        data: Ntf_CharacterFullData
    });
});

handlers.set(paraCmd.cometScene.Req_ShopInfo, (req, res) => {
    logger.info('店铺信息');
    res.write({
        mainCmd: mainCmd.Game,
        paraCmd: paraCmd.cometScene.Ret_ShopInfo,
        data: Ret_ShopInfo
    });
});

handlers.set(100, (req, res) => {
    logger.info('店铺信息');
    res.write({
        mainCmd: mainCmd.Game,
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

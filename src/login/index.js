const log4js = require('log4js');
const logger = log4js.getLogger('app:login:handler');
const sqlite3 = require("sqlite3").verbose();
const crypto = require('crypto');

const handlers = new Map();
const dbname = "db.db"

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
    let db = new sqlite3.Database(dbname, function (err) {
        if (err) throw err;
    });
    let openId = req.data["openId"];
    let token = crypto.createHash('md5').update(openId + "6031").digest("hex");
    let accId = 0;
    let fun = async () => {
        return new Promise(resolve => {
            db.get("select accId from acc_data where steamId = $openId", {$openId: openId}, function (err, accid) {
                if (err) throw err;
                if (accid === undefined) {
                    db.serialize(function () {
                        db.run("insert into acc_data(steamId, token) values($steamId, $token)", {
                            $steamId: openId,
                            $token: token
                        }, function (err) {
                            if (err) throw err;
                        });
                        db.get("select accId from acc_data where steamId = $openId", {$openId: openId}, function (err, accid) {
                            if (err) throw err;
                            resolve(accid["accId"]);
                        });
                    });
                } else resolve(accid["accId"]);
            });
        });
    }
    (async () => {
        accId = await fun();
        db.close();
        res.write({
            mainCmd: 2,
            paraCmd: 16,
            data: {
                data: {
                    gateIP: '127.0.0.1',
                    gatePort: 20021,
                    token: token,
                    accId: accId
                }
            }
        });
    })()
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
    const handler = await handlers.get(req.paraCmd);
    if (!handler)
        throw new Error(`Handler not implemented! paraCmd ${req.paraCmd}`)
    return handler(req, res);
}

exports.dispatch = dispatch;

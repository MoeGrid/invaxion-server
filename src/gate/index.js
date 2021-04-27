const log4js = require('log4js');
const Ntf_CharacterFullData = require('./tmp-data/Ntf_CharacterFullData.js');
const Ret_ShopInfo = require('./tmp-data/Ret_ShopInfo.js');
const Ret_Event_Info = require('./tmp-data/Ret_Event_Info.js');
const sqlite3 = require("sqlite3").verbose();

const logger = log4js.getLogger('app:gate:handler');

const handlers = new Map();
const dbname = "db.db"
const rankListLength = 100;

function pad(num, n = 9) {
    let len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

handlers.set(1003, (req, res) => {  //gate
    logger.info('上报游戏时间');
});

handlers.set(1005, (req, res, now, sessionid) => {  //gate
    logger.info('登陆入口检测');
    let accId = req.data["accId"];
    let token = req.data["token"];
    let db = new sqlite3.Database(dbname, function (err) {
        if (err) throw err;
    });
    db.run("UPDATE acc_data SET sessionid = $sessionid WHERE accId = $accId;", {
        $sessionid: sessionid,
        $accId: accId
    }, function (err) {
        if (err) throw err;
    });
    res.write({
        mainCmd: 1,
        paraCmd: 1,
        data: {
            gametime: parseInt((new Date().getTime() / 1000).toString())
        }
    });
    db.get("select * from acc_data where accId = $accId;", {$accId: accId}, function (err, data) {
        if (err) throw err;
        if (data !== undefined && data["token"] === token) {
            let userlist = [{charId: data["charId"], accStates: 0}];
            if (data["charId"] === "0000000000") userlist = [];
            res.write({
                mainCmd: 3,
                paraCmd: 6,
                data: {
                    userList: userlist
                }
            });
            db.close();
        }
    });

});

handlers.set(1007, async (req, res, now, sessionid) => {  //gate
    logger.info('新建角色的进入游戏');
    let db = new sqlite3.Database(dbname, function (err) {
        if (err) throw err;
    });
    db.run("UPDATE acc_data SET name = $name, selectCharId = $selectCharId, language = $language, headId = $headId, country = $country WHERE sessionid = $sessionid;",
        {
            $name: req.data["name"],
            $selectCharId: req.data["selectCharId"],
            $language: req.data["language"],
            $country: req.data["country"],
            $sessionid: sessionid,
            $headId: req.data["selectCharId"]
        }, function (err) {
            if (err) throw err;
            db.get("select * from acc_data where sessionid = $sessionid;", {$sessionid: sessionid}, async function (err, data) {
                if (err) throw err;
                let charId = Math.round(data["accId"] + 4000000000).toString()
                res.write({
                    mainCmd: 5,
                    paraCmd: 1,
                    data: await Ntf_CharacterFullData(data["accId"], charId, data["name"], data["headId"], data["selectCharId"], data["selectThemeId"])
                });
                db.run("UPDATE acc_data SET charId = $charId WHERE sessionid = $sessionid;", {
                    $charId: charId,
                    $sessionid: sessionid
                }, function (err) {
                    if (err) throw err;
                });
                db.get("select charId from char_data where charId = $charId;", {$charId : charId}, function (err,data) {
                    if (err) throw err;
                    if(data !== undefined)return;
                    db.run("INSERT INTO char_data(charId) VALUES($charId)", {$charId : charId}, function (err) {
                        if (err) throw err;
                    });
                });
            });
        });

});

handlers.set(1008, async (req, res, now, sessionid) => { //gate
    logger.info('进入游戏');
    let db = new sqlite3.Database(dbname, function (err) {
        if (err) throw err;
    });
    db.get("select * from acc_data where sessionid = $sessionid;", {$sessionid: sessionid}, async function (err, data) {
        if (err) throw err;
        res.write({
            mainCmd: 5,
            paraCmd: 1,
            data: await Ntf_CharacterFullData(data["accId"], data["charId"], data["name"], data["headId"], data["selectCharId"], data["selectThemeId"])
        });
    });
});

handlers.set(2, (req, res) => {
    logger.info('开始打歌');
});

handlers.set(4, (req, res, now, sessionid) => {
    logger.info('完成打歌');
    let db = new sqlite3.Database(dbname, function (err) {
        if (err) throw err;
    });
    let songInfo = req.data["data"];
    let totalScore = songInfo["totalScore"], total4KScore = songInfo["total4KScore"], total6KScore = songInfo["total6KScore"], total8KScore = songInfo["total8KScore"];
    db.run("UPDATE acc_data SET totalScore = $totalScore, total4KScore = $total4KScore, total6KScore = $total6KScore, total8KScore = $total8KScore WHERE sessionid = $sessionid;", {
        $totalScore: totalScore,
        $total4KScore: total4KScore,
        $total6KScore: total6KScore,
        $total8KScore: total8KScore,
        $sessionid: sessionid
    }, function (err) {
        if (err) throw err;
    });
    let songId = songInfo["songId"];
    let difficulty = songInfo["difficulty"];
    let mode = songInfo["mode"];
    songInfo = songInfo["playData"];
    songInfo = {
        songId : songId,
        finishLevel : songInfo["finishLevel"],
        score : songInfo["score"],
        isFullCombo : songInfo["isFullCombo"],
        miss : songInfo["miss"],
        isAllMax : songInfo["isAllMax"],
        time : Date.now()
    };

    db.get("select * from acc_data where sessionid = $sessionid;", {$sessionid: sessionid}, function (err, data) {
        if (err) throw err;
        let charId = data["charId"];
        db.run("alter table char_data add COLUMN s" + songId + " VARCHAR(1024);", function (err) {
            if (err);//忽略重复添加的错误
            db.get("select s" + songId + " from char_data where charId = '" + charId + "';", function (err, data) {
                if (err) throw err;
                let songInfoAll = {};
                let songInfoOld;
                let newRank = 0;
                let playCount = 0;
                if (data["s" + songId] === null) {songInfoOld = songInfo;newRank = 1;}
                else songInfoAll = JSON.parse(data["s" + songId]);
                if (songInfoAll.hasOwnProperty(mode)!==true)songInfoAll[mode] = {};
                if (songInfoAll[mode].hasOwnProperty(difficulty)===true){songInfoOld = songInfoAll[mode][difficulty];playCount = songInfoOld["playCount"];}
                else {songInfoOld = songInfo;newRank = 1;}
                if (songInfo["score"]>songInfoOld["score"])newRank = 1;
                else if (songInfo["score"]<songInfoOld["score"])songInfo = songInfoOld;
                songInfo["playCount"] = playCount + 1;
                let songInfo_send = JSON.parse(JSON.stringify(songInfo));  //deep copy
                delete songInfo_send.time;
                res.write({
                    mainCmd: 5,
                    paraCmd: 5,
                    data: {
                        songInfo : songInfo,
                        settleData: {
                            changeList: [
                                {
                                    type: 9,
                                    count: 450,
                                    id: 0
                                }
                            ],
                            expData: {
                                level: 30,
                                curExp: 0,
                                maxExp: 0
                            }
                        },
                        newRank: 0
                    }
                });
                songInfoAll[mode][difficulty] = songInfo;
                db.run("UPDATE char_data SET s" + songId + " = '" + JSON.stringify(songInfoAll) + "' WHERE charId = '" + charId + "';", function (err) {
                    if (err) throw err;
                });
            });
        });
    });
});

handlers.set(6, (req, res) => {
    logger.info('单一歌曲排行榜');
    let db = new sqlite3.Database(dbname, function (err) {
        if (err) throw err;
    });
    let flag_weekly = false;
    if (req.data.hasOwnProperty("isWeek")) flag_weekly = true;
    db.all("select charId, name, country, headId from acc_data",function (err,data){
        if (err) throw err;
        let charList = {};
        for (let i = 0; i < data.length; i++){
            charList[data[i]["charId"]] = {name : data[i]["name"], country : data[i]["country"], headId : data[i]["headId"]};
        }
        let deltaTime = Date.now() - 7*24*60*60*1000;
        db.all("select charId, s" + req.data["songId"].toString() + " from char_data where s" + req.data["songId"].toString() + " not null",function (err,data){
            if (err) {  //无打歌记录 忽略
                res.write({
                    mainCmd: 5,
                    paraCmd: 7,
                    data: {
                        list : [
                            {
                                rank: 1,
                                charName: "此歌暂时无人游玩",
                                score: 1,
                                headId: 10010,
                                charId: "000000000",
                                country: 1,
                                teamName: "",
                                titleId: 10001
                            },
                            {
                                rank: 2,
                                charName: "快来争当排行榜第一！",
                                score: 2,
                                headId: 10010,
                                charId: "000000000",
                                country: 1,
                                teamName: "",
                                titleId: 10001
                            }
                        ]
                    }
                });
                return;
            }
            let scoreList = [];
            let mode = req.data["mode"].toString();
            let difficulty = req.data["difficulty"].toString();
            for (let i = 0; i < data.length; i++){
                let charID = data[i]["charId"];
                let score = JSON.parse(data[i]["s" + req.data["songId"].toString()]);
                if (!score.hasOwnProperty(mode)) continue;
                if (!score[mode].hasOwnProperty(difficulty)) continue;
                if (flag_weekly && score[mode][difficulty]["time"] < deltaTime) continue;
                scoreList.push({
                    charId : data[i]["charId"],
                    score : score[mode][difficulty]["score"],
                    time : score[mode][difficulty]["time"]
                });
            }
            scoreList.sort(function (a,b){return (b["score"] === a["score"]) ? a["time"] - b["time"] : b["score"] - a["score"]});
            let rankList = [];
            for (let i = 0; i < scoreList.length; i++){
                if (i > rankListLength)break;
                let name = " ";
                let country = 2;
                let headId = 10010;
                if (charList.hasOwnProperty(scoreList[i]["charId"])) {
                    name = charList[scoreList[i]["charId"]]["name"];
                    country = charList[scoreList[i]["charId"]]["country"];
                    headId = charList[scoreList[i]["charId"]]["headId"];
                }
                rankList.push({
                    rank : i + 1,
                    charName : name,
                    score : scoreList[i]["score"],
                    headId : headId,
                    charId : scoreList[i]["charId"],
                    country : country,
                    teamName : "",
                    titleId : 10001
                });
            }
            res.write({
                mainCmd: 5,
                paraCmd: 7,
                data: {
                    list : rankList
                }
            });
        });
    });

});

handlers.set(8, (req, res) => {
    logger.info('排行榜');
    let db = new sqlite3.Database(dbname, function (err) {
        if (err) throw err;
    });
    let rankType = req.data["type"];
    let sqlReqStr = "";
    if (rankType === 0) sqlReqStr = "totalScore";
    else if (rankType === 5) sqlReqStr = "total4KScore";
    else if (rankType === 6) sqlReqStr = "total6KScore";
    else if (rankType === 7) sqlReqStr = "total8KScore";
    else return;
    db.all("select charId, name, country, headId, " + sqlReqStr + " from acc_data",function (err,data){
        if (err) throw err;
        let scoreList = [];
        for(let i = 0; i < data.length; i++){
            if (data[i][sqlReqStr] === 0) continue;
            scoreList.push({
                charName : data[i]["name"],
                headId : data[i]["headId"],
                score : data[i][sqlReqStr],
                country : data[i]["country"],
                teamName: "",
                titleId : 10001
            })
        }
        scoreList.sort(function (a,b){return b["score"] - a["score"]});
        let sendScoreList=[];
        for(let i = 0; i < scoreList.length && i < rankListLength; i++){
            scoreList[i]["rank"] = i + 1;
            sendScoreList.push(scoreList[i]);
        }
        if (scoreList.length === 0) sendScoreList.push({
                rank: 1,
                charName: "暂时无人游玩",
                score: 1,
                headId: 10010,
                country: 1,
                teamName: "",
                titleId: 10001
            },
            {
                rank: 2,
                charName: "快来争当第一",
                score: 2,
                headId: 10010,
                charId: "000000000",
                country: 1,
                teamName: "",
                titleId: 10001
            });
        res.write({
            mainCmd: 5,
            paraCmd: 9,
            data: {
                list : sendScoreList,
                type : rankType,
            }
        });
    });
});

handlers.set(30, (req, res, now, sessionid) => {
    logger.info('更换头像');
    res.write({
        mainCmd: 5,
        paraCmd: 31,
        data: {id : req.data["id"]}
    });
    let db = new sqlite3.Database(dbname, function (err) {
        if (err) throw err;
    });
    db.run("UPDATE acc_data SET headId = $headId WHERE sessionid = $sessionid;", {
        $headId: req.data["id"],
        $sessionid: sessionid
    }, function (err) {
        if (err) throw err;
    });
});

handlers.set(32, (req, res, now, sessionid) => {
    logger.info('更换角色');
    res.write({
        mainCmd: 5,
        paraCmd: 33,
        data: {id : req.data["id"]}
    });
    let db = new sqlite3.Database(dbname, function (err) {
        if (err) throw err;
    });
    db.run("UPDATE acc_data SET selectCharId = $selectCharId WHERE sessionid = $sessionid;", {
        $selectCharId: req.data["id"],
        $sessionid: sessionid
    }, function (err) {
        if (err) throw err;
    });
});

handlers.set(34, (req, res, now, sessionid) => {
    logger.info('更换主题');
    res.write({
        mainCmd: 5,
        paraCmd: 35,
        data: {id : req.data["id"]}
    });
    let db = new sqlite3.Database(dbname, function (err) {
        if (err) throw err;
    });
    db.run("UPDATE acc_data SET selectThemeId = $selectThemeId WHERE sessionid = $sessionid;", {
        $selectThemeId: req.data["id"],
        $sessionid: sessionid
    }, function (err) {
        if (err) throw err;
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

handlers.set(58, (req, res) => {
    logger.info('新建角色');
    res.write({
        mainCmd: 5,
        paraCmd: 59,
        data: {}
    });
});

handlers.set(73, (req, res) => {
    logger.info('公开动态');
    res.write({
        mainCmd: 5,
        paraCmd: 74,
        data: {
            contentList : req.data["contentList"]
        }
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

async function dispatch(req, res, now, sessionid) {
    const handler = handlers.get((req.mainCmd === 1 || req.mainCmd === 3) ? req.paraCmd + 1000 : req.paraCmd);
    if (!handler)
        logger.error('Handler not implemented! paraCmd %d', req.paraCmd);
    return handler(req, res, now, sessionid);
}

exports.dispatch = dispatch;

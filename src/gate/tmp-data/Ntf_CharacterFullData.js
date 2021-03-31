const sqlite3 = require("sqlite3").verbose();
const dbname = "db.db";
const keyModeList = {"1": "key4List", "2": "key6List", "3": "key8List"};
const difficultList = {"1": "easyList", "2": "normalList", "3": "hardList"}


let getScoreList = async (charId) => {
    return new Promise(resolve => {
        let res = {
            "key4List": {},
            "key6List": {},
            "key8List": {}
        }
        let db = new sqlite3.Database(dbname, function (err) {
            if (err) throw err;
        });
        db.get("select * from char_data where charId = $charId", {$charId: charId}, function (err, data) {
            if (err) throw err;
            if (data === undefined || data === null) resolve(res);
            else delete data.charId;
            for (let key_song in data) {
                if (data[key_song] === null) continue;
                data[key_song] = JSON.parse(data[key_song]);
                for (let key_mode in data[key_song]) {
                    for (let key_difficult in data[key_song][key_mode]) {
                        if (res[keyModeList[key_mode]].hasOwnProperty(difficultList[key_difficult]) === false) res[keyModeList[key_mode]][difficultList[key_difficult]] = [];
                        res[keyModeList[key_mode]][difficultList[key_difficult]].push(data[key_song][key_mode][key_difficult]);
                    }
                }
            }
            resolve(res);
        });
    });
};


module.exports = async function (accId = 1, charId = 1, charName = "6031", headId = 30040, curCharacterId = 30040, curThemeId = 1) {
    return {
        "data": {
            "baseInfo": {
                "accId": accId,
                "charId": charId,
                "charName": charName,
                "headId": headId,
                "level": 30,
                "curExp": 0,
                "maxExp": 0,
                "guideStep": 7,
                "curCharacterId": curCharacterId,
                "curThemeId": curThemeId,
                "onlineTime": 0,
                "needReqAppReceipt": 0,
                "activePoint": 0,
                "preRankId": 0,
                "guideList": [
                    9,
                    8,
                    7,
                    6,
                    5,
                    4,
                    3,
                    2,
                    1
                ],
                "country": 1,
                "preRankId4K": 0,
                "preRankId6K": 0,
                "titleId": 10001
            },
            "currencyInfo": {
                "gold": 0,
                "diamond": 999999,
                "curStamina": 0,
                "maxStamina": 10,
                "honourPoint": 0
            },
            "scoreList": await getScoreList(charId),
            "songList": {
                "list": [
                    {"songId" : 80031},
                    {"songId" : 80008},
                    {"songId" : 80011},
                    {"songId" : 80012},
                    {"songId" : 80010},
                    {"songId" : 80034},
                    {"songId" : 80007},
                    {"songId" : 80015},
                    {"songId" : 80013},
                    {"songId" : 80009},
                    {"songId" : 80014},
                    {"songId" : 80019},
                    {"songId" : 80020},
                    {"songId" : 80018},
                    {"songId" : 63122},
                    {"songId" : 63123},
                    {"songId" : 63204},
                    {"songId" : 62005},
                    {"songId" : 62006},
                    {"songId" : 63103},
                    {"songId" : 69008},
                    {"songId" : 68008},
                    {"songId" : 68108},
                    {"songId" : 80002},
                    {"songId" : 64005},
                    {"songId" : 69018},
                    {"songId" : 68002},
                    {"songId" : 68001},
                    {"songId" : 82005},
                    {"songId" : 82006},
                    {"songId" : 82007},
                    {"songId" : 82011},
                    {"songId" : 65102},
                    {"songId" : 68106},
                    {"songId" : 64003},
                    {"songId" : 62021}
                ]
            },
            "charList": {
                "list": [
                    {
                        "charId": 20060,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 40090,
                        "level": 1,
                        "exp": 0,
                        "playCount": 1
                    },
                    {
                        "charId": 40130,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 50010,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 40010,
                        "level": 1,
                        "exp": 0,
                        "playCount": 422
                    },
                    {
                        "charId": 40040,
                        "level": 1,
                        "exp": 0,
                        "playCount": 7
                    },
                    {
                        "charId": 10050,
                        "level": 1,
                        "exp": 0,
                        "playCount": 660
                    },
                    {
                        "charId": 10010,
                        "level": 1,
                        "exp": 0,
                        "playCount": 10
                    },
                    {
                        "charId": 10020,
                        "level": 1,
                        "exp": 0,
                        "playCount": 10
                    },
                    {
                        "charId": 20040,
                        "level": 1,
                        "exp": 0,
                        "playCount": 76
                    },
                    {
                        "charId": 40220,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 10040,
                        "level": 1,
                        "exp": 0,
                        "playCount": 2
                    },
                    {
                        "charId": 20050,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 30070,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 20020,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 20090,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 40320,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 20030,
                        "level": 1,
                        "exp": 0,
                        "playCount": 1
                    },
                    {
                        "charId": 10030,
                        "level": 1,
                        "exp": 0,
                        "playCount": 6
                    },
                    {
                        "charId": 30050,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 40150,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 40260,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 30040,
                        "level": 1,
                        "exp": 0,
                        "playCount": 171
                    },
                    {
                        "charId": 40330,
                        "level": 1,
                        "exp": 0,
                        "playCount": 65
                    },
                    {
                        "charId": 40120,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 20170,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 10060,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 30090,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 40250,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 30100,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    },
                    {
                        "charId": 30110,
                        "level": 1,
                        "exp": 0,
                        "playCount": 0
                    }
                ]
            },
            "socialData": {},
            "announcement": {
                "list": [
                    {
                        "title": "运营公告",
                        "content": "<b><color=#ffa500ff>《音灵INVAXION》关服公告</color></b>\n\t\t  \n\n　　久等了，各位音之守护者。\n\t\t  \n　　欢迎来到<color=#ffa500ff>《音灵INVAXION》</color>的世界。\n\t\t  \n\n　　我们跑路了",
                        "picId": 0,
                        "tag": 1
                    },
                ],
                "picList": []

            },
            "themeList": {
                "list": [
                    {
                        "themeId": 1
                    },
                    {
                        "themeId": 2
                    },
                    {
                        "themeId": 3
                    },
                    {
                        "themeId": 4
                    },
                    {
                        "themeId": 5
                    },
                    {
                        "themeId": 6
                    },
                    {
                        "themeId": 7
                    },
                    {
                        "themeId": 8
                    },
                    {
                        "themeId": 9
                    },
                    {
                        "themeId": 10
                    },
                    {
                        "themeId": 11
                    },
                    {
                        "themeId": 12
                    },
                    {
                        "themeId": 13
                    },
                    {
                        "themeId": 14
                    }
                ]
            },
            "vipInfo": {
                "level": 0,
                "exp": 0,
                "levelUpExp": 100,
                "inSubscription": 0
            },
            "arcadeData": {
                "key4List": {},
                "key6List": {},
                "key8List": {}
            },
            "titleList": {
                "list": []
            },
            "team": {
                "teamId": 0,
                "teamName": "",
                "uploadSongCount": 3,
                "canUploadSong": 0
            }
        }
    }
};

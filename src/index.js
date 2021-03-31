require('dotenv/config');

const net = require('net');
const log4js = require('log4js');
const proto = require('./utils/proto-loader');
const login = require('./login');
const gate = require('./gate');
const server = require('./server');
const sqlite3 = require("sqlite3").verbose();

const dbname = "db.db"

log4js.configure({
    appenders: {
        stdout: {
            type: 'stdout'
        },
        stderr: {
            type: 'stderr'
        },
        out: {
            type: 'logLevelFilter',
            level: 'DEBUG',
            maxLevel: 'INFO',
            appender: 'stdout'
        },
        err: {
            type: 'logLevelFilter',
            level: 'WARN',
            maxLevel: 'FATAL',
            appender: 'stderr'
        }
    },
    categories: {
        default: {
            appenders: ['err', 'out'],
            level: 'DEBUG'
        }
    },
});

const logger = log4js.getLogger('app:index');

(async function () {

    await proto.load();
    let db = new sqlite3.Database(dbname, function (err) {
        if (err) throw err;
    });
    db.run("create table if not exists acc_data(accId INTEGER PRIMARY KEY AUTOINCREMENT, sessionid INTEGER DEFAULT 0, steamId VARCHAR(26), token CHAR(32), charId CHAR(10) DEFAULT '0000000000',name VARCHAR(50), language INTEGER DEFAULT 2, country INTEGER, selectCharId INTEGER, headId INTEGER, selectThemeId INTEGER DEFAULT 1, totalScore INTEGER DEFAULT 0, total4KScore INTEGER DEFAULT 0, total6KScore INTEGER DEFAULT 0, total8KScore INTEGER DEFAULT 0);", function(err) {
        if (err) throw err;
        db.run("UPDATE acc_data SET sessionid=0", function(err) {
            if (err) throw err;
        });
    });
    db.run("create table if not exists char_data(charId CHAR(10));", function(err) {
        if (err) throw err;
    });

    db.close();
    net.createServer(server(login)).listen(60311, '0.0.0.0');
    net.createServer(server(gate)).listen(20021, '0.0.0.0');

    logger.info('Startup OK, worker %d', process.pid);
})();

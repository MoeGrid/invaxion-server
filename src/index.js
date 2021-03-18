require('dotenv/config');

const net = require('net');
const log4js = require('log4js');
const proto = require('./utils/proto-loader');
const login = require('./login');
const gate = require('./gate');
const server = require('./server');

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

    net.createServer(server(login)).listen(20017, '0.0.0.0');
    net.createServer(server(gate)).listen(20021, '0.0.0.0');

    logger.info('Startup OK, worker %d', process.pid);
})();

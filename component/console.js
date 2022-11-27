
const chalk = require('chalk');
class Console {
    constructor() {

    }
    log(info) {
        console.log('\x1B[32m', info);
    }
    error(info) {
        return console.log(new Error(info))
    }
    warn(info) {
        console.log('\x1B[33m', info);
    }

    color(color, info) {
        console.log(chalk.white.bgRgb(...color)(info))
    }
}

module.exports = Console
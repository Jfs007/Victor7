
let Console = require('./console');
class Base {
    constructor() {
        this.console = new Console();
    }
    init(options = {}) {
        for (let key in options) {
            this[key] = options[key];
        }
    }


}

module.exports = Base;


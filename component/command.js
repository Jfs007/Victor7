
let Base = require('./base');

class Command extends Base {

    name = '';
    cfg = {};
    
    constructor(options) {
        super();
        super.init(options);
    }
    config(cfg) {
        this.cfg = Object.assign({}, this.cfg || {}, cfg);
    }
    run() {

    }
    
    
}



module.exports = Command;
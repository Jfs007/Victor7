let Base = require('./base');

class Loader extends Base {
    isload = false;
    load = [];
    directory = '';
    constructor() {
        super();
        
    }
    complete() {
        this.isload = true;
    }
    launch() {
        
    }
    setup() {}
    
    
}
module.exports = Loader
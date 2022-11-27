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
    async launch() {
        if(this.isload) return this.load;
        return this.load;

    }
    setup() {}
    
    
}
module.exports = Loader
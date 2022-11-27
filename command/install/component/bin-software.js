

let Software = require('../core/software');
const Brew = require('../core/brew');

class BinSoftware extends Software {
    constructor(options = {}) {
        super();
        super.init(options)
    }

    async setup() {

        super.setup();
    }
    install() {
        Brew.run('install', this.app);
    }
}

module.exports = BinSoftware;



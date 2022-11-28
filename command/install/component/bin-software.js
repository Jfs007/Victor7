

let Software = require('../core/software');
const Brew = require('../core/brew');

class BinSoftware extends Software {
    static key = 'bin';
    constructor(options = {}) {
        super();
        super.init(options)
    }

    async setup() {

        super.setup();
    }
    install() {
        super.install();
        Brew.run('install', this.app);
    }
}

module.exports = BinSoftware;



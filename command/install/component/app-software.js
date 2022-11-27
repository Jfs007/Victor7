let Software = require('../core/software');


class AppSoftware extends Software {
    key = 'app';
    constructor(options) {
        super(options);
    }
}

module.exports = AppSoftware;
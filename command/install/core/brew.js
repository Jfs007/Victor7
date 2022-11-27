let  Software = require("./software");
class Brew extends Software {
    constructor() {
        super();
        this.app = 'brew';
    }
    async run() {
        await this.setup();
        super.run(...arguments);
    }
    install() {
        this.exec(``);
    }



}


module.exports = new Brew();



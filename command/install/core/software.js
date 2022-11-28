const shell = require('shelljs');
const promisify = require('../../../util/promisify');
const Base = require('../../../component/base');
let exec = promisify.shelljs(shell.exec).bind(shell);
const uuid = require('node-uuid')
class Software extends Base {
    key = '';
    constructor(options = {}) {
        super();
        this.id = uuid.v4();
        this.shell = shell;
        this.app = '';
        super.init(options);
    }

    config(options) {
        this.init(options);
        return this;
    }


    async run() {
        let args = Array.prototype.slice.call(arguments);
        
        try {
            return await exec(`${this.app} ` + args.join(' '))
        } catch (error) {
            this.console.error(error.content);
        }
        
    }

    async setup() {
        if (await this.isInstall()) {
            this.console.warn(`${this.app}已安装`);
            return;
        }
        try {
            await this.install();
        } catch (error) {
        }
    }

    

    exec(value) {
        return exec(value);
    }


    async isInstall() {
        try {
            await this.exec(`which ${this.app}`);
            return true;
        } catch (error) {
            return false;
        }


    }
    install() {
        this.console.log('准备开始安装' + this.app);

    }







}

module.exports = Software;
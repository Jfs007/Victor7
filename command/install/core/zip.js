const shell = require('shelljs');
const promisify = require('../../../util/promisify');
const Base = require("../../../component/base");
const File = require('../../../util/file');
let exec = promisify.shelljs(shell.exec).bind(shell);
const Brew = require('./brew');

class Zip extends Base {

    strategy = {
        zip: {
            bin: 'zip'
        },
        tar: {
            bin: 'tar'
        },
        rar: {
            bin: 'rar'
        },
        'tar.gz': {
            bin: 'tar'
        },
        'tgz': {
            bin: 'tar'
        }
    };
    constructor() {
        super();
        this.name = '';
        this.unzipPath = '';
    }

    config(options = {}) {
        super.init(options);
        this.type = File.type({ path: this.name }).content;
        return this;
    }


    async checks() {
        let sgy = this.strategy[this.type];
        if (!sgy) {
            this.console.error(`无法处理${this.type}类型文件`);
            return;
        }
        let util = shell.which(sgy.bin);
        if (util.code != 0) {
            this.console.warn(`未安装${sgy.bin},现在将为你安装`);
            await Brew.run('install', sgy.bin);
        };

    }
    async unzip() {
        await this.checks();
        switch (this.type) {
            case 'zip':
                await exec(`unzip -d ${this.unzipPath} ${this.name}`);

        }
    }


}


module.exports = Zip;
const shell = require('shelljs');
const promisify = require('../../../util/promisify');
const File = require('../../../util/file');
const Base = require('../../../component/base');
let exec = promisify.shelljs(shell.exec).bind(shell);
const uuid = require('node-uuid')
class Software extends Base {
    key = '';
    #tempPath = File.Resolve(__dirname, '../.tempFile/');
    depend = ['zip'];
    constructor(options = {}) {
        super();
        this.app = '';
        this.id = uuid.v4();
        // 下载地址
        this.url = '';
        // 文件类型
        this.type = '';
        // 文件名称
        this.name = '';
        console.log(this.id)
        super.init(options);
        // this.setup();
    }


    setup(installer) {
        this.name = this.name || File.name({ path: this.url }).content;
        this.type = File.type({ path: this.name || this.url }).content;
        this.run();
        // installer.on('exit', () => {
        //     // exec(`rm -rf`)
        // })

    }



    async run() {
        try {
            
            shell.cd(this.#tempPath)
            await exec(`curl -L ${this.url} -o ${this.name}`);
            await this.unzip();
            await this.rm();


        } catch (error) {
            console.log(error)
        }
    }

    async install() {

    }

    async rm() {
        return await exec(`rm -rf ${this.name}`);
    }
    async unzip() {
        let v = shell.which('zip');
        if (v.code == 0) {
            await exec(`unzip -d ./${this.id} ${this.name}`);
        }
    }







}

module.exports = Software;
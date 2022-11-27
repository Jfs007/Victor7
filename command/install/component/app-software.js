let Software = require('../core/software');
const File = require('../../../util/file');
const Zip = require('../core/zip');

class AppSoftware extends Software {
    key = 'app';
    #appPath = '/Applications/';
    #tempPath = File.Resolve(__dirname, '../.tempFile');
    constructor(options) {
        super(options);
        this.app = '';
        // 文件类型
        this.type = '';
        // 文件名称
        this.name = '';
        super.init(options);
    }
    setup(installer) {
        this.name = this.name || File.name({ path: this.url }).content;
        this.type = File.type({ path: this.name || this.url }).content;
        installer.e.on('exit', async () => {
            await this.exec(`rm -rf ${this.#tempPath}/${this.name}`)
        });
        super.setup();
    }
    async isInstall() {
        try {
            let stat = await File.stat({ root: this.#appPath, path: './' + this.app });
            return !stat.error;
        } catch (error) {
            return false;
        }

    }

    async install() {
        this.shell.cd(this.#tempPath);
        try {


            await this.exec(`curl -L ${this.url} -o ${this.name}`);
            await this.unzip();
            await this.rm(this.name);
            await this.cp();
            await this.rm(`./${this.name}-unzip`)
        } catch (error) {
            console.log(error)
        }
    }

    async rm(path) {
        return await this.exec(`rm -rf ${path}`);
    }

    async cp() {
        await this.exec(`cp ./${this.name}-unzip/${this.app} ${this.#appPath}`)
    }

    async unzip() {
        await new Zip().config({ unzipPath: `./${this.name}-unzip`, name: this.name }).unzip();

    }



}

module.exports = AppSoftware;
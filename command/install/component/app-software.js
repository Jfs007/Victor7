let Software = require('../core/software');
const File = require('../../../util/file');
const Zip = require('../core/zip');
const fs = require('fs');
const http = require('node:http');
class AppSoftware extends Software {
    key = 'app';
    static key = 'app';
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

    get pureName() {
        return this.name.split('.')[0];
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

    isMacHdiApp() {
        return this.type == 'pkg' || this.type == 'dmg';
    }

    async pkgInstall() {
        await this.exec(`hdiutil attach ${this.name}`);
        await this.exec(`hdiutil detach "/Volumes/${this.pureName} Installer/"`);
        
        // await this.exec(`cp -rf "/Volumes/${this.pureName}\ Installer/${this.app}" "/Volumes/${this.pureName}\ Installer/Applications"`);
    }

    async install() {
        super.install();
        this.shell.cd(this.#tempPath);
        try {

            await this.curl();
            if(this.isMacHdiApp()) {
                await this.pkgInstall();
                await this.rm(this.name);
                return;
            }
            await this.unzip();
            await this.rm(this.name);
            await this.cp();
            await this.rm(`./${this.name}-unzip`)
        } catch (error) {
            // console.log(error)
        }
    }

    async curl() {
        
        await this.exec(`curl -L# ${this.url} -o ${this.name}`);
        
        // let stream = fs.createWriteStream(this.#tempPath + '/' + this.name);
        // let _curl = http.request(this.url).pipe(stream);

       
        // return new Promise((resolve, reject) => {
        //     _curl.on("close", function (data) {
        //         console.log("文件" + data + "下载完毕");
        //         resolve()
        //     });
        //     _curl.on("data", function(a, b, c) {
        //         console.log(a, b, c)
        //         reject()
        //     })


        // })
        
        
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
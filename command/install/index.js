
const Command = require('../../component/command');
const shell = require('shelljs');
const File = require('../../util/file');
const promisify = require('../../util/promisify');
const exec = promisify.shelljs(shell.exec).bind(shell);

const AppSoftware = require('./component/app-software');
const e = require('events');



const Brew = require('./core/brew');

// Brew.run('--help');



class InstallCommand extends Command {
    #scriptName = '.install'
    constructor() {
        super();
        this.name = 'i';
        this.e = new e.EventEmitter();
        this.load();
    }
    load() {
        // 加载自定义脚本

    }
    async run(args, cwd) {
        let scriptPath = cwd + '/.install/index.js';
        let stat = await File.stat({ path: scriptPath });
        if (!stat.error) {
            let script = require(scriptPath);
            script(this)
        }
        new AppSoftware({
            app: 'Visual Studio Code2.app',
            url: 'https://vscode.cdn.azure.cn/stable/c3f126316369cd610563c75b1b1725e0679adfb3/VSCode-darwin-universal.zip'
        }).setup(this);
        process.on('SIGINT', async () => {
            await this.e.emit('exit');
            process.exit();

        });
        // await this.checkInstaller();
    }
    // 检查安装器
    async checkInstaller() {
        try {
            // 判断brew是否安装
            return await exec('which brew1');
        } catch (error) {
            await this.curlInstaller();
            return error;
        }
    }
    async curlInstaller() {


        try {
            // let v = await exec(`
            // curl -LO https://github.com/yanue/V2rayU/releases/download/3.2.0/V2rayU.dmg

            //  `);
            //  console.log(v)
            //  await exec(`hdiutil attach V2rayU.dmg`);
            //  await exec(`cp -rf "/Volumes/V2rayU\ Installer/V2rayU.app" "/Volumes/V2rayU\ Installer/Applications"`);
            //  await exec(`hdiutil detach "/Volumes/V2rayU Installer/"`)

        } catch (error) {
            console.log(error)
        }

      

    }

}

module.exports = InstallCommand;




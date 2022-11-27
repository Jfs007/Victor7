
const Command = require('../../component/command');
const shell = require('shelljs');
const promisify = require('../../util/promisify');
const exec = promisify.shelljs(shell.exec).bind(shell);

const AppSoftware = require('./component/app-software');






class InstallCommand extends Command {

    constructor() {
        super();
        this.name = 'i';
    }
    async run() {
        new AppSoftware({
            url: 'https://vscode.cdn.azure.cn/stable/c3f126316369cd610563c75b1b1725e0679adfb3/VSCode-darwin-universal.zip'
        }).setup();

        // console.log(__dirname)
        // process.on('SIGINT', async function (v, b, c) {
        //     await exec('rm -rf VSCode-win32-x64-1.59.0.zip')
        //     process.exit();

        // });
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
      
        // try {
        //     let v = await exec(`hdiutil attach V2rayU.dmg`);
            
        // } catch (error) {
        //     console.log(error)
            
        // }
        
        // console.log(v.content[0], 'v');
        // await exec(`rm -rf VSCode-darwin-universal.zip`);

        //     console.log(v, 'v');


    }

}

module.exports = InstallCommand;




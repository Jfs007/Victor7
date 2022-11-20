
let Command = require('../component/command');
let file = require('../util/file');
let textParse = require('../util/text-parse');


class CheckOutEnvCommand extends Command {
    constructor() {
        super();
        this.name = 'cenv';
        this.cwd = '';
        this._var = {};
        this.cfg = {
            envPackage: `env`
        }

    }
    async run(args) {
        let [env] = args;
        let envPackage = `./${this.cfg.envPackage}/`; 
        this.cwd = process.cwd();
        let envPath = envPackage + '.env.' + env;
        let v = await file.read({ path: envPath, root: this.cwd });
        if(v.error) {
            this.console.warn(`环境不存在,请先设置环境【你需在当前执行目录创建${this.cfg.envPackage}/.env.${env}文件】`);
            return;
        }
        let _var = textParse.object(v.content || '');
        this._var = _var;
        let content = `module.exports = ${JSON.stringify(_var)}`
        await file.write({ path: envPackage + 'index.js' , content , root: this.cwd });
        this.console.log('环境已切换为' + ((_var.NAME||'').trim() || env));
        process.exit();

    }
    

}

module.exports = CheckOutEnvCommand;
let loader = require('../loader/command');
let textLoader = require('../loader/text');
let { args } = require('../util/args');


async function command() {
    let configLoad = await (new textLoader({path: '../.config' })).launch();
    let _args = args();
    let commandName = _args.shift();
    let load = await loader.launch();
    let command = load[commandName];
    if(command) {
        command.config(configLoad);
        await command.setup();
        await command.launch();
        command.run(_args, process.cwd());
        
    }else {
        loader.console.warn('不存在的命令【' + commandName + '】')
    }
    
}


module.exports = command;
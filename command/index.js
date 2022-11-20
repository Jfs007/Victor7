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
        command.run(_args);
    }
    
}


module.exports = command;
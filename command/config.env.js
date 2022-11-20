
let Command = require('../component/command');
let File = require('../util/file');


class ConfigEnvCommand extends Command {
    constructor() {
        super();
        this.name = 'config';
    }
    run(args) {
        let [key, value] = args;
        if (value !== undefined) {
            this.cfg = Object.assign({}, this.cfg, {
                [key]: value
            })
        }
        let text = Object.keys(this.cfg).map(key => {
            return `${key} = "${this.cfg[key]}"`
        }).join('\n');
        File.write({
            path: '../.config',
            content: text
        })

    }
}

module.exports = ConfigEnvCommand;
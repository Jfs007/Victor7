
const Loader = require('../component/loader');
let File = require('../util/file');
class CommandLoader extends Loader {

    constructor() {
        super();
        this.directory = '../command/';
    }
    async setup() {
        let v = await File.readdir({ path: this.directory });
        let files = v.content.filter(_ => _ != 'index.js');
        files.map(file => {
            let command = new (require(this.directory + file))();
            this.load[command.name] = command;
        });
        this.complete();
        return this.load;
    }
    async launch() {
        if (this.isload) return this.load;
        return this.setup();
    }
}



module.exports = new CommandLoader();


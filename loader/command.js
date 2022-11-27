
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
        let loads = async file => {
            let stat = await File.stat({ path: this.directory + file });
            let isDirectory = stat.content.isDirectory();
            file = isDirectory ? file + '/' + 'index.js' : file;
            let command = new (require(this.directory + file))();
            this.load[command.name] = command;
        }
        await Promise.all(files.map(file => {
            return loads(file);
        }));
        this.complete();
        return this.load;
    }
    async launch() {
        if (this.isload) return this.load;
        return this.setup();
    }
}



module.exports = new CommandLoader();


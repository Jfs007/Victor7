const Loader = require('../component/loader');
let File = require('../util/file');
class Script extends Loader {
    path = '';
    load = {};
    constructor(config) {
        super();
        let { path, root } = config;
        this.path = path;
        this.root = root;

    }
    async launch() {
        let stat = await File.stat({ path: this.path, root: this.root });
        if (!stat.error) {
            script = require(stat.path);
            this.load = script;
            this.complete();
            return this.load;
        }
        return this.load;


    }
    // setup
}

module.exports = Script;
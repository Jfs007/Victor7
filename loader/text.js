const Loader = require('../component/loader');
let File = require('../util/file');
let textParse = require('../util/text-parse');


class Text extends Loader {
    path = '';
    load = {};
    constructor(config) {
        super();
        let { path } = config;
        this.path = path;

    }
    async launch() {
        let content = await File.read({ path: this.path });
        this.load = textParse.object(content.content);
        this.complete();
        return this.load;

    }
    // setup
}

module.exports = Text;
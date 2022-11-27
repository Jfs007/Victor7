
const Command = require('../../component/command');
const Loader = require('../../component/loader');
const File = require('../../util/file');
const e = require('events');
const ProLoaded = require('./preloaded');

class InstallCommand extends Command {
    #scriptName = '.install';
    constructor() {
        super();
        this.name = 'i';
        this.e = new e.EventEmitter();
        this._software = [];
        this.componentLoader = new Loader();

    }
    async setup() {
        if (this.componentLoader.isload) return this.componentLoader.load;
        let Software = {};
        let dir = await File.readdir({ path: './component/', root: __dirname });
        dir.content.map(componentName => {
            let sw = require(`./component/${componentName}`);
            Software[sw.key] = sw;
        });
        this.componentLoader.load = Software;
        this.componentLoader.complete();
        return this.componentLoader.load;

    }

    launch() {
        this.loadPreloadedSoftware();
    }

    addSoftware(app) {
        if (!this.isLoadSoftware(app)) {
            let Component = this.componentLoader.load[app.key];
            this._software.push(new Component(app));
        }
    }



    isLoadSoftware(app) {
        let appid = app.key + '-' + app.name;
        let has = this._software.find(software => {
            let swid = software.key + '-' + software.name;
            return swid === appid;
        });
        return !!has;
    }


    loadPreloadedSoftware() {
        ProLoaded.map(app => {
            this.addSoftware(app);
        })
    }
    async run(args, cwd) {
        let scriptPath = cwd + `/${this.#scriptName}/index.js`;
        let stat = await File.stat({ path: scriptPath });

        if (!stat.error) {
            let script = require(scriptPath);
            script(this)
        };

        this._software.map(sw => {
            sw.setup(this);
        })
        process.on('SIGINT', async () => {
            await this.e.emit('exit');
            process.exit();

        });
    }


}

module.exports = InstallCommand;





import Define from '../core/define';
import Url from '../utils/url';
class Navigate {
    app = null;
    pointer = null;
    alias = '$n';
    delta = -1;
    define = {};
    query = {};
    constructor(Vic) {
        Vic.navigate = this;
        Vic[this.alias] = this;
    }
    setup(app) {
        let navigate = this;
        this.app = app;
        this.define = Define.define(this.app, ['switchTab', 'reLaunch', 'redirectTo', 'navigateTo', 'navigateBack']);
        Object.keys(this.define).map(key => {
            Object.defineProperty(this.app, key, {
                get: function () {
                    return navigate[key].bind(navigate);
                }
            })
        });
        return this;

    }
    setQuery(options) {
        let { url } = options;
        this.query = Url.query(url);

    }
    switchTab(options = {}) {
        this.setQuery(options);
        this.define['switchTab'].call(this.app, options);
    }
    reLaunch(options = {}) {
        this.setQuery(options);
        this.define['reLaunch'].call(this.app, options);
    }
    redirectTo(options = {}) {
        this.setQuery(options);
        this.define['redirectTo'].call(this.app, options);
    }
    navigateTo(options = {}) {
        this.setQuery(options);
        this.define['navigateTo'].call(this.app, options);
    }
    navigateBack(options = {}) {
        let { delta } = options;
        if (delta == 'base' && this.pointer) {
            options.delta = this.getDelta();
            this.base();
        } else {
            options.delta = delta || 1;
        }
        this.setQuery(options);
        this.define['navigateBack'].call(this.app, options);
    }
    navigateBaseTo(query) {
        let Pages = getCurrentPages();
        this.pointer = Pages[Pages.length - 1];
        this.delta = Pages.length;
        this.navigateTo(query);
    }
    base() {
        this.pointer = null;
        this.delta = -1;
    }

    getDelta() {
        let pointer = this.pointer;
        let delta = this.delta;
        if (!pointer) return -1;
        let Pages = getCurrentPages();
        return Pages.length - delta;
    }

}




/**
 * Victor 维克托 
 * 加入光荣的进化吧
 * 
 */

class VicApp {
    name = 'vic';
    navigate = null;
    env = null;
    constructor() {
    }
    setup(App) {
        this.app = App;
        this.app[this.name] = this;
        new Navigate(this).setup(this.app);
    }
    use(key, value) {
        this[key] = value;
    }
}
let vic = new VicApp();

function getContext() {
    var pages = getCurrentPages();
    return pages[pages.length - 1];
}


function query(options = {}) {
    let context = options.context ? options.context : getContext() || {};
    let _options = context.options || {};
    let query = Object.assign({}, _options, vic.navigate.query || {});
    return query;
}

function use(key, value) {
    vic.use(key, value);
}

export {
    query,
    vic,
    use
}





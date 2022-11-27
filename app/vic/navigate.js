
import Define from '../core/define';
import Url from '../utils/url';
import Base from '../core/base';
class Navigate extends Base {
    _name = 'navigate';
    app = null;
    pointer = null;
    alias = '$n';
    delta = -1;
    define = {};
    Url = Url;
    query = {};
    constructor() {
        super();
    }

    

    setup(app) {
        let navigate = this;
        this.app = app;
        this.define = Define.define(this.app, ['switchTab', 'reLaunch', 'redirectTo', 'navigateTo', 'navigateBack']);
        this.define.navigateBaseTo = this.navigateBaseTo;
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
        let { delta, url } = options;
        if (delta == 'base' && this.pointer) {
            options.delta = this.getDelta();
            this.base();
        } else {
            options.delta = delta || 1;
        }
        this.setQuery({ url: url || '' });
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

export default Navigate;
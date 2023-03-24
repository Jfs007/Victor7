
import Define from '../core/define';
import Url from '../utils/url';
import Component from '../core/component';
import { getContext } from '.'


class Navigate extends Component {
    _name = 'navigate';
    alias = '$n';
    pointer = null;
    delta = -1;
    define = {};
    query = {};

    history = [];

    pushRoute = '';









    constructor() {
        super();
    }

    setup(vic) {
        super.setup(vic);
        let navigate = this;
        this.define = Define.define(this.__app, ['switchTab', 'reLaunch', 'redirectTo', 'navigateTo', 'navigateBack']);
        this.define.navigateBaseTo = this.navigateBaseTo;
        Object.keys(this.define).map(key => {
            Object.defineProperty(this.__app, key, {
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
        options = this.done({ options, routeFunction: 'switchTab' }, (path) => {
            this.history = [path]
        })
        this.setQuery(options);
        this.define['switchTab'].call(this.__app, options);
    }
    reLaunch(options = {}) {
        options = this.done({ options, routeFunction: 'reLaunch' }, (path) => {
            this.history = [path]
        })
        this.setQuery(options);

        this.define['reLaunch'].call(this.__app, options);
    }
    redirectTo(options = {}) {
        options = this.done({ options, routeFunction: 'redirectTo' }, (path) => {
            this.history.pop();
            this.history.push(path);
        })
        this.setQuery(options);

        this.define['redirectTo'].call(this.__app, options);
    }
    navigateTo(options = {}) {
        options = this.done({ options, routeFunction: 'navigateTo' }, (path) => {
            this.history.push(path);
        });
        this.setQuery(options);

        this.define['navigateTo'].call(this.__app, options);
    }
    navigateBack(options = {}) {
        let { delta, url } = options;
        if (delta == 'base' && this.pointer) {
            options.delta = this.getDelta();
            this.base();
        } else {
            options.delta = delta || 1;
        }
        options = this.done({ options, routeFunction: 'navigateBack' }, (path) => {
            this.history = this.history.slice(0, this.history.length - (options.delta || 1));
            // this.history.pop();
        });
        this.setQuery({ url: url || '' });
        this.define['navigateBack'].call(this.__app, options);
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

    getPureUrl(url) {
        return (url || '').replace(/\?.*/, '');
    }

    getDelta() {
        let pointer = this.pointer;
        let delta = this.delta;
        if (!pointer) return -1;
        let Pages = getCurrentPages();
        return Pages.length - delta;
    }


    done({ options, routeFunction } = op, done = () => { }) {
        this.pushRoute = '';
        let ctx = getContext();
        let { onShow } = ctx;
        let navigate = this;

        let url = options.url;
        if(!url || routeFunction == 'navigateBack') {
            url = this.history[this.history.length - 2] || '';
        }
        let path = url.replace(/\?.*/, '');
        let _success = options.success;
        options.success = function (value) {

            done(path, options);
            _success && _success(value);
            if (!navigate.pushRoute) {
                navigate.__e.emit('onRoute', {
                    to: path,
                    from: ctx.route
                });
                navigate.pushRoute = path.replace(/^\//, '');
            }


            if (!ctx.__register) {
                ctx.onShow = function (value) {
                    let from = navigate.history.slice(-1)[0];
                    from = from.replace(/^\//, '');
                    if (navigate.pushRoute === from) {
                        navigate.__e.emit('onRoute', {
                            to: ctx.route,
                            from
                        });
                        navigate.history.pop();
                        navigate.pushRoute = ctx.route.replace(/^\//, '');
                    }
                    onShow.call(ctx, value);
                    ctx.__freeze = false;
                };
            }
            ctx.__register = true;
        }

        return options;
    }

    freezeOnShow() {
        getCurrentPages().map(page => {
            if (page.__register) {
                page.__freeze = true;
            }
        })
    }


    compare(Ara, Arb) {
        return Ara.join('@') !== Arb.join('@')
    }




    onRoute(callback) {
        this.__e.on('onRoute', callback);
    }
    offRoute(callback) {
        this.__e.off('onRoute', callback);
    }

}

export default Navigate;
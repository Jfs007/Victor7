
import Define from '../../core/define';
import Url from '../../utils/url';
import Component from '../../core/component';
import { getContext } from '..'


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
        options = this.done({ options, routeFunction: 'switchTab' }, (urlObject) => {
            this.history = [urlObject]
        })
        this.setQuery(options);
        this.define['switchTab'].call(this.__app, options);
    }
    reLaunch(options = {}) {
        options = this.done({ options, routeFunction: 'reLaunch' }, (urlObject) => {
            this.history = [urlObject]
        })
        this.setQuery(options);

        this.define['reLaunch'].call(this.__app, options);
    }
    redirectTo(options = {}) {
        options = this.done({ options, routeFunction: 'redirectTo' }, (urlObject) => {
            this.history.pop();
            this.history.push(urlObject);
        })
        this.setQuery(options);

        this.define['redirectTo'].call(this.__app, options);
    }
    navigateTo(options = {}) {
        options = this.done({ options, routeFunction: 'navigateTo' }, (urlObject) => {
            this.history.push(urlObject);
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
        options = this.done({ options, routeFunction: 'navigateBack' }, (urlObject) => {
            this.history = this.history.slice(0, this.history.length - (options.delta || 1));
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


    getUrlObject(url = '') {
        let route = (url || '').replace(/\?.*/, '');
        return {
            route: route.replace(/^\//, ''),
            options: Url.query(url || '')
        }
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
        let urlObject = null;
        if (!url || routeFunction == 'navigateBack') {
            urlObject = (this.history[this.history.length - 2] || {});
            url = urlObject.route || '';
        }else {
            urlObject = this.getUrlObject(url);
        }
        let path = url.replace(/\?.*/, '');
        let _success = options.success;
        options.success = function (value) {

            done(urlObject, options);
            _success && _success(value);
            if (!navigate.pushRoute) {
                navigate.__e.emit('onRoute', {
                    to: urlObject,
                    from: ctx
                });
                navigate.pushRoute = path.replace(/^\//, '');
            }

            if (!ctx.__register) {
                ctx.onShow = function (value) {
                    let from = navigate.history.slice(-1)[0];
                    let fromRoute = from.route.replace(/^\//, '');
                    if (navigate.pushRoute === fromRoute) {
                        navigate.__e.emit('onRoute', {
                            to: ctx,
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


    onRoute(callback) {
        this.__e.on('onRoute', callback);
    }
    offRoute(callback) {
        this.__e.off('onRoute', callback);
    }
    emitRoute(payload) {
        this.__e.emit('onRoute', payload)
    }

    

}

export default Navigate;

import Navigate from './components/navigate';
import Auth from './components/auth';
import Scene from './components/scene';
import LanuchApp from './components/launchApp';

import Component from '../core/component';

import scope from './scope';

/**
 * Victor 维克托 
 * 加入光荣的进化吧
 * 
 * 为小程序赋能，进化功能
 * 
 */

class VicApp {
    name = 'vic';
    env = null;
    __scope = {

    };
    // 预设组件
    __components = {
        Navigate,
        Auth,
        Scene,
        LanuchApp
    };


    constructor() {
    }
    setup(App) {
        this.app = App;
        this.app[this.name] = this;
        Object.keys(this.__components).map(componentName => {
            this.load(this.__components[componentName]).setup(this);
        });
        return this;

    }
    use(key, value) {
        this[key] = value;
    }
    load(Component) {
        let component = new Component();
        this[component.alias] = component;
        this[component._name] = component;
        component.inject(this);
        return component;
    }

    applyScope(name, value) {
        this.__scope[name] = value;
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

// v2.0弃用
// function changeQuery(options = {}) {
//     let context = getContext();
//     vic.navigate.query = (Object.assign(query(), options || {}));
//     if (context && context.options) {
//         context.options = vic.navigate.query;
//     }
// }

function changeOptions(options) {
    let context = getContext();
    if (context && context.options) {
        context.options = Object.assign(context.options || {}, options);
    }
}


function use(key, value) {
    vic.use(key, value);
}


function register(name, Component) {
    if (vic.__components[name]) return;
    vic.__components[name] = Component;
    vic.load(Component).setup(vic);
}


function matchRoute() {
    let maps = {};
    let isOn = false;
    let on = ({ from, to }) => {
        Object.keys(maps).map(key => {
            // let func = maps[key];

        })

    }
    return {
        onRoute(routeMap = {}) {
            maps = Object.assign(maps, routeMap);
            if (!isOn) {
                vic.navigate.onRoute(on);
                isOn = true;
            };

        }
    }
}

let { onRoute } = matchRoute();

















export {
    // onRoute,
    vic,
    use,
    scope,
    query,
    register,
    Component,
    getContext,
    changeOptions,
}





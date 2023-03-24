
import Navigate from './navigate';
import Auth from './auth';
import Scene from './scene';
import LanuchApp from './launchApp';

import Component from '../core/component';

/**
 * Victor 维克托 
 * 加入光荣的进化吧
 * 
 */

class VicApp {
    name = 'vic';
    env = null;
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

// 只对Page有效 developing
function effect(Page, PageOptions = {}) {
    let { onRoute, onUnload, onShow } = PageOptions;
    let routeFunction = (scope) => {
        onRoute(scope);
    };
    // let isOn = false;
    // PageOptions.onShow = function() {
    //     if(onRoute && !isOn) {
    //         vic.navigate.onRoute(routeFunction.bind(this));
    //         isOn = true;
    //     }
        
    //     onShow && onShow.call(this);
    // }

    // PageOptions.onUnload = function () {
    //     vic.navigate.offRoute(routeFunction.bind(this));
    //     onUnload && onUnload.call(this);
    //     isOn = false;
    // }
    return Page(PageOptions);
}






export {
    // effect,
    register,
    Component,
    // changeQuery,
    changeOptions,
    query,
    getContext,
    vic,
    use

}





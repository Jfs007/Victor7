
import Navigate from './navigate';
import Auth from './auth';
/**
 * Victor 维克托 
 * 加入光荣的进化吧
 * 
 */

class VicApp {
    name = 'vic';
    env = null;
    constructor() {
    }
    setup(App) {
        this.app = App;
        this.app[this.name] = this;
        this.load(Navigate).setup(this.app);
        this.load(Auth);
    }
    use(key, value) {
        this[key] = value;
    }
    load(Component) {
        let component = new Component();
        this[component.alias] = component;
        this[component._name] = component;
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


function changeQuery(options = {}) {
    let context = getContext();
    vic.navigate.query = (Object.assign(query(), options || {}));
    if (context && context.options) {
        context.options = vic.navigate.query;
    }
}

function use(key, value) {
    vic.use(key, value);
}



export {
    changeQuery,
    query,
    vic,
    use

}





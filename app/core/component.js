import Base from "./base";
import { E } from '../utils/e';

class Component extends Base {
    __vic = {};
    __app = {};
    __provide = {};
    __e = new E();
    __config = {};
    constructor() {
        super();
    }

    inject(provide = {}) {
        this.__inject = provide;
    }

    setup(vic) {
       this.__vic = vic;
       this.__app = vic.app;
    }

    config() {
        
    }
}

export default Component
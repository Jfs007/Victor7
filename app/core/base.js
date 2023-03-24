
import Console from './console';
class Base {
    constructor(Vic, ctx) {
        this.console = new Console();
    }
    init(options = {}) {
        for (let key in options) {
            this[key] = options[key];
        }
    }
    setup() {}


}
export default Base;


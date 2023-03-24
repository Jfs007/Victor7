

let callid = 0;


function Call({ name, callback } = options) {
    return {
        once: callback.__once,
        callback,
        id: callback.__id || `${name}-${++callid}`
    }
}

class E {
    __calls = {};


    constructor() {

    }


    on(name, callback) {
        if (!this.__calls[name]) {
            this.__calls[name] = {};
        }
        let call = Call({ name, callback });
        this.__calls[name][call.id] = call;
    }
    off(name, callback) {
        let calls = this.__calls[name];
        if (!calls) return;
        if (callback) {
            Object.keys(calls).find(id => {
                let call = calls[id];
                if (callback == call.callback) {
                    delete this.__calls[name][id];
                    return true;
                }
            })

        } else {
            this.__calls[name] = {}
        }
    }
    emit(name, payload) {
        let calls = this.__calls[name];
        if (!calls) return;
        Object.keys(calls).map(id => {
            let call = calls[id];
            call.callback(payload);
            if (call.__once) {
                this.off(name, call.callback);
            }
        })
    }
    once(name, callback) {
        callback.__once = true;
        this.on(name, callback);
    }
}

export { 
    E
}
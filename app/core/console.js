class Console {
    constructor() {

    }
    log(info) {
        console.log('\x1B[32m', info);
    }
    error(info) {
        return console.log(new Error(info))
    }
    warn(info) {
        console.log('\x1B[33m', info);
    }
}
export default Console
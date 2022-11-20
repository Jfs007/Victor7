
function define(app, keys) {
    let define = {};
    keys.map(key => {
        define[key] = app[key];
    });
    return define;
}

export default { define };
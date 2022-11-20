function object(str) {
    let define = str.split(/\n|\r|\r\n/g);
    let activeDefine = define.filter(_ => {
        let trim = _.trim();
        return trim && trim.indexOf('#') < 0;
    })
    let _varArray = activeDefine.map(v => v.split('=').map(_ => _.trim()));
    _varArray = _varArray.map(v => {
        let [key, value] = v;
        value = value.replace(/\"|\'/g, "");
        return [key, value];
    })
    let _var = Object.fromEntries(_varArray);
    return _var;

}

module.exports = {
    object
}

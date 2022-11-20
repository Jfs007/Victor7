let promisify = (func) => {
    function ify(...args) {
        return new Promise((resolve, reject) => {


            args.push(function (error, value) {
                if (error) {
                    reject(error)
                } else {
                    resolve(value === undefined ? true : value);
                }
            });
            return func(...args);

        });
    }
    return ify;

}

module.exports = { promisify };



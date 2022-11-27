let promisify = require('./promisify');
let fs = require('fs');
let {
    resolve
} = require('path');

function File({ content = '', error = false, message = '' } = options) {
    return {
        content,
        error: error === undefined ? false : error,
        message
    }
}


function Resolve(root, pts = []) {
    if (typeof pts == 'string') {
        pts = [pts];
    }

    pts.unshift(root);
    return resolve(...pts);
}


async function read({ path, options, root = __dirname }) {
    try {
        let content = await promisify.nodejs(fs.readFile)(Resolve(root, path), Object.assign({
            encoding: 'utf-8'
        }, options || {}));
        return File({ content })

    } catch (error) {
        return File({ content: null, error: true, message: error })
    }

}

async function write({ path, content, root = __dirname }) {
    try {
        let _content = await promisify.nodejs(fs.writeFile)(Resolve(root, path), content);
        return File({ content: _content })
    } catch (error) {
        return File({ content, error: true, message: error })
    }
}
async function readdir({ path, root = __dirname }) {
    try {
        let files = await promisify.nodejs(fs.readdir)(Resolve(root, path));
        return File({ content: files });
    } catch (error) {
        return File({ content: null, error: true, message: error })
    }
}

async function stat({ path, root = __dirname }) {
    try {
        let stat = await promisify.nodejs(fs.stat)(Resolve(root, path));
       
        return File({ content: stat });
    } catch (error) {
        return File({ content: null, error: true, message: error })
    }
}

function type({ path }) {
    let match = path.match(/\..*$/);
    if (match) {
        return File({ content: match[0].split(".").slice(-1)[0] });
    }
    return File();
}

function name({ path }) {
    let url = path.replace(/.*\/(.*\..*)$/gi, "$1");
    return File({ content: url, })
}







module.exports = { read, write, readdir, Resolve, stat, type, name };


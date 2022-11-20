let { promisify } = require('./promisify');
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
    if(typeof pts == 'string') {
        pts = [pts];
    }
    
    pts.unshift(root);
    return resolve(...pts);
}


async function read({ path, options, root = __dirname }) {
    try {
        let content = await promisify(fs.readFile)(Resolve(root, path), Object.assign({
            encoding: 'utf-8'
        }, options || {}));
        return File({ content })

    } catch (error) {
        return File({ content: null, error: true, message: error })
    }

}

async function write({ path, content, root = __dirname }) {
    try {
        let _content = await promisify(fs.writeFile)(Resolve(root, path), content);
        return File({ content: _content })
    } catch (error) {
        return File({ content, error: true ,message: error})
    }
}
async function readdir({path, root = __dirname }) {
    try {
        let files = await promisify(fs.readdir)(Resolve(root, path));
        return File({ content: files });
    } catch(error) {
        return File({ content: null, error: true, message: error })
    }
}


module.exports = { read, write, readdir, Resolve };


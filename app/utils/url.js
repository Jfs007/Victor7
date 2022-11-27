function query(url) {
    let m = url.match(/.*(\?.*)/);
    if (m) {
        url = m[1];
    }
    const re = /(\w+)=?([^=&]+)?&?/g;
    let json = {};

    url.replace(re, function (x1, x2, x3) {
        json[x2] = x3 ? (x3.trim()) : ''
    })
    return json;
}

function toSearch(query) {
    let search = '';
    Object.keys(query).map(key => {
        let value = query[key];
        let _ = search ? '&' : '?';
        search+= `${_}${key}=${value}` 
    });
    return search;
}


export default {
    query,
    toSearch
}
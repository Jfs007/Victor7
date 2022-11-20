function query(url) {
    let m = url.match(/.*(\?.*)/);
    if (m) {
        url = m[1];
    }
    const re = /(\w+)=?([^=&]+)?&?/g;
    let json = {};

    url.replace(re, function (x1, x2, x3) {
        json[x2] = x3 ? escape(x3.trim()) : ''
    })
    return json;
}
export default {
    query
}
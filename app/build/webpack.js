const path = require('path');

//导出配置信息
module.exports = {
  entry: "./vic/index.js",
  
  output: {
    library: {
        name: 'vicApp',
        type: 'umd',
    },
    path: path.resolve(__dirname, "../dist"),
    filename: "index.js"
  }
}

const path = require('path');

//导出配置信息
module.exports = {
  entry: "./vic/index.js",
  
  output: {
    library: {
        name: 'vicApp',
        type: 'umd',
    },
    // 需要自己创建小程序项目weapp vic为打包目录
    path: path.resolve(__dirname, "../weapp/vic"),
    filename: "index.js"
  }
}

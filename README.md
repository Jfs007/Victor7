# victor7
加入光荣的进化吧！victor7做的事情是针对小程序等一些没有环境变量的开发框架来提供环境变量

> 项目托管于github具体可查看[victor7](https://github.com/Jfs007/Victor7)。

### 使用方法

全局安装victor7。

```shell
npm install victor7 -g
```
在项目根目录创建env文件夹，env下创建你需要配置的环境文件 如.env.develop
```
env
	 .env.p
	 .env.develop
// 文件语法如下 以key = value形式 #开头表示注释 换行为一个变量
BASE_API = 'http://172.28.200.4:9501/'
#NOWORK = '1'
```
运行命令将在env下创建index.js文件，在需要用到变量的地方引入即可
```shell
	victor cenv develop
```

一些命令概述
```shell
  // 用于自定义env文件名称
	victor config envPackage env2 
```


v1.0到此为止. 2023.3.20


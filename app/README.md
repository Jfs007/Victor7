# vic-app
vic-app隶属于victor7

> victor7托管于github具体可查看[victor7](https://github.com/Jfs007/Victor7)。 vic-app位于victor7/app目录下

### 使用方法

安装victor7。

```shell
npm install vic-app --save
```
体验该代码片段前，需要先安装并构建相对应的 npm 包。
在app.js引入vic-app
```shell
import { vic } from 'vic-app';
// 准备工作
vic.setup(wx);
```
包详解
```shell
import { use, query, changeQuery } from 'vic-app';

// use 为你的vic添加上属性
// query() 返回当前页面的页面query
// changeQuery(q) 改变当前页面的query
```









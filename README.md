<h1 align="center">well-cache</h1>
<p align="center">一个高效，快捷，使用简单的前端数据本地缓存插件</p>
<p align='center'>
<img alt="npm" src="https://img.shields.io/npm/v/well-cache">
<a href="https://www.npmjs.com/package/well-cache" target="_blank"><img alt="npm" src="https://img.shields.io/npm/dm/well-cache?label=download"></a>
<img alt="NPM" src="https://img.shields.io/npm/l/well-cache">
<img alt="CircleCI" src="https://img.shields.io/circleci/build/github/Ncnbb/well-cache/master">
</p>

# Description

随着前端页面越来越精细和业务的复杂度日益增加，数据量往往会以几何速度增长，当我们使用传统的localStorage和SessionStorage的时候，很容易会遇到存储容量已满的情况，这个时候我们或许可以依赖自己App给webview提供接口，使用App的特殊本地储存空间，但是解决不了在浏览器的限制，一般浏览器的localStorage和SessionStorage在4MB左右，不同浏览器的容量不一样。但是当我们要存储的数据过大或者同一个域名下多个页面都需要localStorage和SessionStorage的时候，很有可能就会出现储存空间已满的情况。所以HTML5为我们提供了[indexDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)的本地存储机制，有效的为我们解决了存储空间不足的问题。

well-cahce并不是一个操作indexDB的库，well-cache是一个本地存储中间件，为我们优先使用indexDB进行存储，如果遇到浏览器不支持indexDB的情况下，会降级使用localStorage，你也可以手动指定存储方式。

# Getting started

well-cache的使用非常简单，只有5个方式，初始化well-cache实例，save、get、has和remove。

每个well-cache都需要实例化：

```JavaScript
import WellCache from 'WellCache';
const wcache = new WellCache(<option>);
```
### option

| 属性   | 说明             | 类型   | 默认值         |
| ------ | ---------------- | ------ | -------------- |
| prefix | 储存标识         | string | 'wc'           |
| mode   | 手动指定存储方式('IDB' \| 'ss' \| 'ls') | string | 根据浏览器选择 |

## API save

为了确保返回统一，建议只使用字符串和对象的形式进行存储

save( key: string, data: string | object, callback?: Function )

saveSync( key: string, data: string | object )
- key - 索引字段
- data - 存储数据
- callback - 回调函数

``` JavaScript
// 异步
wcache.save('123', {id: 123, data: '1231'}, (result) => {
    // todo
});

// 同步
const result = await wcache.saveSync('123', {id: 123, data: '1231'});

// 返回值
// {
//     "name":"wc-123",
//     "isOk":true | false
// }
```

## API get

获取对应key的数据

get( key: string, conditions?: object, callback?: Function )

getSync( key: string, conditions?: object)

- key - 索引字段
- conditions - 查询条件
- callback - 回调函数


使用conditions进行查询，实际上是将缓存结果查询出来后，循环对比结果与传入的conditions里的每一个值是否相等。

`查询后需要判断isOK和data是否有值，如果查询成功，但是并没有找到对应数据，那么data为null`

``` JavaScript
// 异步
wcache.get('123', {id: 123},  (result) => {
   // todo
});
// 同步
const result = await wcache.getSync('123', {id: 123});

// 返回值
// {
//    "isOk":true,
//    "data":{"id":123,"data":"1231"}
// }
```

## API has

has( key: string, conditions?: object, callback?: Function )

hasSync( key: string, conditions?: object)

- key - 索引字段
- conditions - 查询条件
- callback - 回调函数

判断是否有数据

``` JavaScript
// 异步
wcache.has('123', {id: 123},  (result) => {
    // todo
});
// 同步
const result = await wcache.has('123', {id: 123});

// 返回值
// true | false
```

## API remove

remove( key: string, callback?: Function )

remove( key: string )

- key - 索引字段
- callback - 回调函数

删除缓存数据

``` JavaScript
// 异步
wcache.remove('123', (result) => {
    // todo
});
// 同步
const result = await wcache.removeSync('123');

// 返回值
// {"isOk":true | false}
```



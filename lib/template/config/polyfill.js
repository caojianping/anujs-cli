require('object-defineproperty-ie8');
require('object-create-ie8');
require('console-polyfill');

// babel-polyfill将ES6代码转换成ES5代码，大部分特性语法babel可直接转换成ES5标准（除了下面这些特性等）；
// 比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，
// 以及一些定义在全局对象上的方法（比如Object.assign）
require('babel-polyfill');
// window.Promise = require('bluebird');
Object.is = require('object-is');
Object.assign = require('object-assign');

// 低版本浏览器<IE9不支持ES5新特性，es5-shim使用ES3实现ES5新特性
require('es5-shim');
require('es5-shim/es5-sham');
require('json3');// json库

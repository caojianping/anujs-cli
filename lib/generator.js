/***
 * @file:
 * @author: caojianping
 * @Date: 2023-04-06 11:29:53
 */

const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');

/**
 * 生成器
 * @param {*} metadata 元数据
 * @param {*} source 源路径
 * @param {*} dest 目标路径
 * @returns void
 */
module.exports = function (metadata, source, dest = '.') {
  if (!metadata) return Promise.reject(new Error(`无效的元数据[metadata]：${metadata}`));
  if (!source) return Promise.reject(new Error(`无效的源路径[source]：${source}`));

  return new Promise((resolve, reject) => {
    Metalsmith(process.cwd())
      .metadata(metadata)
      .clean(false)
      .source(source)
      .destination(dest)
      .use((files, metalsmith, done) => {
        const meta = metalsmith.metadata();
        Object.keys(files).forEach((key) => {
          const value = files[key].contents.toString();
          if (key === 'package.json') {
            files[key].contents = new Buffer(Handlebars.compile(value)(meta));
          }
        });
        done();
      })
      .build((err) => (err ? reject(err) : resolve()));
  });
};

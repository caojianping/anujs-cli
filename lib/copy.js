/***
 * @file:
 * @author: caojianping
 * @Date: 2023-04-06 11:29:53
 */

const fs = require('fs');
const path = require('path');

/**
 * 复制
 * @param {*} source 源路径
 * @param {*} dest 目标路径
 * @returns 返回操作结果
 */
module.exports = function copy(source, dest) {
  if (!source) return false;

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  let files = fs.readdirSync(source);
  files.forEach((file) => {
    let filePath = path.join(source, file),
      fileInfo = fs.statSync(filePath);
    if (fileInfo.isFile()) {
      fs.copyFileSync(filePath, path.join(dest, file));
    } else if (fileInfo.isDirectory()) {
      copy(filePath, path.join(dest, file));
    }
  });
  return true;
};

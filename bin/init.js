/***
 * @file:
 * @author: caojianping
 * @Date: 2023-04-06 11:29:53
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const inquirer = require('inquirer');
const chalk = require('chalk');
const logSymbols = require('log-symbols');
const co = require('co');

const copy = require('../lib/copy');
const generator = require('../lib/generator');
const templatePath = path.join(__dirname, '../lib/template');

/**
 * 预处理项目名称
 * @param {*} projectName 项目名称
 * @returns 返回操作结果
 */
function pretreatProjectName(projectName) {
  // 遍历当前目录
  let rootName = path.basename(process.cwd()),
    list = glob.sync('*');
  if (list.length) {
    let isExist =
      list.filter((name) => {
        const fileName = path.resolve(process.cwd(), path.join('.', name));
        const isDir = fs.statSync(fileName).isDirectory();
        return name.indexOf(projectName) !== -1 && isDir;
      }).length !== 0;
    if (isExist) {
      // projectName目录已经存在，进行提示
      console.log(logSymbols.error, `项目${projectName}已经存在`);
      return Promise.resolve(null);
    }
    return Promise.resolve(projectName);
  } else if (rootName === projectName) {
    // 当前目录与projectName相同，则在当前目录创建工程
    return inquirer
      .prompt([
        {
          name: 'buildCurrent',
          message: '当前目录为空，并且目录名称和项目名称一致，是否直接在当前目录创建新项目？',
          type: 'confirm',
          default: true,
        },
      ])
      .then((answer) => Promise.resolve(answer.buildCurrent ? '.' : projectName));
  } else {
    // 创建以projectName作为名称的目录作为工程根目录
    return Promise.resolve(projectName);
  }
}

/**
 * 初始化
 * @param {*} projectName 项目名称
 * @returns 返回操作结果
 */
module.exports = function init(projectName) {
  return co(function* () {
    console.log(logSymbols.success, chalk.green(`创建初始化: ${projectName}`));
    let name = yield pretreatProjectName(projectName);
    copy(templatePath, name);

    let answers = yield inquirer.prompt([
      {
        name: 'projectName',
        message: '项目名称',
        default: name,
      },
      {
        name: 'projectVersion',
        message: '项目版本号',
        default: '1.0.0',
      },
      {
        name: 'projectDescription',
        message: '项目简介',
        default: `A project named ${name}`,
      },
    ]);
    yield generator(answers, templatePath, name);

    console.log(logSymbols.success, chalk.green('创建成功:)'));
    console.log(chalk.green('cd ' + projectName));
    console.log(chalk.green('npm install or yarn install'));
    console.log(chalk.green('npm run build'));
  }).catch((err) => console.log(logSymbols.error, `anujs-cli err: ${err}`));
};

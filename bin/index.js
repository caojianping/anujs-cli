#!/usr/bin/env node

var program = require('commander'),
    package = require('../package.json'),
    init = require('./init');

program.version(package.version, '-v, --version').usage('<command> [options]');

program
    .command('init <project-name>')
    .description('初始化新项目')
    .alias('i')
    .action(function(projectName) {
        init(projectName);
    });

program.parse(process.argv);

if (program.args && program.args.length == 0) {
    program.help();
    return;
}

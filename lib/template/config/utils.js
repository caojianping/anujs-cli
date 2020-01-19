const fs = require('fs');
const path = require('path');

module.exports = {
    resolvePath: function (relativePath) {
        let rootPath = fs.realpathSync(process.cwd());
        return path.resolve(rootPath, relativePath);
    }
};

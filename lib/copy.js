const fs = require('fs');
const path = require('path');

module.exports = function copy(source, dest) {
    if (!source) return false;

    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    let files = fs.readdirSync(source);
    files.forEach(file => {
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

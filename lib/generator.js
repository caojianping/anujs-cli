const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');

module.exports = function(metadata, src, dest = '.') {
    if (!metadata)
        return Promise.reject(new Error(`无效的元数据[metadata]：${metadata}`));
    if (!src) return Promise.reject(new Error(`无效的源路径[source]：${src}`));

    return new Promise((resolve, reject) => {
        Metalsmith(process.cwd())
            .metadata(metadata)
            .clean(false)
            .source(src)
            .destination(dest)
            .use((files, metalsmith, done) => {
                const meta = metalsmith.metadata();
                Object.keys(files).forEach(key => {
                    const value = files[key].contents.toString();
                    if (key === 'package.json') {
                        files[key].contents = new Buffer(
                            Handlebars.compile(value)(meta)
                        );
                    }
                });
                done();
            })
            .build(err => (err ? reject(err) : resolve()));
    });
};

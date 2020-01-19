const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const utils = require('./utils');

module.exports = {
    entry: {
        polyfill: utils.resolvePath('config/polyfill.js'),
        index: utils.resolvePath('src/index.tsx')
    },
    output: {
        path: utils.resolvePath('dist'),
        filename: 'js/[name]_[hash:8].js',
        publicPath: './'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', 'less', 'css'],
        alias: {
            'react': 'anujs/dist/ReactIE.js',
            'react-dom': 'anujs/dist/ReactIE.js',
            'reach-router': 'anujs/dist/Router.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'source-map-loader',
                enforce: 'pre',
                include: utils.resolvePath('src')
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015-loose', 'react'],
                        plugins: [
                            'transform-class-properties',
                            [
                                'transform-es2015-classes',
                                {
                                    loose: true
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: utils.resolvePath('node_modules'),
                include: utils.resolvePath('src')
            },
            {
                test: /\.(css|less)$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '../',// 这个配置很重要，不配置的话，url-loader打包的图片在css的background设置下路径将出问题
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [require('autoprefixer')({browsers: ['last 5 versions']})]
                            }
                        },
                        {loader: 'less-loader'}
                    ]
                })
            },
            {
                test: /\.(jpe?g|gif|png|bmp|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,// 低于指定limit大小的图片会进行base64加密
                            name: '[name]_[hash:8].[ext]',
                            outputPath: 'imgs'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                            outputPath: 'fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: utils.resolvePath('public'),
                to: utils.resolvePath('dist'),
                ignore: ['index.html']
            }
        ]),
        new ExtractTextWebpackPlugin({filename: 'css/[name]_[md5:contenthash:hex:8].css'})
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};

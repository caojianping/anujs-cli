const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base');
const utils = require('./utils');

module.exports = merge(base, {
    devtool: 'cheap-module-source-map',
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: utils.resolvePath('public/index.html'),
            inject: true
        })
    ],
    devServer: {
        contentBase: utils.resolvePath('dist'),
        port: 9999,
        hot: true,
        open: true,
        publicPath: '/'
    },
    performance: {
        hints: false
    }
});

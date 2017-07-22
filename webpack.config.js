/**
 * Created by wuxinzhe on 2017/7/10.
 */
var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'post',
                loader: 'es3ify-loader'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: [
                        "transform-es3-property-literals",
                        "transform-es3-member-expression-literals",
                    ]
                },
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules!postcss-loader',
            }, {
                test: /\.html$/,
                loader: "art-template-loader",
            }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                properties: false,
                warnings: false
            },
            output: {
                beautify: true,
                quote_keys: true
            },
            mangle: {
                screw_ie8: false
            },
            sourceMap: false
        }),
        new openBrowserPlugin({
            url: 'http://localhost:8081'
        }),
    ],
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 8080
    }
};
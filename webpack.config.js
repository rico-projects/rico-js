const fs = require("fs");
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const banner = fs.readFileSync('./banner.txt', "utf8");

function config(env) {

    const confEnv = env || { dev: false }
    console.log('Build configuration', confEnv);

    const confPlugins = [
        new webpack.DefinePlugin({
            RICO_VERSION: JSON.stringify(require("./package.json").version),
            RICO_WORKER: '"' + fs.readFileSync('./src/http/worker.js', 'utf8').replace(/(\r\n|\n|\r)/gm,'') + '"'
        }),
        new webpack.BannerPlugin(banner)
    ]

    if (confEnv.dev) {
        confPlugins.push(new webpack.HotModuleReplacementPlugin());
    }

    return {
        entry: {
            'rico': './src/index.js',
            'rico.min': './src/index.js'
        },
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
            library: 'ricojs',
            libraryTarget: 'umd'
        },
        devServer: {
            contentBase: path.join(__dirname, "./test"),
            index: 'index.html',
            port: 8080,
            publicPath: "/dist/",
            hot: true
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json']
        },
        module: {
            rules: [{
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            }],
        },
        optimization: {
            minimizer: [
            new UglifyJsPlugin({
                test:/\.min\.js$/i,
                sourceMap: true
            }),
            ],
        },
        plugins: confPlugins
    }
};

module.exports = config;
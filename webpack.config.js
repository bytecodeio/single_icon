let path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let webpackConfig = {
    mode: 'production',
    entry: {
        sparkline: './src/visualizations/sparkline.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
        library: '[name]',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.js', '.scss', '.css']
    },
    plugins: [
        new UglifyJSPlugin(),
    ],
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.css$/, loader: ['to-string-loader', 'css-loader'] },
            { test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                },
            }
        ],
    },
    devServer: {
        host: 'colin.looker.com',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
        },
        disableHostCheck: true,
        allowedHosts: ['.looker.com'],
        contentBase: false,
        compress: true,
        port: 3443,
        https: true
    },
    devtool: 'eval',
    watch: true
};

module.exports = webpackConfig;

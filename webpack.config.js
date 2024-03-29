let path = require('path');

let webpackConfig = {
    mode: 'development',
    entry: {
        single_icon: './src/visualizations/single_icon.js'
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
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' },
            { test: /\.css$/, use: ['to-string-loader', 'css-loader'] },
            { test: /\.(woff|woff2)$/, use:  'url-loader'},
        ],
    },
    devServer: {
        static: "./dist",
        port: 8080,
        https: true,
    },
    devtool: 'source-map',
};

module.exports = webpackConfig;

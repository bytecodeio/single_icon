let path = require('path');

let webpackConfig = {
    mode: 'production',
    entry: {
        single_icon: './src/visualizations/single_icon.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader' },
            { test: /\.css$/, use: ['to-string-loader', 'css-loader'] },
            { test: /\.(woff|woff2)$/, use:  'url-loader'},
        ],
    },
};

module.exports = webpackConfig;

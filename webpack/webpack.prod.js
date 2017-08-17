const ShakePlugin = require('webpack-common-shake').Plugin;
const webpack = require('webpack');

const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    entry: [
        './lib/es6/src/main.js',
    ],
    devtool: false,
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                warnings: false,
                screw_ie8: true
            },
            comments: false,
            sourceMap: false
        }),
        new ShakePlugin(), // https://github.com/indutny/webpack-common-shake/issues/16
    ]
})
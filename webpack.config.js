'use strict'
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/nebert/Js');
var APP_DIR = path.resolve(__dirname, 'src');

const entry = path.join(__dirname, 'src');

module.exports = {
    entry: APP_DIR + '/index.jsx',
    output: {
        path: BUILD_DIR,
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
            { test: /\.jsx$/, include: APP_DIR, loader: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
            { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })},
            { test: /\.json$/, loader: 'json' },    
            { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader' ,'less-loader']})},       
            { test: /\.(jpg|png|gif|svg)$/, loader: 'url-loader', options: { limit: 25000 } },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },

    devServer: {
         historyApiFallback: true,         
    },
    plugins: [
               new ExtractTextPlugin("[name].css")
    ]
}

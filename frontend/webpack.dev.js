const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

const devConfig = {
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    port: 9000,
    contentBase: './dist'
  }
};

module.exports = merge(common, devConfig);

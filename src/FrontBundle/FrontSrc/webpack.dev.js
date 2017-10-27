const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const devConfig = {
  output: {
    path: 'dist',
    publicPath: '/',
    filename: 'js/bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './dist'
  }
};

module.exports = merge(common, devConfig);
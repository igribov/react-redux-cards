const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common.js');

const prodConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'public/js/bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin()
  ]
};

module.exports = merge(common, prodConfig);
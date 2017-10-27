const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common.js');
const resourceDir = path.resolve(path.join(__dirname, '..', 'Resources', 'public'));

const prodConfig = {
  output: {
    path: resourceDir,
    publicPath: '/',
    filename: 'js/bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin()
  ]
};

module.exports = merge(common, prodConfig);
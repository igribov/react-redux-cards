const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = require('./webpack.common.js');
const resourceDir = path.resolve(path.join(__dirname, '..', 'web'));

const prodConfig = {
  output: {
    path: resourceDir,
    publicPath: '/public/',
    filename: 'public/js/bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
        template: 'src/templates/index.pug',
        hash: true
    }),
    new UglifyJSPlugin()
  ]
};

module.exports = merge(common, prodConfig);
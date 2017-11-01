const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const api_arg = process.argv.indexOf("--api_host");
// todo move it to define plugin
const API_HOST = (api_arg > -1 ? process.argv[api_arg + 1] : false) || process.env.HEROKU_URL || 'http://localhost:8080';
//const API_HOST = (api_arg > -1 ? process.argv[api_arg + 1] : false) || 'http://localhost:8000';
console.log('API_HOST -> ', API_HOST);

module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx','.css', '.styl', '.pug']
  },
  plugins: [
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify(API_HOST)
    }),
    new HtmlWebpackPlugin({
        template: 'src/templates/index.pug',
        hash: true
    }),
    new ExtractTextPlugin("public/css/bundle.css")
  ]
};

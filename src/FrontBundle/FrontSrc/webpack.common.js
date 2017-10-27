const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const api_arg = process.argv.indexOf("--api_host");
const API_HOST = (api_arg > -1 ? process.argv[api_arg + 1] : false) || 'https://young-shelf-87369.herokuapp.com';

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
    new ExtractTextPlugin("css/bundle.css")
  ]
};

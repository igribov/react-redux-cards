const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const api_arg = process.argv.indexOf("--api_host");
let API_HOST = (api_arg > -1 ? process.argv[api_arg + 1] : false) || process.env.HEROKU_URL || 'http://localhost:8080';
API_HOST = API_HOST.endsWith('/') ? API_HOST.substr(0, API_HOST.length - 1) : API_HOST;


console.log('API_HOST -> ', API_HOST);

module.exports = {
  entry: {
    'main': './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'public/js/[name].js'
  },
  module: {
    /*preLoaders: [
        {
          test: /\.(js|jsx)?$/,
          loader: 'eslint',
          exclude: /node_modules/
        }
    ],*/
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
  eslint: {
    failOnWarning: true,
    failOnError: true
  },
  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, 'src/sw.js'),
    }),
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify(API_HOST)
    }),
    new HtmlWebpackPlugin({
        template: 'src/templates/index.pug',
        hash: true,
        excludeChunks: ['sw']
    }),
    new ExtractTextPlugin("public/css/bundle.css")
  ]
};

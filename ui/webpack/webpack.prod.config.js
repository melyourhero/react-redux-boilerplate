const config = require('./webpack.common.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

config.mode = 'production';
config.output.publicPath = '';

config.module.rules = config.module.rules.concat([
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          cacheDirectory: 'build/.awcache',
          useCache: true,
        },
      },
    ],
  }
]);

config.plugins = config.plugins.concat([
  new OptimizeCSSAssetsPlugin({}),
  new HtmlWebpackPlugin({
    inject: false,
    template: require('html-webpack-template'),
    filename: '../index.template',
    title: 'Boilerplate app',
    appMountId: 'root'
  }),
]);

module.exports = config;

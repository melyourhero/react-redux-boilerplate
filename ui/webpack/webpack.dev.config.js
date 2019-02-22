/* global require*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const config = require('./webpack.common.config');

config.mode = 'development';

config.devServer = {
  contentBase: path.resolve('./build/resources/static'),
  port: 3000,
  historyApiFallback: true,
  stats: 'minimal',
  hotOnly: true,
};

config.devtool = 'source-map';

config.module.rules = config.module.rules.concat([
  {
    enforce: 'pre',
    test:  /\.tsx?$/,
    include: /src/,
    use: [
      {
        loader: 'tslint-loader',
        options: {
          formatter: 'stylish'
        },
      },
    ],
  },
  {
    test: /\.(ts|tsx)$/,
    include: /src/,
    use: [
      {
        loader: 'awesome-typescript-loader',
        options: {
          cacheDirectory: 'build/.awcache',
          // As an experimental attempt probalby after removing react-hot loader from babel
          // this is not needed anymore
          // useBabel: true,
          useCache: true,
        }
      },
    ]
  }
]);

config.plugins = config.plugins.concat([
  new HtmlWebpackPlugin({
    inject: false,
    template: require('html-webpack-template'),
    title: 'Boilerplate app',
    appMountId: 'root'
  }),
  new CircularDependencyPlugin({
    // exclude detection of files based on a RegExp
    exclude: /node_modules/,
    // add errors to webpack instead of warnings
    failOnError: true,
    // allow import cycles that include an asyncronous import,
    // e.g. via import(/* webpackMode: "weak" */ './file.js')
    allowAsyncCycles: false,
    // set the current working directory for displaying module paths
    cwd: process.cwd(),
  }),
]);

config.resolve.alias = {
  'react-dom': '@hot-loader/react-dom',
};

module.exports = config;

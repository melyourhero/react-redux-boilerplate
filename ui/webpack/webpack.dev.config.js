/* global require*/
const config = require('./webpack.common.config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

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
    loader: 'tslint-loader',
    options: {
      // type info introduce big delay during dev compilation
      // typeCheck: true,
      // tsConfigFile: path.join(__dirname, '../tsconfig.json'),
      formatter: 'stylish'
    }
  },
  {
    test: /\.tsx?$/,
    include: /(src)/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: "last 2 versions",
                },
              },
            ],
            "@babel/preset-typescript",
            "@babel/preset-react"
          ],
          plugins: [
            ["@babel/plugin-proposal-class-properties", { loose: true }],
            "react-hot-loader/babel",
          ]
        },
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

var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';

var metadata = {
  title: 'Fingertips',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV
};
/*
 * Config
 */
module.exports = {
  metadata: metadata,
  devtool: 'source-map',
  debug: true,
  entry: {
    'polyfills': './app/scripts/polyfills.ts',
    'boot': './app/scripts/boot.ts'
  },

  output: {
    path: root('./public'),
    filename: 'scripts/[name].bundle.js',
    sourceMapFilename: 'scripts/[name].map',
    chunkFilename: 'scripts/[id].chunk.js'
  },


  resolve: {
    extensions: prepend(['.ts','.js','.json','.css','.html'], '.async')
  },

  module: {
    preLoaders: [
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ root('node_modules') ] },
      // TODO(gdi2290): `exclude: [ root('node_modules/rxjs') ]` fixed with rxjs 5 beta.2 release
      { test: /\.js$/, loader: "source-map-loader", exclude: [ root('node_modules/rxjs') ] }
    ],
    loaders: [
      { test: /\.async\.ts$/, loaders: ['es6-promise-loader', 'ts-loader'], exclude: [ /\.(spec|e2e)\.ts$/ ] },

      { test: /\.ts$/, loader: 'ts-loader', exclude: [ /\.(spec|e2e|async)\.ts$/ ] },

      { test: /\.json$/,  loader: 'json-loader' },

      { test: /\.css$/,   loader: 'raw-loader' },

      { test: /\.html$/,  loader: 'raw-loader' }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'polyfills',
      filename: 'scripts/polyfills.bundle.js',
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([
      {from: 'app/images', to: 'images'},
      {from: 'app/styles', to: 'styles'},
      {from: 'app/views', to: 'views'}
    ]),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    })
  ],

  devServer: {
    port: metadata.port,
    host: metadata.host,
    // contentBase: 'src/',
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },

  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};

// Helper functions

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function prepend(extensions, args) {
  args = args || [];
  if (!Array.isArray(args)) { args = [args] }
  return extensions.reduce(function(memo, val) {
    return memo.concat(val, args.map(function(prefix) {
      return prefix + val
    }));
  }, ['']);
}
function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}

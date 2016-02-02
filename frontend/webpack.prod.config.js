var path = require('path');
var zlib = require('zlib');

var webpack = require('webpack');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash    = require('webpack-md5-hash');
var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 8080;

var metadata = {
  title: 'Fingertips',
  baseUrl: '/',
  host: HOST,
  port: PORT,
  ENV: ENV
};

/*
 * Config
 */
module.exports = {
  metadata: metadata,
  devtool: 'source-map',
  debug: false,

  entry: {
    'polyfills':'./app/scripts/polyfills.ts',
    'boot':'./app/scripts/boot.ts'
  },

  output: {
    path: root('public'),
    filename: 'scripts/[name].[chunkhash].bundle.js',
    sourceMapFilename: 'scripts/[name].[chunkhash].bundle.map',
    chunkFilename: 'scripts/[id].[chunkhash].chunk.js'
  },

  resolve: {
    cache: false,
    extensions: prepend(['.ts','.js','.json','.css','.html'], '.async')
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          'compilerOptions': {
            'removeComments': true,
            'noEmitHelpers': true,
          }
        }
      },

      { test: /\.json$/,  loader: 'json-loader' },
      { test: /\.css$/,   loader: 'raw-loader' },
      { test: /\.html$/,  loader: 'raw-loader' }
    ]
  },

  plugins: [
    new WebpackMd5Hash(),
    new DedupePlugin(),
    new OccurenceOrderPlugin(true),
    new CommonsChunkPlugin({
      name: 'polyfills',
      filename: 'scripts/polyfills.[chunkhash].bundle.js',
      chunks: Infinity
    }),

    new CopyWebpackPlugin([
      {from: 'app/images', to: 'images'},
      {from: 'app/styles', to: 'styles'},
      {from: 'app/views', to: 'views'}
    ]),
    // generating html
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new DefinePlugin({
      // Environment helpers
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    }),
    new ProvidePlugin({
      // TypeScript helpers
      '__metadata': 'ts-helper/metadata',
      '__decorate': 'ts-helper/decorate',
      '__awaiter': 'ts-helper/awaiter',
      '__extends': 'ts-helper/extends',
      '__param': 'ts-helper/param',
      'Reflect': 'es7-reflect-metadata/src/global/browser'
    }),
    new UglifyJsPlugin({
      beautify: false,
      // disable mangling because of a bug in angular2 beta.1 and beta.2
      // TODO(mastertinner): enable mangling as soon as angular2 beta.3 is out
      // mangle: { screw_ie8 : true },
      mangle: false,
      comments: false,
      compress : { screw_ie8 : true}

    }),

    new CompressionPlugin({
      algorithm: gzipMaxLevel,
      regExp: /\.css$|\.html$|\.js$|\.map$/,
      threshold: 2 * 1024
    })
  ],

  tslint: {
    emitErrors: true,
    failOnHint: true
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
function gzipMaxLevel(buffer, callback) {
  return zlib['gzip'](buffer, {level: 9}, callback)
}

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
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

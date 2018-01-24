const path = require('path')
  , webpack = require('webpack')
  , HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: path.resolve('./app'),

  entry: path.resolve('./app/index.js'),

  output: {
    path: path.resolve('../dist'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },

  devServer: {
    port: 9001,
    contentBase: path.resolve('../dist'),
    compress: false,
    watchOptions: {
      poll: 500
    },
    proxy: {
      '/api': 'http://127.0.0.1:9000'
    }
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }, {
        test: /\.(css)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }]
      }, {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('app/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};

module.exports = config;
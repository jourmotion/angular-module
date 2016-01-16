var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',
  entry: './AngularModule.js',
  output: {
    path: __dirname + '/dist',
    filename: 'AngularModule.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'] }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};

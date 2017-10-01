var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'lib')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['stage-0', 'es2015', 'react'],
            plugins: [
              ["transform-es2015-classes"],
              ["transform-class-properties"]
            ]
          }
        }
      }
    ]
  }
}
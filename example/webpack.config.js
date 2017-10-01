var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, '..'),
    compress: true,
    port: 9001
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, path.resolve(__dirname, "../lib"),],
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
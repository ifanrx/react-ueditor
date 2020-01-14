const path = require('path')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
console.log('__dirname***********************', __dirname)
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// /home/kongyu/Documents/ProjectCC/react-ueditor

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/js/index.js'),
  devtool: 'eval',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.min.css',
    }),
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname), path.resolve(__dirname, '../src')],
        use: {
          loader: 'babel-loader?cacheDirectory',
        },
      },
      // {
      //   test: /\.(css|less)$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      // },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              modifyVars: {'@primary-color': '#1DA57A'},
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|svg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500,
              name: 'images/[name]-[hash].[ext]',
              outputPath: path.resolve(__dirname, 'lib/images'),
              pulbicPath: path.resolve(__dirname, './src/img'),
            },
          },
        ],
      },
    ],
  },
}

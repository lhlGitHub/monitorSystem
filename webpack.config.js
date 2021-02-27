const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  mode: 'development', // 开发模式
  context: process.cwd(), // 上下文目录
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'monitor.js', // 文件名
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), //devServer静态根目录
  },
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: ['/node_modules/'],
        include: path.resolve(__dirname, 'src'),
      },
    //   {
    //     test: /\.css|less/,
    //     use: [
    //       'css-loader',
    //       'postcss-loader',
    //       'less-loader',
    //     ],
    //   },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head',
    }),
  ],
};

const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = (env = {}) => ({
  mode: env.prod ? 'production' : 'development',
  devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
  entry: path.resolve(__dirname, './demo/main.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/'
  },
  resolve: {
    extensions:['.js','.ts','.vue','.tsx','jsx']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: !env.prod }
          },
          'css-loader'
        ]
      },
      {
        test: /\.jsx?$|\.tsx?$/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    contentBase: __dirname,
    overlay: true
  }
})

const webpack = require('webpack')
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = env => {
  return {
    mode: env,
    entry: ['./src/index.tsx'],
    resolve: {
      extensions: ['.ts', '.tsx', '.scss', '.js', 'jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
        {
          test: /\.(css|scss|sass)$/,
          use: [
            {
              loader:
                env === 'development'
                  ? 'style-loader'
                  : MiniCssExtractPlugin.loader,
              options:
                env === 'development'
                  ? undefined
                  : {
                      hmr: true,
                    },
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localsConvention: 'camelCase',
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new BitBarWebpackProgressPlugin(),
      new MiniCssExtractPlugin({
        ignoreOrder: true,
        filename: '[name].css',
      }),
      new HtmlWebPlugin({
        template: './public/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    ],
    optimization: {
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    devServer: {
      clientLogLevel: 'silent',
      bonjour: true,
      inline: true,
    },
  }
}

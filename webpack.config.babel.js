import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

const faviconsPlugin = new FaviconsWebpackPlugin('./assets/favicon.jpg');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './assets/index.html',
  filename: './index.html',
});

const cssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[id].[hash].css',
});

export const distPath = 'build';
export const absoluteDistPath = path.resolve('./', distPath);

export const getBaseConfig = (minimize = false) => ({
  entry: './src/index.jsx',

  output: {
    path: absoluteDistPath,
    publicPath: distPath,
    filename: 'bundle.[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            // translates CSS into CommonJS
            loader: 'css-loader',
            options: { minimize },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[key]_[hash:8].[ext]',
              outputPath: 'svg',
              context: '',
            },
          },
          'svgo-loader',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  plugins: [htmlPlugin, cssExtractPlugin, faviconsPlugin],
});

import path from 'path';
import merge from 'webpack-merge';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import { getBaseConfig, absoluteDistPath, distPath } from './webpack.config.babel';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const rootPath = path.resolve(__dirname, distPath);

const cleanPlugin = new CleanWebpackPlugin([absoluteDistPath], {
    root: rootPath,
    verbose: true
});

module.exports = merge(getBaseConfig(true), {
    mode: 'production',
    plugins: [cleanPlugin, new BundleAnalyzerPlugin()],
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
});

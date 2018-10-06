import merge from 'webpack-merge';
import { getBaseConfig, distPath } from './webpack.config.babel';

module.exports = merge(getBaseConfig(), {
    mode: 'development',

    output: {
        publicPath: '/'
    },

    devServer: {
        host: 'localhost',
        port: 8080,
        hotOnly: true,
        open: true,
        inline: true,
        historyApiFallback: true,
        publicPath: '/',
    }
});

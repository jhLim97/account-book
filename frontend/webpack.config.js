const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    devtool: process.env.NODE_ENV ? false : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new Dotenv({ path: './.env' }),
        new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/robots.txt',
                    to: 'robots.txt',
                },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|recoil)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    filename: `[name].[chunkhash].js`,
                },
            },
        },
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    devServer: {
        port: 9000,
        historyApiFallback: true,
    },
};

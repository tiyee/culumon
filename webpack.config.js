/** @format */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('terser-webpack-plugin')

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const isDebug = process.env.NODE_ENV === 'development'
const root_path = __dirname
console.log('isDebug', isDebug)
module.exports = {
    mode: isDebug ? 'development' : 'production',
    context: root_path,
    entry: {
        login: path.join(__dirname, 'src/Login.tsx'),
        index: path.join(__dirname, 'src/Index.tsx'),
    },
    output: {
        clean: true,
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    devtool: isDebug ? 'source-map' : false,
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: ['src', 'node_modules'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.join(__dirname, 'tsconfig.json'),
            }),
        ],
    },
    cache: {
        type: 'memory',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.tsx?$/,

                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },

    optimization: {
        minimize: true,
        usedExports: true,
        sideEffects: true,
        removeEmptyChunks: true,
        minimizer: [
            new UglifyJsPlugin({
                extractComments: false,
                parallel: true,

                terserOptions: {
                    ie8: false,
                    safari10: false,
                    compress: !isDebug,
                    warnings: isDebug,
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
        runtimeChunk: {
            name: 'manifest',
        },
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    priority: -10,
                    minChunks: 3,
                    reuseExistingChunk: false,
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true,
                },
                commons: {
                    // async 设置提取异步代码中的公用代码
                    chunks: 'async',
                    name: 'commons',
                    /**
                     * minSize 默认为 30000
                     * 想要使代码拆分真的按照我们的设置来
                     * 需要减小 minSize
                     */
                    minSize: 0,
                    priority: -20,
                    // 至少为两个 chunks 的公用代码
                    minChunks: 2,
                    reuseExistingChunk: true,
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    type: 'css/mini-extract',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    performance: {
        hints: false,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDebug ? JSON.stringify('development') : JSON.stringify('production'),
            },
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(),

        new HtmlWebpackPlugin({
            filename: path.join(__dirname, 'html/login.html'),
            template: path.join(__dirname, 'src/template/normal.tpl'),

            inject: 'body',
            hash: true,
            cache: true,

            chunks: ['vendor', 'login', 'manifest', 'commons'],
        }),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, 'html/index.html'),
            template: path.join(__dirname, 'src/template/normal.tpl'),

            inject: 'body',
            hash: true,
            cache: true,

            chunks: ['vendor', 'index', 'manifest', 'commons'],
        }),
    ],
}

const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";
const src = path.join(__dirname, 'src');

module.exports = {
    entry: './src/main.js',
    resolve: {
        modules: [src, 'node_modules'],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        alias: {
            src,
        },
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js)x?$/,
                loader: require.resolve("babel-loader"),
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                exclude: /\.module\.css$/i,
                include: [src],
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader'
                ],
            },
            {
                test: /\.module\.[s]css$/i,
                include: [src],
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: '[name]_[local]-[hash:base64:5]',
                            },
                            esModule: false



                            // modules: {
                            //     localIdentName: '[name]_[local]-[hash:base64:5]',
                            // }
                        },
                    },
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        ...(devMode ? [] : [new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })]),
        new CleanWebpackPlugin()
    ]
};
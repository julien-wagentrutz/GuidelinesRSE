const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.[fullhash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "../static",
                    to: "../dist",
                    noErrorOnMissing: true
                },
            ],
        }),
    ],
    module:
        {
            rules:
                [
                    {
                        test: /\.html$/,
                        use: [
                            // ...The other file-loader and extract-loader go here.
                            {
                                loader: 'html-loader',
                                options: {
                                    esModule: false,
                                }
                            }
                        ]
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: ['babel-loader']
                    },
                    {
                        test: /\.css$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    esModule: false,
                                },
                            },
                            "css-loader",
                        ],

                    },
                    {
                        test: /\.(png|jpg|svg|gif)$/,
                        type: 'asset/resource',
                    },
                    {
                        test: /\.(ttf|otf|woff|woff2|eot)$/,
                        use:
                            [
                                {
                                    loader: 'file-loader',
                                    options: {outputPath: 'fonts/'}
                                },
                            ]
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                            },
                            "css-loader",
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                }
                            }
                        ]
                    }
                ]
        }
};

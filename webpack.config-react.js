const config = require('./webpack.config');

module.exports = {
    ...config,
    module: {
        ...config.module,
        rules: [...config.module.rules,
            {
                test: /\.(js|ts)x?$/,
                loader: require.resolve("babel-loader"),
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [...config.plugins,
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.join(__dirname, 'tsconfig.json'),
            },
        }),

    ],
    entry: './src/main.tsx'
}
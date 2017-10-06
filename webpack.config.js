const path = require('path')
const webpack = require('webpack')

const config = {
    entry: path.resolve(__dirname, 'example/index.js'),
    output: {
        path: path.join(__dirname, 'example'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(__tests__|node_modules)/,
                include: __dirname,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './example',
        hot: true,
    }
}

if (process.env.NODE_ENV === 'production') {
    config.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        })
    ]
}

module.exports = config

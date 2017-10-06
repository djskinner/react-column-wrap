const path = require('path')
const webpack = require('webpack')
const banner = require('./webpack.banner')
const pkg = require('./package.json')

const externals = {
    react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
    },
    'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
    }
}

const config = {
    entry: {
        index: './src/index',
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `${pkg.name}.js`,
        sourceMapFilename: `${pkg.name}.sourcemap.js`,
        library: pkg.name,
        libraryTarget: 'umd'
    },
    module: {
        rules: [{
            test: /\.js/,
            use: ['babel-loader']
        }]
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],
    externals
}

module.exports = config

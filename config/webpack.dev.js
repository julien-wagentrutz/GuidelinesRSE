const {merge} = require('webpack-merge')
const commonConfiguration = require('./webpack.config.js')

module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devtool: 'source-map',
        devServer:
            {
                host: '0.0.0.0',
                port:'8000',
                static: '../dist',
                open: true,
                https: false,
                liveReload: true,
            }
    }
)
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = {
  mode: 'development',
  output:{
    publicPath: "http://localhost:8083/"  // if not provided, relative to the current host
                                        // however if current page is http://localhost:8083/auth/signin
                                        // webpack will think that host is http://localhost:8083/auth ,
                                        // because it will omit only last /path
  },
  devServer: {
    port: 8083,
    historyApiFallback:{
      index: '/index.html'
    },
    headers: {
      'Acces-Control-Allow-Origin':'*'
    }
  },
  plugins: [
    
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./Dashboard": "./src/bootstrap"
      },
      shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ]
}

module.exports = merge(commonConfig, devConfig)
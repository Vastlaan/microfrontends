const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  output:{
    publicPath: "http://localhost:8081/"  // if not provided, relative to the current host
                                        // however if current page is http://localhost:8081/auth/signin
                                        // webpack will think that host is http://localhost:8081/auth ,
                                        // because it will omit only last /path
  },
  devServer: {
    port: 8081,
    historyApiFallback:{
      index: '/index.html'
    }
  },
  plugins: [
    
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./Marketing": "./src/bootstrap"
      },
      shared: packageJson.dependencies
      // shared: ['react', 'react-dom']
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
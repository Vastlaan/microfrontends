const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')

const devConfig = {
  mode: 'development',
  output:{
    publicPath: "http://localhost:8080/"  // if not provided, relative to the current host
                                        // however if current page is http://localhost:8080/auth/signin
                                        // webpack will think that host is http://localhost:8080/auth ,
                                        // because it will omit only last /path
  },
  devServer: {
    port: 8080,
    historyApiFallback:{
      index: '/index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        "marketing" : "marketing@http://localhost:8081/remoteEntry.js",
        "auth" : "auth@http://localhost:8082/remoteEntry.js"
      },
      shared: packageJson.dependencies
    })
  ]
}

module.exports = merge(commonConfig, devConfig)
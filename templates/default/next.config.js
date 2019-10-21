const withTM = require('next-transpile-modules')

// Tell webpack to compile the "components" package
// https://www.npmjs.com/package/next-transpile-modules
module.exports = withTM({
  transpileModules: ['actions', 'components'],
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret'
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    API_URL: process.env.API_URL
  },
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'scoped'
          }
        },
        'sass-loader'
      ]
    })

    return config
  }
})

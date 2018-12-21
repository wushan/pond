const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'PondsApp - super fast bookmark services for personal and small teams.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/main.scss'
  ],
  auth: {
    redirect: {
      login: '/',
      logout: '/',
      callback: '/callback',
      home: '/'
    },
    strategies: {
      auth0: {
        domain: 'ponds.auth0.com',
        client_id: 'YdPu2lHii70HUTAXAuQ0ekwN5YPaMjJ7'
      }
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/font-awesome'
  ],
  /*
  ** Axios module configuration
  */
  env: {
    ENV_LOCATION: process.env.API_URL
  },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_URL,
    browserBaseURL: process.env.API_URL,
    https: true
  },
  router: {
    middleware: ['auth']
  },
  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

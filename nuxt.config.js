// https://nuxtjs.org/api/configuration-build
const basePath = process.env.NODE_ENV === 'production' ? '/shrimp/' : '/'
const host =
  process.env.NODE_ENV === 'production'
    ? 'http://www.shrimp.com'
    : 'http://localhost:3030'
const axiosPort = process.env.NODE_ENV === 'production' ? '80' : '3030'
const axiosHost =
  process.env.NODE_ENV === 'production' ? 'www.shrimp.com' : 'localhost'
const axiosPrefix = process.env.NODE_ENV === 'production' ? '/shrimp' : '/'

module.exports = {
  router: {
    base: basePath
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '安心易',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js Koa project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${basePath}static/favicon.ico`
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.loli.net/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    script: [{ src: 'http://res.wx.qq.com/open/js/jweixin-1.2.0.js' }]
  },
  srcDir: 'client/',
  env: {
    basePath: basePath,
    host: host
  },
  /*
  ** Global CSS
  */
  plugins: ['~/plugins/vuetify.js', '~/plugins/api.js'],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['~/plugins/vuetify.js', '~/plugins/api.js'],
    extractCSS: true
  },
  modules: ['@nuxtjs/axios'],

  axios: {
    port: axiosPort,
    host: axiosHost,
    prefix: axiosPrefix
    // proxyHeaders: false
  }
}

// https://nuxtjs.org/api/configuration-build
// const baseUrl = process.env.NODE_ENV !== 'production' ? '/axy' : '/'

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'shrimp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js Koa project'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/static/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.loli.net/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  srcDir: 'client/',
  env: {
    HOST_URL: process.env.HOST_URL || 'http://127.0.0.1:3030'
  },
  /*
  ** Global CSS
  */
  plugins: ['~/plugins/vuetify.js'],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['~/plugins/vuetify.js'],
    extractCSS: true
  }
};

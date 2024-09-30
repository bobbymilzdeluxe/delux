import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // generate: {
  //   fallback: true, // if you want to use '404.html' instead of the default '200.html'
  //   fallback: 'my-fallback/file.html' // if your hosting needs a custom location
  // },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Flexi Unions Bank',
    title: 'Flexi Unions Bank',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { theme_color: '#2C1762' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: 'https://unpkg.com/aos@2.3.1/dist/aos.css',
        rel: 'stylesheet',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/lodash.js', ssr: false },
    { src: '~/plugins/aos.client.js', mode: 'client' },
    { src: '~/plugins/v-google-translate', mode: 'client' },
    { src: '~/plugins/swiper', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  pwa: {
    meta: {
      theme_color: '#2C1762',
      ogTitle: 'Flexi Unions Bank',
      description:
        'Flexi Unions Bank empowers millions of users in over 140 countries to bank in a simple and transparent way.',
      ogDescription:
        'Flexi Unions Bank empowers millions of users in over 140 countries to bank in a simple and transparent way.',
      twitterCard: 'summary_large_image',
    },
    manifest: {
      lang: 'en',
      name: 'Flexi Unions Bank',
      short_name: 'Flexi Unions Bank',
      description:
        'Flexi Unions Bank empowers millions of users in over 140 countries to bank in a simple and transparent way.',
    },
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  loading: {
    color: '#B48CFC',
  },
  loadingIndicator: {
    name: 'folding-cube',
    color: '#B48CFC',
    background: '#2C1762',
    duration: '3000',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/pwa'],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#ff0475',
          secondary: '#B48CFC',
          accent: '#2C1762',
          tealish: '#4ef1e0',
          text1: '#5a617c',
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        })
      }
    },
  },
  generate: {
    fallback: true,
  },
}

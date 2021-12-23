export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '炒粉gif生成器',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }
    ],
    script: [
      // {
      //   src: 'https://cdn.bootcdn.net/ajax/libs/gifshot/0.3.2/gifshot.js',
      //   type: 'text/javascript'
      // },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    // extend (config, ctx) {
    //   if (ctx.isClient) {
    //     config.module.rules.push({
    //        enforce: 'pre',
    //        test: /\.(js|vue)$/,
    //        loader: 'eslint-loader',
    //        exclude: /(node_modules)/
    //     })
    //   }
    // }
  },
  generate: {
    // 自定义配置路由
    router: {
      mode: 'hash', // 使用 'hash' 主要是为了适配以相对路径打开的静态站点， 必须使用 'hash' 否则路由跳转不生效
      // base: '/moli/',
      base: './'
    },
  },
  router: {
    mode: 'hash', // 使用 'hash' 主要是为了适配以相对路径打开的静态站点， 必须使用 'hash' 否则路由跳转不生效
    // base: '/moli/',
    base: process.env.NODE_ENV === 'production' ? './' : '/',
  },


}

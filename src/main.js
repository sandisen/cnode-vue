
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'webpack-zepto'
import filter from './utils/filter.js';
//注册全局组件
Vue.prototype.$filter = filter;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

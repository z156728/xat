// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// vux移除移动端页面点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)
//引入，再设置，就可以使用axios
import axios from 'axios'
Vue.prototype.$axios = axios;
//引入rem.js
import rem from '../static/js/rem.js';
Vue.use(rem);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

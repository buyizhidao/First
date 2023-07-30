// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './typeface/typeface.css';
import axios from 'axios'

Vue.prototype.axios = axios
// axios.defaults.baseURL='https://mock.apifox.cn/m1/2743672-0-default'
axios.defaults.baseURL='http://10.128.225.231'

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  render: h => h(App)
}).$mount('#app');

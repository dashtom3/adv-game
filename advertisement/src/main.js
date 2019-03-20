// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
// import {MintUI} from 'mint-ui';

import {Select,Option,Form,FormItem} from 'element-ui';
import App from './App'

// import 'mint-ui/lib/style.css';
require('es6-promise').polyfill();
// Vue.use(MintUI);
Vue.use(Select);
Vue.use(Option);
Vue.use(Form);
Vue.use(FormItem);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

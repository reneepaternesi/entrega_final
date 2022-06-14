import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import Utils from "./mixins/utils";
import VueRouter from 'vue-router';
import router from './router/router.js';
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueRouter);
Vue.mixin(Utils);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

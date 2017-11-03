// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Gravatar from 'vue-gravatar'
import moment from 'moment'
import './style.less'


Vue.prototype.moment = moment
moment.locale('zh-cn')

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component('v-gravatar', Gravatar);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

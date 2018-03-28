// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Gravatar from 'vue-gravatar'
import moment, {locale} from 'moment'
import './style.less'
import infiniteScroll from 'vue-infinite-scroll'
import './util/validate'
// import axios from 'axios'
import axios from './util/interceptor.js'
import store from './store/index.js'
import config from './config';


// axios.interceptors.response.use(function (response) {
//   // 对响应数据做点什么
//   Vue.$message("")
//   return response;
// }, function (error) {
//   // 对响应错误做点什么
//   return Promise.reject(error);
// });


Vue.prototype.$http = axios;
Vue.prototype.$config = config.urlConfig;

Vue.use(infiniteScroll);
Vue.prototype.moment = moment;
moment.locale('zh-cn');

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.component('v-gravatar', Gravatar);


new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
});

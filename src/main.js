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
String.prototype.format = function (args) {
  let result = this;
  if (arguments.length > 0) {
    if (arguments.length === 1 && typeof (args) === "object") {
      for (let key in args) {
        if (args[key] !== undefined) {
          let reg = new RegExp("({" + key + "})", "g");
          result = result.replace(reg, args[key]);
        }
      }
    }
    else {
      for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) {
          //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题
          let reg = new RegExp("({)" + i + "(})", "g");
          result = result.replace(reg, arguments[i]);
        }
      }
    }
  }
  return result;
};


Vue.prototype.$http = axios;
Vue.prototype.$config = config.urlConfig;
Vue.prototype.$status = config.status;

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

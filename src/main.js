// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Gravatar from 'vue-gravatar';
import moment, {locale} from 'moment';
import './style.less';
import infiniteScroll from 'vue-infinite-scroll';
import './util/validate';
// import axios from 'axios'
import axios from './util/interceptor.js';
import store from './store/index.js';
import config from './const';


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


//   return Promise.reject(error);
Array.prototype.remove = function (dx) {
  if (isNaN(dx) || dx > this.length) {
    return false;
  }
  for (var i = 0, n = 0; i < this.length; i++) {
    if (this[i] != this[dx]) {
      this[n++] = this[i]
    }
  }
  this.length -= 1
};


Vue.prototype.$http = axios;
Vue.prototype.$config = config.urlConfig;
Vue.prototype.$status = config.status;
Vue.prototype.$units = {};
Vue.prototype.$units.remove = function (array, ele) {
  for (let i = 0; i < array.length; i++) {
    let ele1 = array[i];
    if (ele1 === ele) {
      array.splice(i, 1);
      break;
    }
  }
};


Vue.prototype.$units.createSystemNews = (doc, callback) => {
  doc.type = 2;
  axios.post(config.urlConfig.new.url, doc)
    .then(response => {
      let data = response.data;
      if (data.status === 0) {
        callback();
      } else {
        this.$message.error(data.message);
      }
    })
    .catch(err => {
      console.log(err);
      console.log(err.stack);
      if (err.response && err.response.data.message) {
        this.$message.error(err.response.data.message);
      }
    });
};

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

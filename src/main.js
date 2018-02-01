// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Gravatar from 'vue-gravatar'
import moment, { locale } from 'moment'
import './style.less'
import infiniteScroll from 'vue-infinite-scroll'
// import axios from 'axios'
import axios from './util/interceptor.js'
import store from './store/index.js'
import './util/validate'



// import VeeValidate from 'vee-validate'
// import zh_CN from 'vee-validate/dist/locale/zh_CN'
// import { Validator } from 'vee-validate'

// const config = {
//   locale: 'zh_CN',
//   events:'blur',
//   dictionary: {
//     zh_CN: {
//       zh_CN,
//       messages:{
//         email:() => '邮箱格式不对',
//         required:() => '邮箱不能为空',
//       }
//     } 
//   }
// }

// Vue.use(VeeValidate, config);

// const dictionary = {
//   zh_CN: {
//     messages: {
//       email: () => '邮箱格式不正确哦'
//     }
//   }
// };
// Validator.updateDictionary(dictionary);

// import zh_CN from 'vee-validate/dist/locale/zh_CN'
// import { Validator } from 'vee-validate';
// Validator.addLocale(zh_CN)
// Vue.use(VeeValidate, {
//   locale: 'zh_CN',
//  })

Vue.prototype.$http = axios;

Vue.use(infiniteScroll)


// import VueScroller from 'vue-scroller'
// Vue.use(VueScroller)
// import axios from 'axios'

// Vue.use(axios)
// import Editor from 'vue-simple-markdown-editor';

// import VueSimplemde from 'vue-simplemde'

// Vue.use(VueSimplemde)
// import lodash from 'lodash'
// import marked from 'marked'

// Vue.prototype.$lodash = lodash
// Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });
// import VueQuillEditor from 'vue-quill-editor'

// Vue.use(VueQuillEditor)
// Vue.use(lodash)

Vue.prototype.moment = moment
moment.locale('zh-cn')

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.component('v-gravatar', Gravatar);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

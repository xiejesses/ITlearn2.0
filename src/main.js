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
  router,
  template: '<App/>',
  components: { App }
})

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Share from '@/components/Share'

Vue.use(Router)

export default new Router({
  mode: 'history', //去掉 #
  history: true,   //去掉 #
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/share',
      name:'share',
      component:Share
    }
  ]
})

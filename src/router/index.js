import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
import Login from '@/components/Login'
import Share from '@/components/Share'
import User from '@/components/User'
import Article from '@/components/Article'
import GroupIndex from '@/components/GroupIndex'
import Group from '@/components/Group'
import GroupDetail from '@/components/GroupDetail'
import MarkdownEditor from '@/components/MarkdownEditor'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  mode: 'history', //去掉 #
  history: true,   //去掉 #
  routes: [
    {
      path: '/',
      name: '',
      component: Article
    },
    //测试用
    {
      path: '/test',
      name: '',
      component: test
    },
    {
      path: '/MarkdownEditor',
      name: '',
      component: MarkdownEditor
    },
    {
      path: '/groupindex',
      name: '',
      component: GroupIndex,
      children:[
        {
          path:'',
          name:'',
          component:Group
        }
      ]
    },
    {
      path:'/groupdetail',
      name:'groupdetail',
      component:GroupDetail
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
    },
    {
      path:'/user/:uName',
      name:'user',
      component:User,
      children:[
        {
          path:'',
          name:'article',
          component:Article
        },
        {
          path:'mygroup',
          name:'group',
          component:Group
        }
      ]
    }
  ]
})

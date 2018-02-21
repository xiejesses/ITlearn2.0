import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Share from '@/components/Share'
import User from '@/components/User'
import Article from '@/components/Article'
import GroupIndex from '@/components/GroupIndex'
import Group from '@/components/Group'
import GroupDetail from '@/components/GroupDetail'
import MarkdownEditor from '@/components/MarkdownEditor'
import TopicDetail from '@/components/TopicDetail'
// import test from '@/components/test'
import Vindex from '@/components/Vindex'

Vue.use(Router)

const router = new Router({
  mode: 'history', //去掉 #
  history: true,   //去掉 #
  routes: [
    {
      path: '/',
      name: 'vindex',
      component: Vindex,
      children:[
        {
          path:'',
          name:'',
          component:Article
        },
        {
          path:'/share',
          name:'share',
          //添加路由元信息
          meta: {
            requireAuth:true //表示进入该路由需要登录
          },
          component:Share
        },
        {
          path: '/MarkdownEditor',
          name: 'markdowneditor',
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
          path:'/g/:g_id',
          name:'groupdetail',
          component:GroupDetail
        },
        {
          path:'/t/:t_id',
          name:'topicdetail',
          component:TopicDetail
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
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    
    //测试用
    // {
    //   path: '/test',
    //   name: '',
    //   component: test
    // },
  ]
})


// 设置路由拦截
// 在vue-router的全局钩子中设置拦截 
// 每个路由皆会的钩子函数
// to 进入 from 离开 next 传递
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if(to.meta.requireAuth) {
    if(token) {
      next();
    } else {
      next({
        path:'/login',
        query: {
          redirect:to.fullPath
        }
      })
    } 
  } else {
    next()
  }
})


export default router;

// export default new Router({
  
// })

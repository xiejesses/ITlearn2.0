import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Share from '@/components/Share';
import User from '@/components/User';
import Article from '@/components/Article';
import GroupIndex from '@/components/GroupIndex';
import Group from '@/components/Group';
import GroupDetail from '@/components/GroupDetail';
import MarkdownEditor from '@/components/MarkdownEditor';
import TopicDetail from '@/components/TopicDetail';
import Vindex from '@/components/Vindex';
import Follow from '@/components/Follow';
import Tag from '@/components/Tag';
import ArticleDetail from '@/components/ArticleDetail';
import About from '@/components/About';

import search from '@/components/search';
import Notice from '@/components/Notice';


// 后台
import AdminApp from '@/components/admin/App';
import AdminHome from '@/components/admin/Home';
import AdminComment from '@/components/admin/Comments';
import AdminGroup from '@/components/admin/Group';
import AdminRecommend from '@/components/admin/Recommend';
import AdminTag from '@/components/admin/Tag';
import AdminTopic from '@/components/admin/Topic';
import AdminUser from '@/components/admin/User';


Vue.use(Router);

const router = new Router({
  mode: 'history', //去掉 #
  history: true,   //去掉 #
  routes: [
    {
      path: '/',
      name: 'vindex',
      component: Vindex,
      children: [
        {
          path: '/share/:shareId',
          name: "share_detail",
          component: ArticleDetail
        },
        {
          path: '/',
          name: 'home_article',
          component: Article
        },
        {
          path: '/search',
          name: 'Search',
          component: search,
          children:[
            {
              path: '',
              name: 'search_article',
              // meta: {
              //   requireAuth:true //表示进入该路由需要登录
              // },
              component: Article
            },
            {
              path: '/searchgroup',
              name: 'search_group',
              // meta: {
              //   requireAuth:true //表示进入该路由需要登录
              // },
              component: Group
            },
          ]
        },
        {
          path: '/share',
          name: 'share',
          //添加路由元信息
          meta: {
            requireAuth: true //表示进入该路由需要登录
          },
          component: Share
        },
        {
          path: '/tag/:tName',
          name: 'tag',
          //添加路由元信息
          // meta: {
          //   requireAuth:true //表示进入该路由需要登录
          // },
          component: Tag,
          children: [
            {
              path: '/',
              name: 'tag_article',
              // meta: {
              //   requireAuth:true //表示进入该路由需要登录
              // },
              component: Article
            },
          ]
        },
        {
          path: '/MarkdownEditor',
          name: 'markdowneditor',
          meta: {
            requireAuth: true //表示进入该路由需要登录
          },
          component: MarkdownEditor
        },
        {
          path: '/groupindex',
          name: '',
          component: GroupIndex,
          children: [
            {
              path: '',
              name: '',
              component: Group
            }
          ]
        },
        {
          path: '/g/:g_id',
          name: 'groupdetail',
          meta: {
            requireAuth: true //表示进入该路由需要登录
          },
          component: GroupDetail
        },
        {
          path: '/t/:t_id',
          name: 'topicdetail',
          meta: {
            requireAuth: true //表示进入该路由需要登录
          },
          component: TopicDetail
        },
        {
          path: '/user/:userId',
          name: 'user',
          // meta: {
          //   requireAuth:true //表示进入该路由需要登录
          // },
          component: User,
          children: [

            {
              path: 'group',
              name: 'group',
              // meta: {
              //   requireAuth:true //表示进入该路由需要登录
              // },
              component: Group
            },
            {
              path: 'mygroup',
              name: 'mygroup',
              // meta: {
              //   requireAuth:true //表示进入该路由需要登录
              // },
              component: Group
            },
            {
              path: '',
              name: 'user_article',
              // meta: {
              //   requireAuth:true //表示进入该路由需要登录
              // },
              component: Article
            },
            {
              path: 'collection',
              name: 'user_collection',
              // meta: {
              //   requireAuth:true //表示进入该路由需要登录
              // },
              component: Article
            },
            {
              path: 'following',
              name: 'following',
              // meta: {
              //   requireAuth:true //表示进入该路由需要登录
              // },
              component: Follow
            },
            {
              path: 'follower',
              name: 'follower',
              // meta: {
              //   requireAuth:true //表示进入该路由需要登录
              // },
              component: Follow
            },

          ]
        }
      ]
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/test',
      name: 'notice',
      component: Notice
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        requireManager: true //表示进入该路由需要登录
      },
      component: AdminApp,
      children: [
        {
          path: '/',
          name: 'admin_home',
          component: AdminHome,
        },
        {
          path: '/user',
          name: 'admin_user',
          component: AdminUser
        },
        {
          path: '/recommend',
          name: 'admin_recommend',
          component: AdminRecommend
        },
        {
          path: '/tag',
          name: 'admin_tag',
          component: AdminTag
        },
        {
          path: '/group',
          name: 'admin_group',
          component: AdminGroup
        },
        {
          path: '/topic',
          name: 'admin_topic',
          component: AdminTopic
        },
        {
          path: '/comments',
          name: 'admin_comments',
          component: AdminComment
        }]
    }
  ]
});


// 设置路由拦截
// 在vue-router的全局钩子中设置拦截
// 每个路由皆会的钩子函数
// to 进入 from 离开 next 传递
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (to.meta.requireAuth) {
    if (token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
});


export default router;

// export default new Router({

// })

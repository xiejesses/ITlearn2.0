import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Share from '@/components/Share';
import ShareProject from '@/components/ShareProject';
import ProjectIndex from '@/components/ProjectIndex';
import ProjectDetail from '@/components/ProjectDetail';

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
import resetPwd from '@/components/ResetPwd';
import ChangePwd from '@/components/ChangePwd';
import SetNewPwd from '@/components/SetNewPwd';
import NotificationIndex from '@/components/NotificationIndex';
import Message from '@/components/Message';
import SystemNotice from '@/components/SystemNotice';
import TopicIndex from '@/components/TopicIndex';
import TurnToPage from '@/components/TurnToPage';
// import Notice from '@/components/Notice';


// 后台
import AdminApp from '@/components/admin/App';
import AdminHome from '@/components/admin/Home';
import AdminComment from '@/components/admin/Comments';
import AdminGroup from '@/components/admin/Group';
import AdminRecommend from '@/components/admin/Recommend';
import AdminTag from '@/components/admin/Tag';
import AdminTopic from '@/components/admin/Topic';
import AdminUser from '@/components/admin/User';
import AdminProject from '@/components/admin/Project';

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
          children: [
            {
              path: '',
              name: 'search_article',
              component: Article
            },
            {
              path: '/search_group',
              name: 'search_group',
              component: Group
            }, {
              path: '/search_topic',
              name: 'search_topic',
              component: TopicIndex
            }, {
              path: '/search_project',
              name: 'search_project',
              component: ProjectIndex
            }
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
          path: '/modify_recommend/:recommendId',
          name: 'modify_recommend',
          component: Share
        },
        {
          path: '/modify_topic/:topicId',
          name: 'modify_topic',
          component: MarkdownEditor
        },
        {
          path: '/modify_project/:projectId',
          name: 'modify_project',
          component: ShareProject
        },
        {
          path: '/shareProject',
          name: 'share_project',
          //添加路由元信息
          meta: {
            requireAuth: true //表示进入该路由需要登录
          },
          component: ShareProject
        },
        {
          path: '/projectIndex',
          name: 'project_index',
          //添加路由元信息
          meta: {
            requireAuth: true //表示进入该路由需要登录
          },
          component: ProjectIndex
        },
        {
          path: '/ProjectDetail/:projectId',
          name: 'project_detail',
          //添加路由元信息
          meta: {
            requireAuth: true //表示进入该路由需要登录
          },
          component: ProjectDetail
        },
        {
          path: '/share',
          name: 'share',
          //添加路由元信息
          // meta: {
          //   requireAuth: true //表示进入该路由需要登录
          // },
          component: Share
        },
        {
          path: '/notification',
          name: 'notification',
          //添加路由元信息
          meta: {
            requireAuth: true //表示进入该路由需要登录
          },
          component: NotificationIndex,
          children: [
            {
              path: '/',
              name: 'message',
              component: Message
            },
            {
              path: '/notification/system',
              name: 'system_message',
              component: Message
            },
            {
              path: '/notification/userNew',
              name: 'users_message',
              component: Message
            },
          ]
        },
        {
          path: '/tag/:tagId',
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
          name: 'group_detail',
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
          path: '/topicIndex/:group',
          name: 'topic_index',
          component: TopicIndex
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
              path: 'join_group',
              name: 'join_group',
              // meta: {
              //   requireAuth:true //表示进入该路由需要登录
              // },
              component: Group
            },
            {
              path: 'my_group',
              name: 'my_group',
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
            {
              path: 'changePwd',
              name: 'changePwd',
              // meta: {
              //   requireAuth:true //表示进入该路由需要登录
              // },
              component: ChangePwd
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
      path: '/turn_page',
      name: 'turn_to_page',
      component: TurnToPage
    },
    {
      path: '/admin_login',
      name: 'admin_login',
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
      path: '/resetPwd',
      name: 'resetPwd',
      // meta: {
      //   requireAuth:true //表示进入该路由需要登录
      // },
      component: resetPwd
    },
    {
      path: '/set-new-Pwd',
      name: 'setNewPwd',
      // meta: {
      //   requireAuth:true //表示进入该路由需要登录
      // },
      component: SetNewPwd
    },
    // {
    //   path: '/test',
    //   name: 'notice',
    //   component: Notice
    // },


    {
      path: '/admin',
      name: 'admin',
      meta: {
        requireAuth:true //表示进入该路由需要登录
      },
      // meta: {
      //   requireManager: true //表示进入该路由需要登录
      // },
      component: AdminApp,
      children: [
        {
          path: '/admin/',
          name: 'admin_home',
          meta: {
            requireManager:true //表示进入该路由需要登录
          },
          component: AdminHome,
        },
        {
          path: '/admin/user',
          name: 'admin_user',
          meta: {
            requireManager:true //表示进入该路由需要登录
          },
          component: AdminUser
        },
        {
          path: '/admin/recommend',
          name: 'admin_recommend',
          meta: {
            requireManager:true //表示进入该路由需要登录
          },
          component: AdminRecommend
        },
        {
          path: '/admin/tag',
          name: 'admin_tag',
          meta: {
            requireManager:true //表示进入该路由需要登录
          },
          component: AdminTag
        },
        {
          path: '/admin/group',
          name: 'admin_group',
          meta: {
            requireManager:true //表示进入该路由需要登录
          },
          component: AdminGroup
        },
        {
          path: '/admin/topic',
          name: 'admin_topic',
          meta: {
            requireManager:true //表示进入该路由需要登录
          },
          component: AdminTopic
        },
        {
          path: '/admin/comments',
          name: 'admin_comments',
          meta: {
            requireManager:true //表示进入该路由需要登录
          },
          component: AdminComment
        },
        {
          path: '/admin/projects',
          name: 'admin_projects',
          meta: {
            requireManager:true //表示进入该路由需要登录
          },
          component: AdminProject
        }]
    }
  ]
});


// 设置路由拦截
// 在vue-router的全局钩子中设置拦截
// 每个路由皆会的钩子函数
// to 进入 from 离开 next 传递
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('userName');
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
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('Manager');
  if (to.meta.requireManager) {
    if (token) {
      next();
    } else {
      next({
        path: '/admin_login',
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

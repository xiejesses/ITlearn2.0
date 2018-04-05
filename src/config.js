/*
* Create By mryang On 18-3-24
* 模型url 设定
*/

let version = "v1";
const urlRegex = "/v1";

const urlConfig ={
  // 用户模块
  user: {
    url: `/${version}/users/`,
    fields: {
      _id: "_id",

    },

    // 功能url
    login: {
      url: `/${version}/users/login/`,
    },
    logout: {
      url: `/${version}/users/register/`
    }
  },

  // 收藏模块
  collection:{
    url: `/${version}/collections/`,
    count: {
      url:`/${version}/collections/count/`
    }
  },

  // 粉丝模块
  relation: {
    url: `/${version}/relations/`,

    follow: {
      url: `/${version}/relations/follow/`
    },
    count: {
      url: `/${version}/relations/user/`
    }
  },

  // 推荐模块
  recommend:{
    url: `/${version}/recommends/`,
    count: {
      url: `/${version}/recommends/count/`
    }
  },

  // 标签模块
  tag: {
    url: `/${version}/tags/`
  },

  // 项目模块
  project:{
    url: `/${version}/projects/`
  },

  // 小组模块
  group:{
    url: `/${version}/groups/`,

    // 加入小组功能
    join: {
      url: `/${version}/groups/join/`
    }
  },

  // 评论模块
  comment:{
    url: `/${version}/comments/`
  },

  // 话题模块
  topic:{
    url: `/${version}/topics/`
  }
};

const status = {
  success: 0,
  fail: 1
};

export default {urlConfig, urlRegex, status};

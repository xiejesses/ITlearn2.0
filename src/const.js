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

    // 功能url
    login: {
      url: `/${version}/users/login/`,
    },
    logout: {
      url: `/${version}/users/register/`
    },
    change: {
      url: `/${version}/users/change/`
    },
    change2: {
      url: `/${version}/users/pwd/change/`
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
    },
    vote: {
      url: `/${version}/recommends/vote/`
    },
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

    count: {
      url: `/${version}/groups/count/`
    },
    // 加入小组功能
    join: {
      url: `/${version}/groups/join/`
    }
  },

  // 评论模块
  comment:{
    url: `/${version}/comments/`,

    count: {
      url: `/${version}/comments/count/`
    }
  },

  // 话题模块
  topic:{
    url: `/${version}/topics/`
  },

  // 系统url
  system: {
    email: {url: `/${version}/system/email/`}
  },

  // 系统url
  new: {
    url: `/${version}/news/`
  }
};

// 创建count url
for (let key in urlConfig) {
  urlConfig[key].count = {
    url: urlConfig[key].url + "count/"
  };
}


const status = {
  success: 0,
  fail: 1
};

export default {urlConfig, urlRegex, status};

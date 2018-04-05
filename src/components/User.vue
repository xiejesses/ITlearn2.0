<template>
  <div class="user">
    <main>
      <section class="public-profile">
        <div class="user-data">
          <div class="user-meta">
            <div class="user-avatar">
              <v-gravatar :email="userInfo.email" size='40' />
            </div>
            <div class="user-introduce">
              <span v-if="isSave" class="save">
                <i @click="saveEdit" class="el-icon-check" title="保存"></i>
                <i @click="cancleEdit" class="el-icon-close" title="取消"></i>
              </span>
              <span v-else v-show="userName == currentUser" class="edit">
                <i @click="edit" class="el-icon-edit" title="设置"></i>
              </span>
              <h2>{{userInfo.nickname}}</h2>
              <textarea v-if="isEdit" v-model="userInfo.desc" name="" id="" cols="30" rows="2"></textarea>
              <pre v-else class="description">
              <p >{{userInfo.desc}}</p>
              </pre>
            </div>
          </div>
          <div class="profile-content">
            <ul>
              <li>
                <router-link :to="{ name: 'following' ,params: { userId: userInfo._id }}">
                  <div class="digits">{{following.length}}</div>
                正在关注
                </router-link>

              </li>
              <li>
                 <router-link :to="{ name: 'follower', params: { userId: userInfo._id }}">
                <div class="digits">{{follower.length}}</div>
                关注者
                 </router-link>
              </li>
              <li>
                <div class="digits">{{lovelink}}</div>
                喜欢
              </li>
            </ul>
          </div>
          <div class="follow">
            <button v-show="userName !== currentUser" @click="follow">{{followmsg}}</button>
          </div>
        </div>
      </section>
      <section >
        <div class="tab">
          <router-link :to="{ name: 'user_article'}" exact="true" class="ListItem">收藏({{lovelink}})</router-link>
          <span class="separator"> / </span>
          <router-link :to="{ name: 'group'}" class="ListItem">小组({{lovegroup}})</router-link>
        </div>
        <router-view></router-view>
      </section>

    </main>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
        userName: '',
        currentUser: '',
        userInfo: {},
        followmsg: '关注',
        follower: 0,
        following: 0,
        lovelink: 0,
        lovegroup: 0,
        isEdit: false,
        isSave: false,
        msg: 'Design & front end development. Also a back end engineer'
      };
    },
    mounted() {
      this.fetchUserInfo();
      this.currentUser = localStorage.getItem('userName');
    },
    methods: {
      saveEdit() {
        this.isEdit = false;
        this.isSave = false;
        let params = {params:
          {_id: localStorage.getItem('userId')}
        };
        let data = {data:
          {desc: this.userInfo.desc}
        };
        this.$http.patch(this.$config.user.url, params, data)
          .then(response => {
            let res = response.data;
            if (res.status === this.$status.success) {
              this.$message.success(`更新成功`);
            } else {
              this.$message.success(`出现错误，请重试`);
            }
          });
      },
      cancleEdit() {
        this.isEdit = false;
        this.isSave = false;
      },
      edit() {
        this.isSave = true;
        this.isEdit = true;
      },

      // 获取用户信息
      fetchUserInfo() {

        // 请求获取用户信息
        this.$http.post(this.$config.user.url, {params: {_id: this.$route.params.userId}})
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success){
              this.userInfo = res.data[0];
              this.userName = this.userInfo.nickname;
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(err => {
              this.$message.error(err.response.data.message);
          });


        // 请求获取用户的关注者
        this.$http.get(this.$config.relation.url, {params: {follower: this.$route.params.userId}})
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success){
              this.follower = res.data.length;
              this.followmsg = "关注";

              if (parseInt(this.$route.params.userId) !== this.localStorage.getItem("userId")){
                // 判断当前用户是否关注 该用户
                this.$http.get(this.$config.user.relation.url, {params: {user: this.localStorage.getItem("userId")}})
                  .then(response => {
                    let res = response.data;
                    for (let i = 0; i < res.data.length; i++) {
                      let relation = res.data[i];
                      if (relation.follower._id === parseInt(this.$route.params.userId)){
                        this.followmsg = "取消关注";
                        break;
                      }
                    }
                  })
                  .catch(err => {
                    this.$message.error(err.response.data.message);
                  });
              }

            } else {
              this.$message.error(res.message);
            }
          })
          .catch(err => {
              this.$message.error(err.response.data.message);
          });

        // 请求获取用户的 正在关注用户数, 关注者用户
        this.$http.get(this.$config.relation.count.url, {params: {user: this.$route.params.userId}})
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success){
              this.following = res.following.length;
              this.follower = res.follower.length;
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(err => {
            this.$message.error(err.response.data.message);
          });

        // 获取收藏数
        this.$http.get(this.$config.collection.count.url, {params: {user: this.$route.params.userId}})
          .then(response => {
            let res = response.data;
            if (res.status === this.$status.success ) {
              this.lovelink = res.count;
            }
          })
          .catch(err => {
              this.$message.error(err.response.data.message);
          });

        // 获取小组数
        this.$http.get(this.$config.group.count.url, {params: {users: this.$route.params.userId}})
          .then(response => {
            let res = response.data;
            if (res.status === this.$status.success ) {
              this.lovegroup = res.count;
            }
          })
          .catch(err => {
            this.$message.error(err.response.data.message);
          });

//        this.follower = res.doc.follower.length;
//        if(res.currentuser.following.indexOf(res.doc._id) === -1) {
//          this.followmsg = "关注"
//        } else {
//          this.followmsg = "取消关注"
//        }
      },
      follow() {
        let params = {
          user: this.localStorage.getItem("userId"),
          follower: this.$route.params.userId
        };

        this.$http.get(this.$config.user.follow.url, {params: params})
          .then(response => {
            let res = response.data;

            //todo 此处的响应结果需要重新定制
            if (res.message === "关注成功") {
              this.followmsg = "取消关注";
              this.follower++;
              this.$message.success(res.message);
            } else if (res.message === "取消关注成功") {
              this.followmsg = "关注";
              this.follower--;
              this.$message.success(`${res.message}`)
            } else {
              this.$message.success(`出现错误`)
            }
          });
      }
    },

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
  color: white;
}
pre {
  white-space: pre-wrap;
}
  main {
    width: 100%;
    margin: 5px auto;
    height: auto;
  }

  .user-data {
    background: #54595f;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
  }

  .user-meta {
    margin-top: 20px;
  }

  .user-introduce {
    text-align: center;
    margin: 0 0 20px 0;
  }

  .user-introduce h2 {
    font-size: 18px;
    color: #fff;
    margin: 5px 0 0 0;
    text-indent: 5px;
  }

  .user-introduce span {
    display: block;
    margin-top: 5px;
  }

  .user-introduce i {
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }

  .user-introduce .save i {
    margin: 0 5px;
  }

  .user-introduce i:hover {
    color: red;
  }

  .description {
    color: #bdc2c6;
    margin: 0px 30px;
  }
  .description p {
    font-size: 15px;
    margin: 0 0 -20px 0;
  }

  input[type="text"] {
    display: block;
    border: none;
    font-size: 14px;
    color: black;
    margin-top: 13px;
    height: 20px;
  }

  .user-meta img {
    height: 64px;
    width: 64px;
    border-radius: 50%;
  }
  .profile-content ul {
    padding: 0;
    margin-bottom: 10px;
    margin-top: -10px;
  }

  .profile-content li {
    list-style: none;
    display: inline-block;
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    margin-right: 15px;
  }

  .profile-content li+li {
    border-left: 1px solid #8c8585;
    padding-left: 10px;
  }

  .follow {
    margin-bottom: 10px;
    width: 100px;
  }

  .follow button {
    background: #2DBF80;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 5px 15px;
    font-size: 13px;
    color: #fff;
    max-height: 40px;
    max-width: 100px;
  }

  .follow button:hover {
    background: #2DB270;
  }

  .tab {
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 3px solid #f3f3f3;
  }
  .tab a{
    font-size: 16px;
    color: #54595f;
    text-decoration: none;
  }
  .separator {
    margin: 0 5px;
    color: #bfbfbf;
  }


  @media screen and (min-width:500px) {
    .user-meta img {
      height: 76px;
      width: 76px;
    }
    .user-introduce h2 {
      font-size: 20px;
    }
    .description p{
      font-size: 16px;
    }
    .profile-content li {
      font-size: 15px;
    }
  }

  @media screen and (min-width:660px) {
    .description {
      margin: 0 100px;
    }
  }

  @media screen and (min-width:768px) {
    .user-meta img {
      height: 96px;
      width: 96px;
    }
    .user-introduce h2 {
      font-size: 22px;
    }
  }

  @media screen and (min-width:960px) {
    input[type="text"] {
      margin-top: 6px;
      height: 22px;
    }
  }

</style>

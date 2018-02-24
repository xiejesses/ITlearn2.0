<template>
  <div class="user">
    <main>
      <section class="public-profile">
        <div class="user-data">
          <div class="user-meta">
            <div class="user-avatar">
              <v-gravatar :email="userInfo.userEmail" size='40' />
            </div>
            <div class="user-introduce">
              <span v-if="isSave" class="save">
                <i @click="saveEdit" class="el-icon-check" title="保存"></i>
                <i @click="cancleEdit" class="el-icon-close" title="取消"></i>
              </span>
              <span v-else v-show="userName == currentUser" class="edit">
                <i @click="edit" class="el-icon-edit" title="设置"></i>
              </span>
              <!-- <input v-if="isEdit" type="text" v-model="userName"> -->
              <!-- <h2 v-else>{{userInfo.userName}}</h2> -->
              <h2>{{userInfo.userName}}</h2>
              <!-- <span>{{userInfo.userName}}</span> -->
              <textarea v-if="isEdit" v-model="userInfo.userIntro" name="" id="" cols="30" rows="2"></textarea>
              <!-- <input v-if="isEdit" type="text" v-model="userInfo.userIntro"> -->
              <pre v-else class="description">
              <p >{{userInfo.userIntro}}</p>
              </pre>
              <!-- <p v-else class="description">{{userInfo.userIntro}}</p> -->
            </div>
          </div>
          <div class="profile-content">
            <ul>
              <li>
                <div class="digits">{{userInfo.following.length}}</div>
                正在关注
              </li>
              <li>
                <div class="digits">{{follower}}</div>
                关注者
              </li>
              <li>
                <div class="digits">{{userInfo.lovelink.length}}</div>
                喜欢
              </li>
            </ul>
          </div>
          <div class="follow">
            <!-- <button v-show="userName !== currentUser" @click="follow">关注</button> -->
            <button v-show="userName !== currentUser" @click="follow">{{followmsg}}</button>
          </div>
        </div>
      </section>
      <section >
        <div class="tab">
          <router-link :to="{ name: 'user_article'}" exact="true" class="ListItem">收藏({{userInfo.lovelink.length}})</router-link>
          <span class="separator"> / </span>
          <router-link :to="{ name: 'group'}" class="ListItem">小组({{userInfo.lovegroup.length}})</router-link>
        </div>
        <router-view></router-view>
        <!-- <router-view :key="key"></router-view> -->
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
        currentUser:'',
        userInfo:[],
        followmsg:'关注',
        follower:'',
        isEdit: false,
        isSave: false,
        msg: 'Design & front end development. Also a back end engineer'
        // msg: '一起学习 vue 相关的知识,探索和发现各种技巧,提出你踩过的坑一起学习 vue 相关的知识,探索和发现各种技巧,提出你踩过的坑'
      }
    },
    computed: {
      // key() {
      //     return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
      // }
    },
    mounted() {
      this.fetchUserInfo();
      this.currentUser = localStorage.getItem('userName');
      this.userName = this.$route.params.uName;

    },
    methods: {
      saveEdit() {
        this.isEdit = false;
        this.isSave = false;
        this.$http.post('/users/updateintro',{
           userName:this.$route.params.uName,
          userIntro:this.userInfo.userIntro
        })
        .then(response => {
          let res = response.data;
          if(res.status == "1") {
            this.$message.success(`更新成功`);
          } else {
            this.$message.success(`出现错误，请重试`)
          }
        })
      },
      cancleEdit() {
        this.isEdit = false;
        this.isSave = false;
      },
      edit() {
        this.isSave = true;
        this.isEdit = true;
      },

      fetchUserInfo() {
        // let param = {
        //     userName:this.$route.params.uName,
        //     currentUser:this.currentUser
        //   }
        this.$http.post('/users/getuserinfo',{
          userName:this.$route.params.uName,
          currentUser:localStorage.getItem('userName')
        })
          .then(response => {
            let res = response.data;
            if(res.status == '1') {
              this.userInfo = res.doc;
              this.follower = res.doc.follower.length;
              if(res.currentuser.following.indexOf(res.doc._id) === -1) {
                this.followmsg = "关注"
              } else {
                this.followmsg = "取消关注"
              }
              // console.log(`this.lovelinkid:${this.lovelinkid}`)
              // console.log('lovelink-成功')
            } else {
              // console.log('lovelink-失败')
            }
          })
      },
      follow() {
        this.$http.post('/users/following',{
           userName:this.$route.params.uName,
          currentUser:this.currentUser
        })
        .then(response => {
          let res = response.data;
          if(res.status == "1") {
            this.followmsg = "取消关注";
            this.follower++;
            this.$message.success(`关注成功`);
          } else if(res.status == "0") {
            this.followmsg = "关注";
            this.follower--;
            this.$message.success(`${res.message}`)
          } else {
            this.$message.success(`出现错误`)
          }
        })
      }
    },

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  /* resize:vertical */
}
pre {
  /* margin: -30px auto; */
  /* margin-bottom: -30px; */
  /* height:60px; */
  white-space: pre-wrap;
  /* height:min-content; */
  /* padding: 0; */
}
  main {
    width: 100%;
    margin: 5px auto;
    height: auto;
    /* border: 1px solid green; */
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
    /* padding: 5px 0 0 0; */
    /* font-size: 20px; */
    color: #bdc2c6;
    margin: 0px 30px;
  }
  .description p {
    font-size: 15px;
    margin: 0 0 -20px 0;
  }

  input[type="text"] {
    display: block;
    /* margin-top: 10px; */
    /* align-items: center; */
    /* padding: 0 0 0 0; */
    border: none;
    font-size: 14px;
    color: black;
    margin-top: 13px;
    height: 20px;
    /* margin: 0 30px; */
  }

  .user-meta img {
    height: 64px;
    width: 64px;
    border-radius: 50%;
  }
  /* .profile-content {
    margin-top: -25px;
  } */
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
  /* .profile-content li:hover {
    color: #bdc2c6;
  } */

  .profile-content li+li {
    border-left: 1px solid #8c8585;
    padding-left: 10px;
  }

  .follow {
    margin-bottom: 10px;
    width: 100px;
    /* border: 1px solid red; */
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
      /* border-radius: 50%; */
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
      /* border-radius: 50%; */
    }
    .user-introduce h2 {
      font-size: 22px;
    }
  }

  @media screen and (min-width:960px) {
    /* main {
      width: 720px;
      margin: 5px auto;
      height: auto;
    } */
    input[type="text"] {
      margin-top: 6px;
      height: 22px;
    }
  }

  /* @media screen and (min-width:1200px) {
    main {
      width: 940px;
      width: 70%;
      margin: 5px auto;
      height: auto;
    }
  }
  @media screen and (min-width:1600px) {
    main {
      width: 940px;
      width: 65%;
      margin: 5px auto;
      height: auto;
    }
  } */

</style>

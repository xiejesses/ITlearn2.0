<template>
  <div class="user">
    <main>
      <section class="public-profile">
        <div class="user-data">
          <div class="user-meta">
            <div class="user-avatar">
              <v-gravatar email="816657874@qq.com" size='40' />
            </div>
            <div class="user-introduce">
              <span v-if="isSave" class="save">
                <i @click="saveEdit" class="el-icon-check" title="保存"></i>
                <i @click="cancleEdit" class="el-icon-close" title="取消"></i>
              </span>
              <span v-else class="edit">
                <i @click="edit" class="el-icon-edit" title="设置"></i>
              </span>
              <input v-if="isEdit" type="text" v-model="userName">
              <h2 v-else>{{userName}}</h2>
              <input v-if="isEdit" type="text" v-model="msg">
              <p v-else class="description">{{msg}}</p>


              <!-- <p class="description">渣渣的前端工程师渣渣的前端工程师渣渣的前端工程师</p> -->
              <!-- <p  v-else style="white-space: pre-line;">{{ msg }}</p> -->
              <!-- <p v-else class="description">Design & front end development. Also a back end engineer</p> -->
              <!-- <p class="description">Design & front end developmenront end development. Also Wordpress themingt. Also Wordpress themingront end development. Also Wordpress theming</p> -->
            </div>
          </div>
          <div class="profile-content">
            <ul>
              <li>
                <div class="digits">83</div>
                正在关注
              </li>
              <li>
                <div class="digits">234</div>
                关注者
              </li>
              <li>
                <div class="digits">51</div>
                喜欢
              </li>
            </ul>
          </div>
          <div class="follow">
            <button>正在关注</button>
          </div>
        </div>
      </section>
      <section>
        <div class="tab">
          <router-link :to="{ name: 'article'}" exact="true" class="ListItem">收藏</router-link>
          <span class="separator"> / </span>
          <router-link :to="{ name: 'group'}" class="ListItem">小组</router-link>
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
        userName: 'Jesses',
        isEdit: false,
        isSave: false,
        msg: 'Design & front end development. Also a back end engineer'
        // msg: '一起学习 vue 相关的知识,探索和发现各种技巧,提出你踩过的坑一起学习 vue 相关的知识,探索和发现各种技巧,提出你踩过的坑'
      }
    },
    methods: {
      saveEdit() {
        this.isEdit = false;
        this.isSave = false;
      },
      cancleEdit() {
        this.isEdit = false;
        this.isSave = false;
      },
      edit() {
        this.isSave = true;
        this.isEdit = true;
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  main {
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
    padding: 5px 0 0 0;
    font-size: 14px;
    color: #bdc2c6;
    margin: 0 30px;
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
    .description {
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
    main {
      width: 720px;
      margin: 5px auto;
      height: auto;
    }
    input[type="text"] {
      margin-top: 6px;
      height: 22px;
    }
  }

  @media screen and (min-width:1200px) {
    main {
      width: 940px;
      margin: 5px auto;
      height: auto;
    }
  }

</style>

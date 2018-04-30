<template>
  <div class="vindex">
    <header class="header">
      <section class="mini-header">
        <h1 class="logo">
          <router-link to="/" title="ITlearn">
            <!-- <svg width="43px" height="48px" viewBox="0 0 43 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>Front-End Front</title>
              <g>
                <path d="M3.8429071,43.1027008 L0,0 L42.2269264,0 L38.3799448,43.0959488 L21.0876195,47.8899496 L3.8429071,43.1027008 L3.8429071,43.1027008 Z"
                  fill="#2DBF80" class="shield"></path>
                <path d="M20.3974609,14.0546875 L14.5126953,21.6689453 L20.3974609,29.2832031 L17.2753906,31.6416016 L7.93164062,21.6689453 L17.2753906,11.6962891 L20.3974609,14.0546875 L20.3974609,14.0546875 Z M22.4521484,14.0546875 L28.3369141,21.6689453 L22.4521484,29.2832031 L25.5742188,31.6416016 L34.9179688,21.6689453 L25.5742188,11.6962891 L22.4521484,14.0546875 L22.4521484,14.0546875 Z"
                  fill="#FFFFFF" class="angle-brackets"></path>
              </g>
            </svg> -->


            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="100px"
              height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" class="logo">
              <path d="M50.07,0.212c-27.614,0-50,22.384-50,49.999c0,9.157,2.474,17.731,6.77,25.111L2.044,98.237l22.917-4.796
          c7.381,4.297,15.954,6.768,25.109,6.768c27.614,0,50-22.385,50-49.999C100.07,22.596,77.684,0.212,50.07,0.212z" class="bubble"
              />
              <path d="M30.991,65.689c-0.594,0-1.188-0.227-1.642-0.681L16.192,51.852c-0.436-0.436-0.679-1.024-0.679-1.642
          c0-0.616,0.245-1.206,0.679-1.642l13.158-13.157c0.906-0.906,2.376-0.906,3.282,0s0.906,2.376,0,3.282L21.116,50.21l11.517,11.518
          c0.906,0.905,0.906,2.376,0,3.281C32.18,65.463,31.585,65.689,30.991,65.689z" class="icon" />
              <path d="M69.15,65.689c-0.594,0-1.188-0.227-1.641-0.679c-0.905-0.907-0.905-2.375,0-3.283L79.024,50.21
          L67.51,38.694c-0.905-0.906-0.905-2.375,0-3.282c0.907-0.907,2.376-0.905,3.283,0l13.155,13.157c0.906,0.906,0.906,2.376,0,3.282
          L70.793,65.009C70.337,65.463,69.744,65.689,69.15,65.689z" class="icon" />
              <path d="M40.201,65.689c-0.485,0-0.973-0.15-1.391-0.464c-1.025-0.769-1.233-2.225-0.464-3.249l19.737-26.315
          c0.768-1.026,2.223-1.234,3.25-0.465c1.025,0.77,1.232,2.225,0.463,3.25L42.06,64.761C41.603,65.369,40.906,65.689,40.201,65.689z"
                class="icon" />
            </svg>

          </router-link>
        </h1>
      </section>
      <nav class="navigation">

        <router-link to="/" :exact="true" class="ListItem">首页</router-link>
        <router-link to="/groupindex" class="ListItem">学习小组</router-link>
        <router-link to="/projectIndex" class="ListItem">项目交流</router-link>
        <router-link to="/shareProject" class="ListItem">分享项目</router-link>
        <router-link to="/share" class="ListItem">分享</router-link>
        <router-link to="/notification" class="LastItem">
          <el-badge :is-dot="isNew" class="item">
            <i class="el-icon-fa el-icon-fa-bell" aria-hidden="true"></i>
          </el-badge>
        </router-link>

        <div id="wrap">
          <!-- <form action="" autocomplete="on"> -->
          <input id="search" v-model="search_condition" name="search" type="text" placeholder="搜索...">
          <router-link :to="{ name: search_name ,query: { query: search_condition}}">
            <a href="javascript:void(0)">
              <i class="el-icon-search"></i>
            </a>
          </router-link>
          <!-- <input id="search_submit" value="Rechercher" type="submit"> -->
          <!-- </form> -->
        </div>

        <!-- <a href="javascript:void(0)" @click="isfocused = true">
            <i class="el-icon-search"></i>
          </a> -->
      </nav>
      <!-- 用户控制中心下拉菜单 -->
      <div class="user-action" v-if="userEmail">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <v-gravatar :email="userEmail" :size='40' :alt="userName" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link :to="{ name: 'user_article', params: { userId: userId }}">
              <el-dropdown-item>我的主页</el-dropdown-item>
            </router-link>
            <!-- <router-link to="/">
              <el-dropdown-item>我的小组</el-dropdown-item>
            </router-link> -->
            <router-link :to="{name: 'admin_home'}" v-if="isManager === 'true'">
              <el-dropdown-item>管理员系统</el-dropdown-item>
            </router-link>
            <router-link to="/about">
              <el-dropdown-item divided>关于</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click.native="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="user-login" v-else>
        <router-link to="/login" class="">登录</router-link>
      </div>
      <!-- 搜索框 -->
      <!-- <section class="search" v-bind:class="{focused: isfocused}" @click="closeModal">
        <form class="search-form" method="get" action="" role="search" v-on:click.stop>
          <input type="text" ref="input" class="search-input" name="s" placeholder="搜索文章..." autofocus>
        </form>
        <span class="search-close" @click="closeModal">x</span>
      </section> -->

      <!-- 弹出菜单 -->
      <div class="hamburger" @click="isvisible=true" v-if="!userName"></div>
      <section class="menu" :class="{visible:isvisible}" @click="isvisible=false">
        <div class="menu-wrapper">
          <ul @click.stop @click="isvisible=false">
            <li>
              <a href="#" class="search-link" @click="isfocused = true">搜索</a>
            </li>
            <li>
              <router-link to="/login" class="">登录</router-link>
            </li>
            <li>
              <router-link to="/share" class="">分享链接</router-link>
            </li>
            <li>
              <router-link to="/shareProject" class="">分享项目</router-link>
            </li>
            <li>
              <router-link to="/group" class="">项目交流</router-link>
            </li>
          </ul>
        </div>
        <span class="menu-close" @click="isvisible=false">x</span>
      </section>
    </header>
    <div class="backTotop" @click="toTop">
      <i class="el-icon-fa-arrow-up"></i>
    </div>
    <!-- <transition name="fade"> -->
    <router-view :key="key"></router-view>
    <!-- </transition> -->

  </div>
</template>

<script>
  window.onscroll = function () {
    if (document.documentElement.scrollTop + document.body.scrollTop > 200) {
      document.querySelector(".backTotop").style.display = "block";
    } else {
      document.querySelector(".backTotop").style.display = "none";
    }
  }
  import {
    mapGetters
  } from 'vuex'
  import {
    mapActions
  } from 'vuex'
  export default {
    name: 'vindex',
    data() {
      return {
        True: true,
        userName: '',
        userEmail: '',
        userId: '',
        isvisible: false,
        isfocused: false,
        search_condition: '',
        search_name: 'search_article',
        isNew: false,
        // showBackToTop:false
      }
    },
    methods: {
      ...mapActions(['userLoginOut']),
      // 登出loginOut
      loginOut() {
        this.userLoginOut();
        if (!localStorage.getItem('token')) {

          this.userName = '';
          this.userEmail = '';
          this.userId = '';
          this.$router.push({
            path: '/'
          }); //不带刷新
          this.$message.success('登出成功');
        } else {
          this.$message.success('登出失败');
        }

      },
      search() {
        // router.push({ name: 'Search', query: { plan: 'private' }})
      },
      blur() {
        this.search_condition = '';
      },
      closeModal() {
        this.isvisible = false;
        this.isfocused = false;
      },
      userInfo() {
        this.userName = localStorage.getItem('userName');
        this.userEmail = localStorage.getItem('userEmail');
        this.userId = localStorage.getItem('userId');
      },

      getNew() {
        if (localStorage.getItem("userId"))
          this.$http.get(this.$config.new.conut.url, {
            params: {
              isSee: false,
              reveicer: Number(localStorage.getItem("userId"))
            }
          })
          .then(response => {
            let data = response.data;
            if (data.status === this.$status.success) {
              this.isNew = data.count !== 0;
            } else {
              this.$message.error(data.message);
            }
          })
          .catch(err => {
            console.log(err);
            console.log(err.stack);
            if (err.response) {
              this.$message.error(err.response.data.message);
            }
          });
      },
      toTop() {

        let distance =
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        //获得当前高度

        let step =
          distance / 50;
        //每步的距离

        (function jump() {

          if (distance >
            0) {

            distance -= step;

            // document.documentElement.scrollTop = distance;

            // document.body.scrollTop = distance;

            window.scrollTo(0, distance);

            setTimeout(jump, 10)

          }

        })();

      },
      showBackToTop() {
        if (document.documentElement.scrollTop + document.body.scrollTop > 200) {
          document.querySelector(".backTotop").style.display = "block";
        } else {
          document.querySelector(".backTotop").style.display = "none";
        }
      }

    },
    watch: {
      '$route': 'userInfo',
    },
    mounted() {
      this.userName = localStorage.getItem('userName');
      this.userEmail = localStorage.getItem('userEmail');
      this.userId = localStorage.getItem('userId');
      this.isManager = localStorage.getItem('isManager');
      this.search_name = this.$route.name === 'search_group' ? 'search_group' : 'search_article';
      this.getNew();
      this.showBackToTop();
    },

    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html,
  body {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  i {
    margin-left: 20px;
    font-size: 16px;
  }

  /**********
main区
**********/

  .vindex {
    margin: 0 auto;
    height: auto;
  }

  @media screen and (min-width:960px) {
    .vindex {
      width: 720px;
      margin: 0 auto;
      height: auto;
    }
  }

  @media screen and (min-width:1200px) {
    .vindex {
      width: 75%;
      margin: 0 auto;
      height: auto;
    }
  }

  @media screen and (min-width:1600px) {
    .vindex {
      width: 65%;
      margin: 0 auto;
      height: auto;
    }
  }



  .header {
    height: 89px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    border-bottom: 3px solid #f3f3f3;
  }

  .mini-header {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    margin: -5px 0 0 12px;
  }

  @media screen and (min-width:960px) {
    .mini-header {
      position: fixed;
      left: 20px;
      top: 5px;
    }
  }

  .navigation .router-link-active {
    background: #f3f3f3;
  }

  /*注意css执行顺序，后面的会覆盖前面的*/

  .menu-wrapper li:nth-child(4) {
    visibility: hidden;
  }

  @media screen and (max-width:1500px) {
    .header {
      height: 89px;
      margin: 0 auto;
      display: flex;
    }

  }

  @media screen and (max-width:1201px) {
    .header {
      height: 89px;
      margin: 0 auto;
      display: flex;
    }
  }

  @media screen and (max-width:960px) {
    .header {
      height: 80px;
    }
    .navigation {
      display: flex;
      justify-content: center;
    }
    .LastItem,
    .el-icon-search,
    .user-login a {
      display: none;
    }

    .hamburger {
      display: inline-block;
      position: absolute;
      top: 30px;
      right: 20px;
      background: url("https://d22wsyl1zemnyu.cloudfront.net/images/visuals-1.7.min.gz.svg") no-repeat -80px -100px;
      width: 42px;
      height: 19px;
      vertical-align: middle;
      cursor: pointer;
    }
  }

  @media screen and (max-width:500px) {
    .header {
      height: 80px;
    }
    .navigation {
      display: flex;
      justify-content: center;
      margin-right: 25px;
    }
    .navigation a:nth-child(3) {
      display: none;
    }
    .menu-wrapper li:nth-child(4) {
      visibility: visible;
    }
    .LastItem,
    .el-icon-search {
      display: none;
    }
  }

  .navigation {
    width: 100%;
    font-size: 10px;
    min-height: 27.5px;
    display: flex;
    align-items: center;
  }

  .user-login {
    position: absolute;
    right: 30px;
    top: 30px;
    border: 1px solid #2DBF80;
    background: #2DBF80;
  }

  .user-login:hover {
    background: #9cd5b3;
    border-color: #9cd5b3;
  }

  .user-login a {
    padding: 5px 13px;
  }

  .navigation a,
  .user-login a,
  .menu-wrapper a {
    font-size: 16px;
    color: #54595f;
    text-decoration: none;
  }

  .user-login a {
    color: white;
  }

  .navigation a:nth-child(6) {
    color: #2DBF80;
  }

  .ListItem {
    padding: 6px 17px;
    border: 2px solid #f3f3f3;
  }

  .ListItem+.ListItem {
    margin-left: -2px;
  }

  .LastItem {
    margin-left: auto;
    background: none !important;
  }

  /************
  用户控制中心
**************/

  .user-action a {
    text-decoration: none;
  }

  .user-action {
    position: absolute;
    right: 20px;
    top: 24px;
    display: block;
  }

  .user-action img {
    cursor: pointer;
    border-radius: 50%;
    height: 30px;
    width: 30px;
  }

  @media screen and (min-width:960px) {
    .user-action {
      position: absolute;
      right: 30px;
      top: 25px;
      display: block;
    }
    .user-action img {
      cursor: pointer;
      border-radius: 50%;
      height: 35px;
      width: 35px;
    }
  }


  .el-dropdown-menu a {
    text-decoration: none;
  }

  /***********
    弹出菜单
**************/

  .menu {
    opacity: 0;
    transition-delay: 0ms, 200ms, 200ms;
    height: 0;
    width: 0;
    top: 0;
    left: 0;
    position: fixed;
    overflow: hidden;
    transform: scale(1, 1);
    background: #fff;
    text-align: center;
    visibility: hidden;
    z-index: 4;
    cursor: pointer;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }

  .menu-wrapper {
    margin: 0 auto;
    text-align: center;
  }

  .menu-wrapper a {
    font-size: 20px;
  }

  @media screen and (min-width:500px) {
    .menu-wrapper a {
      font-size: 25px;
    }
  }

  @media screen and (min-width:960px) {
    .menu-wrapper a {
      font-size: 30px;
    }
  }

  .menu-wrapper li {
    margin-bottom: 10px;
  }

  .menu-close {
    border: 0;
    top: 11px;
    right: 11px;
    font-size: 32px;
    color: #bfbfbf;
    position: absolute;
    cursor: pointer;
  }

  .visible {
    opacity: 0.98;
    transition-delay: 0ms;
    height: 100%;
    width: 100%;
    transform: scale(1);
    visibility: visible;
  }

  /**************
      搜索框
**************/

  #wrap a {
    text-decoration: none;
    background: none;
  }

  input[type="text"] {
    height: 30px;
    font-size: 17px;
    width: 150px;
    border: none;
    border-bottom: 1px solid #BBB;
    margin-left: 15px;
    margin-right: -20px;
    /* font-family: "Lato"; */
    font-weight: 100;
    outline: none;
    color: #555;
    background: none;
    cursor: pointer;
  }




  .search {
    opacity: 0;
    height: 0;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 0;
    background: #fff;
    visibility: hidden;
    z-index: 4;
    cursor: pointer;
  }

  .focused {
    opacity: 0.99;
    transition-delay: 0ms;
    height: 100%;
    width: 100%;
    transform: scale(1);
    visibility: visible;
    z-index: 5;
  }

  .search-form {
    padding: 40px 0 0 0;
    position: relative;
    margin: 0 auto;
    width: 80%;
  }

  .search-input {
    display: block;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 22px;
    line-height: 22px;
    color: #37414c;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  @media screen and (min-width:500px) {
    .search-input {
      font-size: 30px;
      line-height: normal;
    }
  }

  @media screen and (min-width:960px) {
    .search-input {
      width: 720px;
      position: absolute;
      margin: auto;
      height: auto;
      font-size: 48px;
    }
  }

  .search-close {
    border: 0;
    top: 11px;
    right: 11px;
    font-size: 32px;
    color: #bfbfbf;
    position: absolute;
    cursor: pointer;
  }


  .logo {
    width: 43px;
    height: 48px;
    animation: bounceIn 0.6s;
    transform: rotate(0deg) scale(1) translateZ(0);
    transition: all 0.4s cubic-bezier(.8, 1.8, .75, .75);
    cursor: pointer;
  }

  .logo:hover {
    transform: rotate(10deg) scale(1.1);
  }

  .bubble {
    fill: #2DBF80;
  }

  .icon {
    fill: #fff;
  }

  @keyframes bounceIn {
    0% {
      opacity: 1;
      transform: scale(.3);
    }

    50% {
      opacity: 1;
      transform: scale(1.05);
    }

    70% {
      opacity: 1;
      transform: scale(.9);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* 回到顶部 */

  .backTotop {
    position: fixed;
    right: 30px;
    bottom: 20px;
  }
  .backTotop i:hover{
    color:#2DBF80;
  }
.el-icon-fa-arrow-up:before {
    font-size: 30px;
  }
  .backTotop i {
    color: #34e79a;
    cursor: pointer;
  }

  

</style>

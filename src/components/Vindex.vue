<template>
  <div class="vindex">
    <header class="header">
      <section class="mini-header">
        <h1 class="logo">
          <router-link to="/" title="ITlearn">
            <svg width="43px" height="48px" viewBox="0 0 43 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <title>Front-End Front</title>
              <g>
                <path d="M3.8429071,43.1027008 L0,0 L42.2269264,0 L38.3799448,43.0959488 L21.0876195,47.8899496 L3.8429071,43.1027008 L3.8429071,43.1027008 Z"
                  fill="#2DBF80" class="shield"></path>
                <path d="M20.3974609,14.0546875 L14.5126953,21.6689453 L20.3974609,29.2832031 L17.2753906,31.6416016 L7.93164062,21.6689453 L17.2753906,11.6962891 L20.3974609,14.0546875 L20.3974609,14.0546875 Z M22.4521484,14.0546875 L28.3369141,21.6689453 L22.4521484,29.2832031 L25.5742188,31.6416016 L34.9179688,21.6689453 L25.5742188,11.6962891 L22.4521484,14.0546875 L22.4521484,14.0546875 Z"
                  fill="#FFFFFF" class="angle-brackets"></path>
              </g>
            </svg>
          </router-link>
        </h1>
      </section>
      <nav class="navigation">
        
        <router-link to="/" exact="true" class="ListItem">首页</router-link>
        <router-link to="/group" class="ListItem">学习小组</router-link>
        <router-link to="/project" class="ListItem">项目交流</router-link>
        
        <router-link to="/share" class="LastItem">分享链接</router-link>
        <a href="javascript:void(0)" @click="isfocused = true">
          <i class="el-icon-search"></i>
        </a>
      </nav>
      <!-- 用户控制中心下拉菜单 -->
      <div class="user-action" v-if="userName">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <v-gravatar email="835614574@qq.com" size='40' />
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link :to="{ name: 'like', params: { uName: userName }}">
              <el-dropdown-item>我的主页</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>我的小组</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>我的项目</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item divided>关于</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item divided>退出</el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="user-login" v-else>
        <router-link to="/login" class="">登录</router-link>
      </div>
      <!-- 搜索框 -->
      <section class="search" v-bind:class="{focused:isfocused}" @click="closeModal">
        <form class="search-form" method="get" action="" role="search" v-on:click.stop>
          <input type="text" ref="input" class="search-input" name="s" placeholder="搜索文章..." autofocus>
        </form>
        <span class="search-close" @click="closeModal">x</span>
      </section>

      <!-- 弹出菜单 -->
      <div class="hamburger" @click="isvisible=true" v-if="!userName"></div>
      <section class="menu" v-bind:class="{visible:isvisible}" @click="isvisible=false">
        <div class="menu-wrapper">
          <ul v-on:click.stop>
            <li>
              <a href="#" class="search-link" @click="isfocused = true">搜索</a>
            </li>
            <li @click="isvisible=false">
              <router-link to="/" class="">登录</router-link>
            </li>
            <li>
              <router-link to="/group" class="">分享链接</router-link>
            </li>
            <li>
              <router-link to="/group" class="">项目交流</router-link>
            </li>
          </ul>
        </div>
        <span class="menu-close" @click="isvisible=false">x</span>
      </section>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        userName: "",
        isvisible: false,
        isfocused: false,
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      closeModal() {
        this.isvisible = false;
        this.isfocused = false;
      }
    },
    mounted() {
      this.$refs['input'].focus()
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
    margin-left: 2rem;
    font-size: 1.6rem;
  }

  .header {
    height: 89px;
    width: 940px;
    margin: 0 auto;
    display: flex;
    border-bottom: 3px solid #f3f3f3;
  }

  .navigation .router-link-active {
    background: #f3f3f3;
  }
  /* @media screen and(min-width: 501px) {
  .menu-wrapper li:nth-child(3) {
    visibility: hidden;
  }
} */
  /*注意css执行顺序，后面的会覆盖前面的*/

  .menu-wrapper li:nth-child(4) {
    visibility: hidden;
  }

  @media screen and (max-width:1500px) {
    .header {
      height: 89px;
      width: 940px;
      margin: 0 auto;
      display: flex;
    }
  }

  @media screen and (max-width:1201px) {
    .header {
      height: 89px;
      width: 720px;
      margin: 0 auto;
      display: flex;
    }
  }

  @media screen and (max-width:960px) {
    .header {
      height: 80px;
      width: 100%;
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
      width: 100%;
    }
    .navigation {
      display: flex;
      justify-content: center;
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

  .mini-header {
    position: fixed;
    left: 10px;
    top: 10px;
    margin: 0;
    padding: 0;
  }

  .navigation {
    width: 100%;
    font-size: 1rem;
    min-height: 2.75rem;
    display: flex;
    align-items: center;
  }

  .user-login {
    position: absolute;
    right: 3rem;
    top: 2.6rem;
    display: block;
  }

  .navigation a,
  .user-login a,
  .menu-wrapper a {
    font-size: 1.6rem;
    color: #54595f;
    text-decoration: none;
  }

  .user-login a {
    color: #2DBF80;
  }

  .navigation a:nth-child(4) {
    color: #2DBF80;
  }

  .ListItem {
    padding: .6rem 1.7rem;
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
  .user-action {
    position: absolute;
    right: 3rem;
    top: 2.2rem;
    display: block;
  }
  .user-action a {
    text-decoration: none;
  }
  .user-action img {
    cursor: pointer;
    border-radius: 50%;
  }
  .el-dropdown-menu a {
    text-decoration: none;
    /* color: #818181; */
    /* font-size: 3rem; */
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
    font-size: 2rem;
  }

  @media screen and (min-width:500px) {
    .menu-wrapper a {
      font-size: 2.5rem;
    }
  }

  @media screen and (min-width:960px) {
    .menu-wrapper a {
      font-size: 3rem;
    }
  }

  .menu-wrapper li {
    margin-bottom: 1rem;
  }

  .menu-close {
    border: 0;
    top: 11px;
    right: 11px;
    font-size: 3.2rem;
    color: #bfbfbf;
    position: absolute;
    cursor: pointer;
  }

  .visible {
    opacity: 0.88;
    transition-delay: 0ms;
    height: 100%;
    width: 100%;
    transform: scale(1);
    visibility: visible;
  }
  /**************
      搜索框
**************/

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
    padding: 4rem 0 0 0;
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
    font-size: 2.2rem;
    line-height: 2.2rem;
    color: #37414c;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  @media screen and (min-width:500px) {
    .search-input {
      font-size: 3rem;
      line-height: normal;
    }
  }

  @media screen and (min-width:960px) {
    .search-input {
      width: 72rem;
      position: absolute;
      margin: auto;
      height: auto;
      font-size: 4.8rem;
    }
  }

  .search-close {
    border: 0;
    top: 11px;
    right: 11px;
    font-size: 3.2rem;
    color: #bfbfbf;
    position: absolute;
    cursor: pointer;
  }

</style>

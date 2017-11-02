<template>
  <div class="vindex">
    <header class="header">
      <!-- <div class="logo">
        <span class="logo-name">ITlearn</span>
      </div> -->
      <!-- <div class="nav"> -->
        <nav class="navigation">
            <router-link to="/" exact="true" class="navItemL">首页</router-link>
            <router-link to="/group" class="navItemL">学习小组</router-link>
            <router-link to="/project" class="navItemL">项目交流</router-link>
          <!-- <ul class="left">
            <li>
              <router-link to="/" exact="true" class="navItemL">首页</router-link>
            </li>
            <li>
              <router-link to="/group" class="navItemL">学习小组</router-link>
            </li>
            <li>
              <router-link to="/project" class="navItemL">项目交流</router-link>
            </li>
          </ul> -->
        
          <section class="user-action">
              <router-link to="/group" class="navItemR">分享链接</router-link>
              <router-link to="/group" class="navItemR">登录</router-link>
            <!-- <ul class="right">
              <li>
                <router-link to="/group" class="navItemR">分享链接</router-link>
              </li>
              <li>
                <router-link to="/group" class="navItemR">登录</router-link>
              </li>
            </ul> -->
          </section>
          </nav>
      <!-- </div> -->


    </header>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'vindex',
    data() {
      return {
        msg: 'jesses'
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    padding: 0;

    /* display: flex; */
  }

  li {
    font-size: 1.8rem;
    list-style: none;
    display: inline-block;
  }
  .navItemL {
      margin-right: 1.6rem;
  }
  .navItemR {
      margin-left: auto;
  }
  .left li {
    
    border-radius: 2px;
    border: 2px solid #f3f3f3;
  }

  .right li {}

  li a {
    color: #54595f;
    text-decoration: none;
  }

  .header {
    height: 100px;
    width: 94rem;
    margin: 0 auto;
    display: flex;
    
    /* padding: 0 1.6rem; */
    /* background: red; */
  }

  .logo {
    /* display: inline-block;
    float: left;
    z-index: 1000; */
  }

  .logo-name {
    font-size: 1.6rem;
  }
 .nav {
     /* width: 70%; */
     /* height: auto; */
     /* margin: 0 auto; */
     /* overflow: hidden; */
     border: 1px solid green;
     /* z-index: 999; */
 }
  .navigation {
      display: flex;
      align-items: center;
    /* display: inline-block;
    float: left; */
  }

  .user-action {
    /* display: inline-block;
    float: right; */
  }

</style>

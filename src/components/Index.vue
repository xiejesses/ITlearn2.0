<template>
  <div class="index">
    <main>
      <section class="articles">
        <ul class="articles-list">
          <!-- <li v-for="article in articles" v-bind:key="article.id"> -->
          <li>
            <section class="user-avatar">
              <v-gravatar email="835614574@qq.com" size='40' />
            </section>
            <section class="article-title">
              <div class="domain">webkit.org</div>
              <h2>
                <a href="http://localhost:8080/" class="article-link">Release Notes for Safari Technology Preview 43</a>
              </h2>
              <div class="meta">
                <router-link :to="{ name: 'like', params: { uName: userName }}">{{userName}}</router-link>
                <span class="separator"> • </span>
                <abbr class="timeago" :title="creatTime">{{moment(creatTime, "YYYYMMDDHHmmss").fromNow()}}</abbr>
                <span class="separator"> • </span>
                <router-link :to="{ name: 'like', params: { uName: userName }}">Vue</router-link>
                <span>
                <a href="javascript:void(0)" @click="isHeartClick = !isHeartClick"><span class="separator"> • </span ><i class="heart el-icon-fa el-icon-fa-heart-o"  v-bind:class="{heartclick:isHeartClick}" aria-hidden="true"></i></a>
                </span>
                 <!-- v-bind:class="{heart-click:isHeartClick}" -->
              </div>
            </section>
            <!-- 投票这里有个问题，点击当前文章的投票，其它的也改变了样式 -->
            <section class="article-vote" @click="isupmod = true">
              <span class="score" v-bind:class="{scored:isupmod}">{{score}}</span>
              <span class="arrow up" v-bind:class="{upmod:isupmod}" @click="score += 1"></span>
            </section>
          </li>
          <li>
            <section class="user-avatar">
              <v-gravatar email="835614@qq.com" size='40' />
            </section>
            <section class="article-title">
              <div class="domain">juejin.im</div>
              <h2>
                <a href="#" class="article-link">面向未来的前端数据流框架 - dob</a>
              </h2>
              <div class="meta">
                <router-link :to="{ name: 'like', params: { uName: userName }}">小道消息</router-link>
                <span class="separator"> • </span>
                <abbr class="timeago" :title="creatTime">{{moment(creatTime, "YYYYMMDDHHmmss").fromNow()}}</abbr>
                <span class="separator"> • </span>
                <router-link :to="{ name: 'like', params: { uName: userName }}">前端</router-link>
                <a href="javascript:void(0)"><span class="separator"> • </span><i class="heart el-icon-fa el-icon-fa-heart-o" aria-hidden="true"></i></a>
              </div>
            </section>
            <section class="article-vote">
              <span class="score">8</span>
              <span class="arrow up"></span>
            </section>
          </li>
         
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        userName: 'jesses',
        creatTime: '2017-11-2 16:30:20',
        score:10,
        isupmod:false,
        isHeartClick:false
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul,
  li,
  a {
    padding: 0;
    margin: 0;
    list-style: none;
    /* text-decoration: none; */
  }
  /**********
main区
**********/

  main {
    margin: 0 auto;

    /* border: 1px solid green; */
    height: auto;
  }

  @media screen and (min-width:960px) {
    main {
      width: 720px;
      margin: 0 auto;

      /* border: 1px solid green; */
      height: auto;
    }
  }

  @media screen and (min-width:1200px) {
    main {
      width: 940px;
      margin: 0 auto;

      /* border: 1px solid green; */
      height:auto;
    }
  }
  /**********
文章列表li
**********/

  .articles li {
    border-bottom: 1px solid #f3f3f3;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
  }

  .article-title {
    padding: 15px 0;
    -webkit-box-flex: 1;
    flex: 1;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .article-title h2 a:hover {
    /* color:red; */
  }
  /* .article-title h2 a:visited {
    color: #9a9a9a;
  } */
  
  @media screen and (min-width:1200px) {
    .article-title {
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;
    }
  }
  /**********
用户头像
***********/

  .user-avatar {
    width: 20px;
    height: 20px;
    margin: 17px 7px 0 4px;
    align-self: baseline;
  }

  .user-avatar img {
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }

  @media screen and (min-width:660px) {
    .user-avatar {
      width: 45px;
      height: 45px;
      margin: 0px 15px 0 4px;
      align-self: center;
    }
    .user-avatar img {
      border-radius: 50%;
      height: 45px;
      width: 45px;
    }
  }
  /**********
domain区
**********/

  .domain {
    font-size: 1.4rem;
    color: #bfbfbf;
  }

  @media screen and (min-width:500px) {
    .domain {
      font-size: 1.6rem;
    }
  }

  @media screen and (min-width:768px) {
    .domain {
      margin: 0 0 4px 0;
      font-size: 1.8rem;
    }
  }
  /**********
文章标题
**********/

  .articles h2 a {
    font-size: 1.8rem;
    color: #54595f;
    text-decoration: none;
  }

  @media screen and (min-width:500px) {
    .articles h2 a {
      font-size: 2rem;
    }
  }

  @media screen and (min-width:660px) {
    .articles h2 a {
      font-size: 2.1rem;
      line-height: 2.8rem;
    }
  }

  @media screen and (min-width:1200px) {
    .articles h2 a {
      font-size: 2.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  /*********
meta信息
***********/

  .meta {
    color: #8f8f8f;
    font-size: 1.2rem;
    line-height: 1.8rem;
    position: relative;
  }

  .meta a {
    color: #8f8f8f;
    padding: 3px 0 0 0;
    text-decoration: none;
    border-bottom: 2px solid #f3f3f3;
  }
  .meta a:last-child {
      border: 0 !important;
    }
  .heart::before{
    font-size: 1.3rem;
    
}
.heartclick {
  color: #EC681B;
}

  abbr {
    font-size: 1.1rem;
  }

  @media screen and (min-width:500px) {
    .meta {
      font-size: 1.4rem;
      margin: 3px 0 4px 0;
    }
    abbr {
      font-size: 1.3rem;
    }
    .heart::before{
    font-size: 1.4rem;
}
  }

  @media screen and (min-width:768px) {
    .meta {
      font-size: 1.5rem;
      line-height: 2.4rem;
    }
    /* .meta a:last-child {
      border: 0 !important;
    } */
    .heart::before{
    font-size: 1.5rem;
}
  }
  .separator {
    padding: 0 3px;
    color: #bfbfbf;
  }

/*********
  箭头
*********/
.up {
  background: url(https://d22wsyl1zemnyu.cloudfront.net/images/visuals-1.7.min.gz.svg) no-repeat -300px -297px;
  display: inline-block;
  width:16px;
  height: 16px;
  cursor: pointer;
  outline: none;
  position: relative;
}
.upmod:hover {
  -webkit-animation: none !important;
  animation: none !important;
}
.upmod {
  background: url("https://d22wsyl1zemnyu.cloudfront.net/images/visuals-1.7.min.gz.svg") no-repeat -400px -397px;
  display: inline-block;
  width: 16px;
  height: 16px;
  cursor: pointer;
  outline: none
}
.scored {
  color:#e0e0e0 !important;
}


@-webkit-keyframes slideDown {
  0% {
    background-position: -300px -297px
  }
  25% {
    background-position: -300px -300px
  }
  75% {
    background-position: -300px -294px
  }
  100% {
    background-position: -300px -297px
  }
}

@keyframes slideDown {
  0% {
    background-position: -300px -297px
  }
  25% {
    background-position: -300px -300px
  }
  75% {
    background-position: -300px -294px
  }
  100% {
    background-position: -300px -297px
  }
}
.up:hover {
  -webkit-animation: slideDown 0.5s linear;
  animation: slideDown 0.5s linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards
}

.article-vote {
  width:50px;
  text-align: right;
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  align-items: center;
  align-self: flex-start;
  margin: 15px 10px 0 0;
  overflow: hidden;
}
@media screen and (min-width:500px){
  .article-vote {
    width:60px;

  }
}
@media screen and (min-width:660px){
  .article-vote {
    text-align: right;
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    align-items: center;
    align-self: center;
    margin: 0 10px 0 0;
  }
}
@media screen and (min-width:1200px){
  .article-vote {
    width: 85px;
    margin: 0;
  }
}

.score {
  font-size: 1.4rem;
  color: #8f8f8f;
  margin: 0 4px 0 0;
  position: relative;
  display: inline-block;
  transition:transform 0.3s, -webkit-transform 0.3s;
  line-height: 2.4rem;
}
@media screen and (min-width:500px){
  .score {
    font-size: 1.7rem;
  }
}

</style>

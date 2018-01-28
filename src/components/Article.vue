<template>
  <div class="index">
    <!-- <main class="loading" v-if="loading">
      <div class="load-wrapp">
            <div class="load-5">
                <div class="ring-2">
                    <div class="ball-holder">
                        <div class="ball"></div>
                    </div>
                </div>
            </div>
        </div>
    </main> -->
    <!-- <main v-else> -->
      <main>
      <div class="sort">
          <i class="el-icon-fa el-icon-fa-list-ul" aria-hidden="true" title="列表"></i>
          <i class="el-icon-fa el-icon-fa-th" aria-hidden="true" title="分类"></i>
        </div>
        <section class="articles">
        <ul class="articles-list">
          <li v-for="(article,index) in articles" v-bind:key="article.id">
          <!-- <li> -->
            <section class="user-avatar">
              <!-- <v-gravatar email="8356145741@qq.com" size='40' /> -->
              <v-gravatar v-bind:email="article.email" size='40' />
            </section>
            <section class="article-title">
              <!-- <div class="domain">webkit.org</div> -->
              <div class="domain">{{ article.domain }}</div>
              <h2>
                <!-- <a href="http://localhost:8080/" class="article-link">Release Notes for Safari Technology Preview 43</a> -->
                <a href="http://localhost:8080/" class="article-link">{{article.articleTitle}}</a>
              </h2>
              <div class="meta">
                <!-- <router-link :to="{ name: 'like', params: { uName: userName }}">{{userName}}</router-link> -->
                <router-link :to="{ name: 'like', params: { uName: userName }}">{{article.userName}}</router-link>
                <span class="separator"> • </span>
                <!-- <abbr class="timeago" :title="creatTime">{{moment(creatTime, "YYYYMMDDHHmmss").fromNow()}}</abbr> -->
                <abbr class="timeago" :title="article.creatTime">{{moment(article.creatTime, "YYYYMMDDHHmmss").fromNow()}}</abbr>
                <span class="separator"> • </span>
                <!-- <router-link :to="{ name: 'like', params: { uName: userName }}">Vue</router-link> -->
                <router-link :to="{ name: 'like', params: { uName: userName }}">{{article.tag}}</router-link>
                <span>
                <!-- <a href="javascript:void(0)" @click="isHeartClick = !isHeartClick"><span class="separator"> • </span ><i class="heart el-icon-fa el-icon-fa-heart-o"  v-bind:class="{heartclick:isHeartClick}" aria-hidden="true"></i></a> -->
                <a href="javascript:void(0)" class="heartvisited" @click="changeHeart(article.id, index)"><span class="separator"> • </span ><i class="heart el-icon-fa el-icon-fa-heart-o"  v-bind:class="{heartclick:article.heartActive == true}" aria-hidden="true"></i></a>
                </span>
                 <!-- v-bind:class="{heart-click:isHeartClick}" -->
              </div>
            </section>
            <!-- 已解决 投票这里有个问题，点击当前文章的投票，其它的也改变了样式 -->
            <section class="article-vote" @click="article.vote++">
              <span class="score" v-bind:class="{scored:article.voteActive == true}">{{article.vote}}</span>
              <span class="arrow up" v-bind:class="{upmod:article.voteActive == true}" @click="changeVote(article.id, index)"></span>
            </section>
          </li>
        </ul>
        <!-- 滚动加载组件 -->
          <div class="view-more-normal"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="20">
              </div>
      </section>
    </main>
  </div>
</template>

<script>
 import axios from 'axios'

  export default {
    name: 'article',
    data() {
      return {
        loading:false,
        userName: 'jesses',
        creatTime: '2017-11-2 16:30:20',
        score:10,
        isupmod:false,
        isHeartClick:false,
        articles:[],
        currentVote:'',

        busy:true,
        page:1,
        pageSize:5
      }
    },
    // created () {
    //   this.fetchArticle()
    //   // console.log(this.articles)
    // },
    mounted() {
       this.fetchArticle();
    },
    watch: {
      '$route':'fetchArticle'
    },
    methods: {
      changeVote (id,index) {
        this.articles[index].voteActive = true;
        // axios(id)
      },
      changeHeart (id,index) {
        // axios(id)
        if(this.articles[index].heartActive == true) {
          this.articles[index].heartActive = false;
          this.$message.error('取消收藏');
        } else {
          this.articles[index].heartActive = true;
          this.$message({
          message: '已加入收藏',
          type: 'success'
          });
        }
        
      },
      fetchArticle (flag) {
        this.loading = true;
        let param = {
          page:this.page,
          pageSize:this.pageSize
        };
        axios.get("/shareLink",
          {params:param}
        ).then( (response) => {
         
          // this.loading = false;
          // this.articles = res.data.result.list;


          var res = response.data;
                this.loading = false;
                // status == 0 数据读取成功
                if(res.status=="0"){
                  // 不是第一次，需要拼接数据
                  if(flag){
                      this.articles = this.articles.concat(res.result.list);
                        //如果没有数据，停止滚动加载
                      if(res.result.count==0){
                          this.busy = true;
                      }else{
                          this.busy = false;
                      }
                  }else{
                      this.articles = res.result.list;
                      this.busy = false;
                  }
                }else{
                  this.articles = [];
                }

        //  console.log("res: " + res);
          // status == 0 数据读取成功
          // if(res.status == "0") {
          //   // 不是第一次，需要拼接数据
          //   if(flag) {
          //      this.articles = this.articles.concat(res.data.result.list);
          //     //如果没有数据，停止滚动加载
          //      if(res.result.count == 0) {
          //        this.busy = true;
          //      } else {
          //        this.busy = false;
          //      }
          //   } else {
          //     this.articles = res.data.result.list;
          //     this.busy = false;

          //     console.log(this.articles);
          //   }
          // } else {
          //   this.articles = [];
          // }
        }).catch(function (error) {
          console.log(error)
        })
      },

      loadMore(){
          this.busy = true;
          setTimeout(() => {
            this.page++;
            this.fetchArticle(true);
          }, 500);
      },
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

  .sort {
  display: flex;
  justify-content: flex-end;
  margin: 5px 0 0 0;
  }
  .sort i {
    margin: 5px 5px;
    color:#54595f;
    cursor: pointer;
  }

  /************
  loading
  *************/
  .load-wrapp {
    /* float: left; */
    width: 80px;
    height: 80px;
    /* margin: 0 10px 10px 0; */
    margin: 0 auto;
    padding: 20px 20px 20px;
    border-radius: 5px;
    text-align: center;
    /* background-color: #d8d8d8; */
}

.load-5 .ball-holder {animation: loadingE 1.3s linear infinite;}

.ring-2 {
    position: relative;
    width: 45px;
    height: 45px;
    margin: 0 auto;
    border: 4px solid #4b9cdb;
    border-radius: 100%;
}

.ball-holder {
    position: absolute;
    width: 12px;
    height: 45px;
    left: 17px;
    top: 0px;
}

.ball {
    position: absolute;
    top: -11px;
    left: 0;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background: #4282B3;
}

@keyframes loadingE {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
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
    color:#EC681B;
  }
  /* .article-title h2 a:visited {
    color: #9a9a9a;
  } */
  
  @media screen and (min-width:1200px) {
    .article-title {
      /* white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block; */
      /* padding: 15px 0;
      -webkit-box-flex: 1;
      flex: 1;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      flex-direction: column;
      flex-wrap: wrap; */
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
    font-size: 14px;
    color: #bfbfbf;
  }

  @media screen and (min-width:500px) {
    .domain {
      font-size: 16px;
    }
  }

  @media screen and (min-width:768px) {
    .domain {
      margin: 0 0 4px 0;
      font-size: 18px;
    }
  }
  /**********
文章标题
**********/

  .articles h2 a {
    font-size: 18px;
    color: #54595f;
    text-decoration: none;
  }

  @media screen and (min-width:500px) {
    .articles h2 a {
      font-size: 20px;
    }
  }

  @media screen and (min-width:660px) {
    .articles h2 a {
      font-size: 21px;
      line-height: 28px;
    }
  }

  @media screen and (min-width:1200px) {
    .articles h2 a {
      font-size: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  /*********
meta信息
***********/

  .meta {
    color: #8f8f8f;
    font-size: 12px;
    line-height: 18px;
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
    font-size: 13px;
    
}
.heartclick {
  color: #EC681B;
}
.heartvisited {
  outline: none;
}
  abbr {
    font-size: 11px;
  }

  @media screen and (min-width:500px) {
    .meta {
      font-size: 14px;
      margin: 3px 0 4px 0;
    }
    abbr {
      font-size: 13px;
    }
    .heart::before{
    font-size: 14px;
}
  }

  @media screen and (min-width:768px) {
    .meta {
      font-size: 15px;
      line-height: 24px;
    }
    /* .meta a:last-child {
      border: 0 !important;
    } */
    .heart::before{
    font-size: 15px;
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
/* .article-vote a {
  text-decoration: none;
}
.article-vote a:visited {
  color: #e0e0e0;
} */
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
  font-size: 14px;
  color: #8f8f8f;
  margin: 0 4px 0 0;
  position: relative;
  display: inline-block;
  transition:transform 0.3s, -webkit-transform 0.3s;
  line-height: 24px;
}
@media screen and (min-width:500px){
  .score {
    font-size: 17px;
  }
}

</style>

<template>
  <div class="groupdetail">
    <main>
      <section class="group-header">
        <div class="mini-header">
          <div class="follow">
            <p v-if="groupdetail.member.indexOf(userid) >= 0" @click="addlovegroup">{{joinmsg}}</p>
            <p v-else @click="addlovegroup">{{joinmsg}}</p>
          </div>
        </div>
        <div class="header-body">
          <!-- <h2 class="group-name">{{this.$route.params.gName}}</h2> -->
          <h2 class="group-name">{{groupdetail.groupName}}</h2>
          <!-- <h2 class="group-name">打开Vue的大门</h2> -->
          <p class="author">by. {{groupdetail.author.userName}}</p>
          <p class="description">{{groupdetail.groupIntro}}</p>
          <p class="">成员：{{groupdetail.member.length}}</p>
        </div>
      </section>

      <section class="user-action">
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              选项
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>全部</el-dropdown-item>
              <el-dropdown-item>我的话题</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="publish-topic">
          <!-- <router-link to="/MarkdownEditor" class="LastItem">发表话题</router-link> -->
          <!-- <router-link :to="{name: 'markdowneditor', params:{g_id:this.gid,u_id:this.userid}}" class="LastItem">发表话题</router-link> -->
          <router-link :to="{name: 'markdowneditor', query:{g_id:this.gid,isjoin:this.isjoin}}" class="LastItem">发表话题</router-link>
        </div>
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              排序
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>最新</el-dropdown-item>
              <el-dropdown-item>最热</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </section>

      <section class="articles">
        <ul class="articles-list">
          <!-- <li v-for="article in articles" v-bind:key="article.id"> -->
          <li v-for="topic in topics" v-bind:key="topic._id">
            <div class="user-avatar">
              <v-gravatar v-bind:email="topic.author.userEmail" size='40' />
            </div>
            <div class="article-title">
              <h2>
                <router-link :to="{ name:'topicdetail', params:{t_id:topic._id}}" class="article-link">{{topic.title}}</router-link>
                <!-- <a href="http://localhost:8080/" class="article-link">Release Notes for Safari Technology Preview 43</a> -->
              </h2>
              <div class="meta">
                <router-link :to="{ name: 'like', params: { uName: topic.author.userName }}">{{topic.author.userName}}</router-link>
                <span class="separator"> • </span>
                <abbr class="timeago" :title="new Date(topic.createTime)">{{moment(new Date(topic.createTime), "YYYYMMDDHHmmss").fromNow()}}</abbr>
              </div>
            </div>
            <div class="comment-num" >
              <span class="number">{{topic.comments.length}}</span>
              <i class="comment el-icon-fa el-icon-fa-comments-o" aria-hidden="true"></i>
            </div>
          </li>
        </ul>
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
    name: 'groupdetail',
    data() {
      return {
        //   gName:'',
        gid:'',
        userid:'',
        groupdetail:[],
        joinmsg:'',
        isjoin:'',
        topics:[],
        busy:true,
        page:1,
        pageSize:5,

        creatTime: '2017-11-2 16:30:20',
        topicName:'Release Notes for Safari Technology Preview 43'
      }
    },
    mounted() {
      this.gid = this.$route.params.g_id;
      
      this.fetchGroupDetail();
      this.fetchTopic();
    },
    methods:{
      fetchGroupDetail() {
        // console.log(this.gid)
        let param = {
          g_id:this.gid,
          userName:localStorage.getItem('userName')
        };
        axios.get('/group/fetchgroupdetail',
           {params:param}
        ).then(response => {
          let res = response.data;
          if(res.status == "1") {
            // this.commentNum = res.result.groupTopic.comments.length
            this.groupdetail = res.result;
            this.userid = res.user._id;
            this.isjoin = res.result.member.indexOf(res.user._id)
           if(this.isjoin >= 0) {
             this.joinmsg = '退出小组';
           } else {
             this.joinmsg = '加入小组';
           }
          } else {
            this.groupdetail = []
          }
        }).catch(error => {
          console.log(error)
        })
      },
      fetchTopic (flag) {
        let param = {
          page:this.page,
          pageSize:this.pageSize,
          g_id:this.gid
        };
        axios.get("/topic/fetchtopic",
          {params:param}
        ).then( (response) => {
         
          // this.loading = false;
          // this.articles = res.data.result.list;


          var res = response.data;
                // this.loading = false;
                // status == 0 数据读取成功
                if(res.status=="1"){
                  // 不是第一次，需要拼接数据
                  if(flag){
                      this.topics = this.topics.concat(res.result.list.groupTopic);
                        //如果没有数据，停止滚动加载
                      if(res.result.count==0){
                          this.busy = true;
                      }else{
                          this.busy = false;
                      }
                  }else{
                      this.topics = res.result.list.groupTopic;
                      this.busy = false;
                  }
                }else{
                  this.topics = [];
                }

        }).catch(function (error) {
          console.log(error)
        })
      },

      addlovegroup() {
        if (!localStorage.getItem('userName')) {
          this.$message.error(`请先登录！`);
          return false;
        } else {
          this.$http.post('/group/joingroup', {
            _id: this.gid,
            userName: localStorage.getItem('userName')
          }).then(response => {
            let res = response.data
            if (res.status == "1") {
              // this.isHeartClick = true;
              // this.i = index;
              this.lovegroupid = res.lovegroup;
              this.joinmsg = res.message;
              this.isjoin = 0;
              this.$message.success('加入成功');
              // return true;
            } else if (res.status == "2") {
              // this.isHeartClick = false;
              // this.i = -1;
              this.lovegroupid = res.lovegroup;
              this.joinmsg =  res.message;
              this.isjoin = -1;
              this.$message.success('退出成功');
              // return false;
            } else {
              this.$message.error('发生错误');
            }
          })
        }
      },

      loadMore(){
          this.busy = true;
          setTimeout(() => {
            this.page++;
            this.fetchGroup(true);
          }, 500);
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    text-decoration: none;
    /* color: black; */
  }

  .vindex {
    /* background: red !important; */
  }

  .group-header p {
    color: #fff;
  }
  .follow p {
    cursor: pointer;
  }

  main {
    margin: 0 auto;
    /* border: 1px solid green; */
    height: auto;
    /* background: #52524E; */
    /* background: #F1F4F6; */
    background: #fff;
  }

  .group-header {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
    box-shadow: 0 0px 20px #9ba09f;
  }

  .mini-header {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: flex-end;
    -webkit-box-align: center;
    align-items: center;
    align-self: flex-start;
    width: 100%;
    background: #6E828A;
  }

  .mini-header p {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 14px;
  }

  .header-body p {
    color: #54595f;
  }

  .group-name {
    font-size: 22px;
    /* font-weight: 20; */
    color: #54595f;
  }

  .author {
    margin-top: 0;
    font-size: 14px;
  }

  .description {
    padding: 5px 0 0 0;
    font-size: 15px;
    /* color: #bdc2c6; */
    margin: 0 50px 10px 50px;
  }

  .user-action {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    align-self: flex-start;
    height: 45px;
    margin-top: 10px;
    box-shadow: 0 0px 5px #9ba09f;
    /* border: 1px solid green; */
  }
  .publish-topic {
    /* border: 1px solid green; */
    display: flex;
    height: 45px;
    align-items: center;
    padding: 0px 10px;
    background:#2DBF80;
  }
  .publish-topic a {
    color:#fff;
  }

  /* .topics {
    margin-top: 1px;
    height: 300px;
    border: 1px solid green;
  } */

   /**********
文章列表li
**********/
  .articles ul {
    padding: 0;
  }
  .articles li {
    border-bottom: 1px solid #f3f3f3;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    margin: -15px 0 10px -3px;
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
    margin: 25px 7px 0 4px;
    align-self: baseline;
  }

  .user-avatar img {
    /* border-radius: 50%; */
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
      /* border-radius: 50%; */
      height: 45px;
      width: 45px;
    }
  }

    /**********
文章标题
**********/

  .articles h2 {
    margin: 0;
  }
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
    .articles h2 {
      /* margin-top: 10px; */
    }
    .articles h2 a {
      font-size: 20px;
      line-height: 28px;
    }
  }

  @media screen and (min-width:1200px) {
    .articles h2 a {
      font-size: 20px;
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

  }

  @media screen and (min-width:768px) {
    .meta {
      font-size: 15px;
      line-height: 24px;
      /* margin-top: -10px; */
    }
  }
  .separator {
    padding: 0 3px;
    color: #bfbfbf;
  }

  /*********
  评论数
  *********/
  .comment-num {
    /* font-size: 20px; */
    color:#9f8484;
    margin-right: 5px;
  }
  .comment::before{
    font-size: 18px;
  }


  @media screen and (min-width:960px) {
    main {
      width: 720px;
      margin: 0 auto;
      height: auto;
    }
    .comment-num {
    margin:0;
  }
  }

  @media screen and (min-width:1200px) {
    main {
      width: 940px;
      margin: 2px auto;
      height: auto;
    }
  }

</style>

<template>
  <section class="articles">
    <ul class="articles-list">
      <li v-for="topic in topics" :key="topic._id">
        <div class="user-avatar">
          <v-gravatar :email="topic.user.email" :size='40' :alt="topic.user.nickname" />
        </div>
        <div class="article-title">
          <h2>
            <router-link :to="{ name:'topicdetail', params:{t_id: topic._id}}" class="article-link">
              {{topic.title}}
            </router-link>
            <el-tag type="danger" size="small" v-if="!topic.isPass">审核未通过</el-tag>
          </h2>
          <div class="meta">
            <router-link :to="{ name: 'user_article', params: { userId: topic.user._id }}">{{topic.user.nickname}}</router-link>
            <span class="separator"> • </span>
            <abbr class="timeago" :title="new Date(topic.createDateTime)">{{moment(new Date(topic.createDateTime), "YYYYMMDDHHmmss").fromNow()}}</abbr>
          </div>
        </div>
        <div class="comment-num" >
          <!--<span class="number">{{topic.comments.length}}</span>-->
          <!--<i class="comment el-icon-fa el-icon-fa-comments-o" aria-hidden="true"></i>-->
        </div>
      </li>
    </ul>
    <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20"></div>
  </section>
</template>

<script>
  export default {
    name: 'topicIndex',
    data() {
      return {
        //   gName:'',
        loadMore: true,
        gid:'',
        userId:'',
        topics:[],
        busy:true,
        page:1,
        pageSize:5,
      }
    },
    props:{
      group: Number
    },
    mounted() {
      console.log("group id 为", this.group);
      this.gid = Number(this.group) || this.$route.params.groupId;
      this.userId = Number(localStorage.getItem('userId'));
      this.fetchTopic();
    },
    methods: {
      fetchTopic (flag) {
        let params = {
          page: this.page,
          page_size: this.pageSize,
          group: this.gid,
          isPass: true
        };
        this.$http.get(this.$config.topic.url, {params: params})
          .then(response => {
            let res = response.data;
            if (res.status === this.$status.success) {
              // 不是第一次，需要拼接数据
              if (flag) {
                this.topics = this.topics.concat(res.data);
                //如果没有数据，停止滚动加载
                this.busy = res.data.length === 0;
              } else {
                this.topics = res.data;
                this.busy = false;
              }
            } else {
              this.topics = [];
            }
          }).catch(err =>
          this.$message.error(err.response.data.message)
        );
      },

      loadMore(){
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.fetchGroup(true);
        }, 500);
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }


  .group-header p {
    color: #fff;
  }
  .follow p {
    cursor: pointer;
  }

  main {
    width: 100%;
    margin: 0 auto;
    height: auto;
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
    color: #54595f;
  }

  .author {
    margin-top: 0;
    font-size: 14px;
  }

  .description {
    padding: 5px 0 0 0;
    font-size: 15px;
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
  }
  .publish-topic {
    display: flex;
    height: 45px;
    align-items: center;
    padding: 0px 10px;
    background:#2DBF80;
  }
  .publish-topic a {
    color:#fff;
  }


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
    color:#9f8484;
    margin-right: 5px;
  }
  .comment::before{
    font-size: 18px;
  }


  @media screen and (min-width:960px) {
    .comment-num {
      margin:0;
    }
  }

</style>

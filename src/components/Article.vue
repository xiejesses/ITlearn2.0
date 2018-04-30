<template>
  <div class="index">
    <main>
      <div class="tag_bg">
      <span class="tagName" :style="{background:tag.color}"  v-for="(tag,tagindex) in tags" :key="tagindex">
        <router-link :to="{ name: 'tag_article', params: { tagId: tag._id }}" style="border-bottom:0">
                    {{tag.name}}
                  </router-link>
        </span>
      <!-- <span class="tagName" :style="{background:tag.tagColor}" v-for="(tag,tagindex) in testTags" :key="tagindex">#{{tag.name}}</span> -->
      </div>
      <section class="articles">
        <ul class="articles-list">
          <li v-for="(article,index) in articles" :key="article._id">
            <section class="user-avatar">
              <v-gravatar :email="article.user.email" ::size='40' :alt="article.user.nickname" />
            </section>
            <section class="article-title">
              <h2>
                <router-link :to="{ name: 'share_detail', params: { shareId: article._id }}">{{article.title}}
                  <i v-if="!article.content" class="chain el-icon-fa el-icon-fa-link" aria-hidden="true"></i>
                </router-link>
                <!-- <a :href="article.url" target="_bank" class="article-link"></a> -->
              </h2>
              <div class="meta">
                <router-link :to="{ name: 'user_article', params: { userId: article.user._id }}">{{article.user.nickname}}</router-link>
                <span class="separator"> • </span>
                <abbr class="timeago" :title="new Date(article.createDateTime)">{{moment(new Date(article.createDateTime), "YYYYMMDDHHmmss").fromNow()}}</abbr>
                <span class="separator"> • </span>
                <span v-for="(tag, tagindex) in article.tags" :key="tagindex">
                  <router-link :to="{ name: 'tag_article', params: { tagId: tag._id }}" style="border-bottom:0">
                    <el-tag :color="tag.color" size="mini" style="color:white" >{{tag.name}}</el-tag>
                    <!-- <el-tag size="mini" type="success">{{tag.name}}</el-tag> -->
                  </router-link>
                  <span class="separator"> • </span>
                </span>
                <span>
                  <a href="javascript:void(0)" class="heartvisited" @click="addloveLink(article._id, index)">
                    <i class="heart el-icon-fa el-icon-fa-heart" :class="{heartclick:loveLinkid.indexOf(article._id) >= 0,heartScale:loveLinkid.indexOf(article._id) < 0}"
                      aria-hidden="true"></i>
                  </a>
                </span>
              </div>
            </section>
            <section class="article-vote" @click="article.voteNumber++">
              <span class="score" :class="{scored: !(article.upVotes.indexOf(userId) >= 0)}">{{article.upVotes.length}}</span>
              <span :class="{thumbsUp: (article.upVotes.indexOf(userId) >= 0),thumbsHover:!(article.upVotes.indexOf(userId) >= 0)}" @click="changeVote(article._id, index)">
                <i class="thumbs el-icon-fa el-icon-fa-thumbs-up"></i>
              </span>
            </section>
          </li>
        </ul>
        <!-- 滚动加载组件 -->
        <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
        </div>
      </section>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'article',
    data() {
      return {
        i: -1,
        userId: Number(localStorage.getItem("userId")),
        // loading: false,
        isupmod: false,
        isHeartClick: '',
        articles: [],
        currentVote: '',

        busy: true,
        page: 1,
        pageSize: 3,

        loveLinkid: [],
        tags: [],
      }
    },
    mounted() {
      this.fetchArticle();
      this.fetchLovelink();
      this.fetchTags();
    },

    computed: {},

    watch: {
      '$route': 'fetchArticle'
    },
    methods: {

      // 投票
      changeVote(id, index) {
        let params = {
          recommend: id,
          user: localStorage.getItem("userId")
        };
        this.articles[index].voteActive = true;
        this.$http.get(this.$config.recommend.vote.url, {
            params: params
          })
          .then(response => {
            let res = response.data;
            if (res.status === 0) {
              if (!(res.isVote === 0)) {
                this.articles[index].upVotes.push(Number(localStorage.getItem("userId")));
                this.articles[index].voteActive = true;
              }
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(err => {
            this.$message.error(err.response.data.message);
          });
      },

      clickheart() {
        this.clickheart = !this.clickheart
      },

      // 获取用户喜欢链接
      fetchLovelink() {
        if (localStorage.getItem('userName')) {
          let format = {
            user_id: localStorage.getItem('userId')
          };
          let url = this.$config.collection.url;
          let params = {
            user: localStorage.getItem('userId')
          };

          // todo 按照原生设定 获取的收藏recommend 有数量限制
          this.$http.get(url, {
              params: params
            })
            .then(response => {
              let res = response.data;
              if (res.status === this.$status.success) {
                // 添加收藏字段
                for (let collection of res.data) {
                  this.loveLinkid.push(collection.recommend._id);
                }
                console.log(this.loveLinkid);
              } else {
                this.$message.error(response.message);
              }
            })
            .catch(err => {
              this.$message.error(err.response.data.message);
            });
        }
      },

      // 添加收藏
      addloveLink(sharelink_id, index) {
        if (!localStorage.getItem('userName')) {
          this.$message.error(`请先登录！`);
          return false;
        }

        let data = {
          recommend: sharelink_id,
          user: localStorage.getItem("userId")
        };
        console.log(!(this.loveLinkid.indexOf(sharelink_id) >= 0));
        console.log(this.loveLinkid);
        if (!(this.loveLinkid.indexOf(sharelink_id) >= 0)) {
          this.$http.post(this.$config.collection.url, data)
            .then(response => {
              let res = response.data;
              if (res.status === this.$status.success) {
                this.loveLinkid.push(sharelink_id);

                this.$message.success('成功收藏');
              } else {
                this.$message.error('发生错误');
              }
            })
            .catch(err => {
              this.$message.error(err.response.data.message);
            });
        } else {
          this.$http.delete(this.$config.collection.url, {
              params: data
            })
            .then(response => {
              if (response.status === 204) {
                this.$message.success('取消收藏成功');
                this.$units.remove(this.loveLinkid, sharelink_id);
              } else {
                // todo 删除失败操作
              }
            })
            .catch(err => {
              this.$message.error(err.response.data.message);
            });
        }
      },

      // 获取标签
      fetchTags() {
          if (this.$route.name === "home_article") {
          this.$http.get(this.$config.tag.url).then(response => {
          let res = response.data;
          if (res.status === this.$status.success) {
            this.tags = res.data;
            console.log(this.tags)
          } else {
            console.log("获取标签失败");
            return false;
          }
        }).catch(err =>
          this.$message.error(err.response.data.message)
        );
        }
      },

      // 获取文章
      fetchArticle(flag) {
        //取出
        this.loading = true;
        let params = {
          page: this.page,
          page_size: this.pageSize,
        };
        let url = this.$config.recommend.url;

        if (this.$route.params.userId) {
          params.user = this.$route.params.userId;
        }

        if (this.$route.params.tagId) {
          params.tags = this.$route.params.tagId;
        }

        if (this.$route.name === "user_collection") {
          url = this.$config.collection.url;
        }

        // 添加查询规则
        if (this.$route.name === "search_article") {
          params.$ = JSON.stringify({
            title: {
              $regex: this.$route.query.query
            }
          });
        }

        this.$http.get(url, {
            params: params
          })
          .then((response) => {
            let res = response.data;
            this.loading = false;
            // 不是第一次，需要拼接数据
            if (this.$route.name === "user_collection") {
              let temp = [];
              for (let i = 0; i < res.data.length; i++) {
                let collection = res.data[i];
                temp.push(collection.recommend);
              }
              this.articles = this.articles.concat(temp);
            } else {
              this.articles = this.articles.concat(res.data);
            }

            if (!flag) {
              this.busy = false;
            }
            this.busy = res.data.length === 0;
            this.articles.forEach(function (article) {
              article.voteActive = article.upVotes.indexOf(localStorage.getItem("userId")) >= 0;
            });
          }).catch(function (error) {
            console.log(error)
          });
      },

      loadMore() {
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
  }

  .sort {
    display: flex;
    justify-content: flex-end;
    margin: 5px 0 0 0;
  }

  .sort i {
    margin: 5px 5px;
    color: #54595f;
    cursor: pointer;
  }

  /************
  loading
  *************/

  .load-wrapp {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    padding: 20px 20px 20px;
    border-radius: 5px;
    text-align: center;
  }

  .load-5 .ball-holder {
    animation: loadingE 1.3s linear infinite;
  }

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
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

/* 首页标签 */
.tag_bg {
  display:flex;
  flex-wrap: wrap;
  margin-top: 5px;
}
.tagName {
  padding: 3px 10px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 7px;
}
.tagName a {
  text-decoration: none;
  color:#fff;
  font-size: 14px;
}
  /**********
main区
**********/

  main {
    margin: 0 auto;
    width: 100%;
    height: auto;
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

  .articles li:hover {
    background: #fafafa63;

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
    color: #EC681B;
  }

  .chain {
    margin-left: 5px;
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
    font-size: 14px;
    text-decoration: none;
    border-bottom: 2px solid #f3f3f3;
  }

  .meta a:last-child {
    border: 0 !important;
  }

  .heart {
    color: #4e4d4d4b;
  }

  .heart::before {
    font-size: 13px;

  }

  .heartclick {
    color: #EC681B;
  }

  .heartScale:hover.heart::before {
    -webkit-animation: heartScale 0.5s linear;
    animation: heartScale 0.5s linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards
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
    .heart::before {
      font-size: 14px;
    }
  }

  @media screen and (min-width:768px) {
    .meta {
      font-size: 15px;
      line-height: 24px;
    }
    .heart::before {
      font-size: 15px;
    }
  }

  .separator {
    padding: 0 3px;
    color: #bfbfbf;
  }

  /*********
  点赞
*********/

  .thumbsUp i {
    color: #34e79a;
    cursor: pointer;
  }

  .thumbsHover i:hover.el-icon-fa-thumbs-up:before {
    /* color:red; */
    -webkit-animation: thumbsScale 0.5s linear;
    animation: thumbsScale 0.5s linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-fill-mode: forwards;
    animation-fill-mode: forwards
  }

  .thumbs {
    color: #e0e0e0;
    cursor: pointer;
  }

  .el-icon-fa-thumbs-up:before {
    font-size: 20px;
  }


  .scored {
    color: #e0e0e0 !important;
  }

  @keyframes thumbsScale {
    0% {
      font-size: 20px;
    }
    25% {
      font-size: 24px;
    }
    75% {
      font-size: 26px;
    }
    100% {
      font-size: 20px;
    }
  }

  @keyframes heartScale {
    0% {
      font-size: 13px;
    }
    25% {
      font-size: 16px;
    }
    75% {
      font-size: 18px;
    }
    100% {
      font-size: 13px;
    }
  }

  .article-vote {
    width: 50px;
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

  @media screen and (min-width:500px) {
    .article-vote {
      width: 60px;

    }
  }

  @media screen and (min-width:660px) {
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

  @media screen and (min-width:1200px) {
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
    transition: transform 0.3s, -webkit-transform 0.3s;
    line-height: 24px;
  }

  @media screen and (min-width:500px) {
    .score {
      font-size: 17px;
    }
  }

</style>

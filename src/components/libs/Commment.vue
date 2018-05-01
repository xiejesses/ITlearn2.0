<template>
  <div>
    <section class="comment">
      <div class="comment-head">
        <div class="comment-count">评论
          <span>( {{commentNum}} )</span>
        </div>
      </div>
      <div class="comment-input">
        <div class="user-avatar">
          <v-gravatar :email="currentUserEmail" ></v-gravatar>
        </div>
        <div class="mavon-editor">
          <mavon-editor v-on:change="getCommentContent" style="height: 100%" placeholder="markdown editor" v-bind:toolbars="Toolbars"
                        v-bind:default_open="edit"></mavon-editor>
        </div>
      </div>
      <div class="actions">
        <a href="javascript:;" class="user-submit" @click="createComment">评论</a>
      </div>
    </section>
    <section class="user-comment">
      <ul class="comment-list">
        <li v-for="(comment,index) in comments" v-bind:key="comment._id">
          <el-row :gutter="10">
            <el-col :xs="3" :sm="2" :md="2" :lg="2" :xl="2">
              <div class="grid-content">
                <div class="user-avatar">
                  <v-gravatar v-bind:email="comment.user.email" :size='40' :alt="comment.user.nickname" align="right" />
                </div>
              </div>
            </el-col>
            <el-col :xs="21" :sm="22" :md="22" :lg="22" :xl="22">
              <div class="grid-content">
                <section class="comment-content">
                  <div class="user-comment-right">
                    <div class="meta">
                      <router-link :to="{ name: 'user_article', params: { userId: comment.user._id }}"> {{comment.user.nickname}}</router-link>
                      <span class="separator">• </span>
                      <abbr class="timeago" :title="new Date(comment.createDateTime)"> {{ moment(new Date(comment.createDateTime), "YYYYMMDDHHmmss").fromNow() }}</abbr>
                    </div>
                    <div v-html="comment.content" class="custom markdown-body"></div>
                    <div v-if="comment.pid" class="child-comment meta">
                      <router-link :to="{ name: 'user_article', params: { userId: comment.pid.user._id }}"> @{{comment.pid.user.nickname}}: </router-link>
                      <div v-html="comment.pid.content" class="custom markdown-body" ></div>
                    </div>
                    <div class="reply">
                      <a href="javascript:void(0)" @click="showReplyLayout(index)">回复</a>
                    </div>
                  </div>
                  <!-- 回复评论输入框 -->
                  <div v-show="index == i">
                    <div class="comment-input">
                      <div class="user-avatar">
                        <v-gravatar v-bind:email="currentUserEmail"  :size='40' />
                      </div>
                      <div class="mavon-editor">
                        <mavon-editor  v-on:change="getReplyContent" style="height: 100%" placeholder="markdown editor" v-bind:toolbars="Toolbars"
                                       v-bind:default_open="edit"></mavon-editor>
                      </div>
                    </div>
                    <div class="reply-actions">
                      <a href="javascript:;" @click="createComment(comment._id)">回复</a>
                      <a href="javascript:;" @click="cancelReply">取消</a>
                    </div>
                  </div>
                </section>
              </div>
            </el-col>
          </el-row>
        </li>
      </ul>
      <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      </div>
    </section>
  </div>
</template>

<script>
  import {mavonEditor} from 'mavon-editor';
  import 'mavon-editor/dist/css/index.css';
  import '../../../static/css/markdown.css';

  export default {
    name: "comment",
    components: {
      mavonEditor
      // or 'mavon-editor': mavonEditor
    },
    props:{
      topic: Number,
      recommend: Number,
      project: Number
    },

    data:function(){
      return {
        i: -1,
        currentUserEmail: '',
        commentContent: '',
        replyContent: '',
        comments: [],
        commentNum: 0,
        busy: true,
        page: 1,
        pageSize: 5,
        edit: 'edit',
        Toolbars: {
          //   quote: true, // 引用
          code: true, // cod
          trash: true, // 清空
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
      };
    },

    mounted() {
      this.currentUserName = localStorage.getItem('userName');
      this.currentUserEmail = localStorage.getItem('userEmail');
      this.currentUserId = localStorage.getItem('userId');
      this.fetchComment();
      this.getCommentCount();
    },

    methods: {
      getCommentContent(val, render) {
        this.commentContent = render;
      },
      getReplyContent(val, render) {
        this.replyContent = render;
      },
      showReplyLayout(index) {
        this.i = index;
      },
      cancelReply(){
        this.i = -1;
      },

      // 创建评论
      createComment(pid) {
        let data = {
          content: this.commentContent,
          user: this.currentUserId
        };

        // 设置类型
        if (this.topic) {
          data.topic = this.topic;
        } else if (this.recommend) {
          data.recommend = this.recommend;
        } else if (this.project) {
          data.project = this.project;
        }

        if(typeof pid === "number") {
          data.pid = Number(pid);
          data.content = this.replyContent;
        }
        this.$http.post(this.$config.comment.url, data)
          .then(response => {
            let res = response.data;
            if (res.status === this.$status.success) {
              let comments = [res.data];
              this.comments = comments.concat(this.comments);
              this.$message.success('回复成功');
              this.commentNum++;
              this.cancelReply();
            } else {
              this.$message.error('回复成功！请重试');
            }})
          .catch(err => {
            this.$message.error(`${err.message}`, 'ERROR!');
          })
      },

      // 获取评论列表
      fetchComment(flag) {
        let params = {
          page: this.page,
          page_size: this.pageSize,
        };
        if (this.topic) {
          params.topic = this.topic;
        } else if(this.recommend){
          params.recommend = this.recommend;
        } else if(this.project) {
          params.project = this.project;
        }
        this.$http.get(this.$config.comment.url, {params: params})
          .then((response) => {
            let res = response.data;
            if (res.status === this.$status.success) {
              if (flag) {
                this.comments = this.comments.concat(res.data);
                this.busy = res.data.length === 0;
              } else {
                this.comments = res.data;
                this.busy = false;
              }
            } else {
              this.comments = [];
            }

          }).catch(function (error) {
          console.log(error)
        });
      },

      // 获取评论数量
      getCommentCount() {
        let params = {};
        if (this.topic) {
          params.topic = this.topic;
        } else if(this.recommend){
          params.recommend = this.recommend;
        } else if(this.project) {
          params.project = this.project;
        }

        this.$http.get(this.$config.comment.count.url, {params: params})
          .then((response) => {
            let res = response.data;
            if (res.status === this.$status.success) {
              this.commentNum = res.count;
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(err => {
            this.$message.error(err.response.data.message);
          });
      },

      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.fetchComment(true);
        }, 500);
      },
    }

  }
</script>

<style scoped>
  ul {
    padding: 0;
  }

  main {
    width: 100%;
    margin: 5px auto;
    height: auto;
    padding: 0 15px;
  }

  .user-info {
    display: flex;
    -webkit-box-pack: justify;
    -webkit-box-align: center;
    align-items: center;
  }

  .user-info img {
    border-radius: 50%;
  }

  .meta {
    color: #8f8f8f;
    font-size: 13px;
    line-height: 18px;
    position: relative;
  }

  .meta a {
    color: #8f8f8f;
    padding: 3px 0 0 0;
    text-decoration: none;
    border-bottom: 2px solid #f3f3f3;
  }

  .topic-name {
    font-size: 22px;
  }

  .comment {
    margin-top: 50px;
  }


  .comment-head {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #bbc3bb;
    padding-bottom: 5px;
  }

  .comment-head .user-avatar img {
    font-size: 20px;
  }

  .user-avatar {
    align-self: baseline;
  }

  .user-avatar img {
    border-radius: 50%;
    height: 30px;
    width: 30px;
  }

  .user-avatar-list img {
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }

  .comment-input {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    margin-top: 20px;
  }

  .mavon-editor {
    flex: 1;
    display: flex;
    -webkit-box-direction: normal;
    flex-direction: column;
    flex-wrap: wrap;
    margin-left: 10px;
  }

  .v-note-wrapper {
    min-height: 50px;
    min-width: 200px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }
  .reply-actions{
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
  }
  .reply-actions a {
    margin-left: 5px;
    font-size: 15px;
    color: gray;

  }

  .user-submit{
    display: inline-block;
    background: #f28964;
    height: 36px;
    min-width: 80px;
    padding: 0 10px 2px 10px;
    border: none;
    border-radius: 2px;
    text-decoration: none;
    outline: none;
    font-size: 17px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    -webkit-appearance: none;
    margin-top: 10px;
    vertical-align: bottom;
    cursor: pointer;
  }

  .user-comment li {
    margin-top: 10px;
    border-bottom: 1px solid #f3f3f3;
    list-style: none;
  }
  .user-comment li:last-child {
    border-bottom: none;
    list-style: none;
  }
  .user-reply li {
    margin-bottom: 5px;
  }


  .comment-content {
    padding: 0 0 15px 0;
  }

  .custom {
    margin-top: 10px;
  }

  .reply {
    margin-top: 20px;
  }

  .reply a {
    text-decoration: none;
    color: #2b2c40b3;
  }

  .replyTo {
    margin-top: 20px;
  }


  @media screen and (min-width:960px) {
    .user-avatar img {
      height: 35px;
      width: 35px;
    }
    .user-avatar-list img {
      height: 28px;
      width: 28px;
    }
  }

  @media screen and (min-width:1200px) {
    main {
      width: 85%;
      margin: 5px auto;
      height: auto;
    }
  }
  @media screen and (min-width:1600px) {
    main {
      width: 80%;
      margin: 5px auto;
      height: auto;
    }
  }

  .child-comment{
    padding: 5px 20px;
    margin-top: 5px;
    background-color: #F2F6FC;
  }
</style>

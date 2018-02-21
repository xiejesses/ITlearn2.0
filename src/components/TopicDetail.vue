<template>
  <div class="topicdetail">
    <main>
      <section class="topic-content">
        <div class="user-info">
          <div class="user-avatar">
            <v-gravatar v-bind:email="topicdetail.author.userEmail" size='40' />
          </div>
          <div class="meta" style="margin-left:10px">
            <router-link :to="{ name: 'like', params: { uName: topicdetail.author.userName }}">{{topicdetail.author.userName}}</router-link>
            <span class="separator">• </span>
            <abbr class="timeago" :title="topicdetail.createTime"> {{ moment(topicdetail.createTime, "YYYYMMDDHHmmss").fromNow() }}</abbr>
          </div>
        </div>
        <!-- <p class="topic-name">{{$route.params.tName}}</p> -->
        <p class="topic-name">{{topicdetail.title}}</p>
        <!-- <div v-html="$route.params.tName" class="markdown-body"></div> -->
        <div v-html="topicdetail.content" class="markdown-body"></div>
        <!-- <div v-html="value" class="markdown-body"></div> -->
      </section>

      <section class="comment">
        <div class="comment-head">
          <div class="comment-count">评论
            <span>( {{commentNum}} )</span>
          </div>
          <!-- <div class="user-avatar-list">
            <v-gravatar email="8356145749@qq.com" size='25' />
            <v-gravatar email="83614574@qq.com" size='25' />
            <v-gravatar email="83564574@qq.com" size='25' />
            <v-gravatar email="83561454@qq.com" size='25' />
            <v-gravatar email="35614574@qq.com" size='25' />
            <v-gravatar email="83561574@qq.com" size='25' />
            <v-gravatar email="835615741@qq.com" size='25' />
            <v-gravatar email="835615742@qq.com" size='25' />
            <v-gravatar email="835615743@qq.com" size='25' />
            <v-gravatar email="835615744@qq.com" size='25' />
          </div> -->
        </div>
        <div class="comment-input">
          <div class="user-avatar">
            <v-gravatar v-bind:email="currentUserEmail" size='40' />
          </div>
          <div class="mavon-editor">
            <mavon-editor v-on:change="getCommentContent" style="height: 100%" placeholder="markdown editor" v-bind:toolbars="Toolbars"
              v-bind:default_open="edit"></mavon-editor>
          </div>
        </div>
        <div class="actions">
          <!-- <input type="submit" name="user-submit" id="user-submit" value="评论"> -->
          <a href="javascript:;" class="user-submit" @click="createComment">评论</a>
        </div>

        <section class="user-comment">
          <ul class="comment-list">
            <li v-for="(comment,index) in comments" v-bind:key="comment._id">
              <el-row :gutter="10">
                <el-col :xs="3" :sm="2" :md="2" :lg="2" :xl="2">
                  <div class="grid-content">
                    <div class="user-avatar">
                      <v-gravatar v-bind:email="comment.author.userEmail" size='40' align="right" />
                    </div>
                  </div>
                </el-col>
                <el-col :xs="21" :sm="22" :md="22" :lg="22" :xl="22">
                  <div class="grid-content">
                    <section class="comment-content">
                      <div class="user-comment-right">
                        <div class="meta">
                          <router-link :to="{ name: 'like', params: { uName: comment.author.userName }}"> {{comment.author.userName}}</router-link>
                          <span class="separator">• </span>
                          <abbr class="timeago" :title="comment.createTime"> {{ moment(comment.createTime, "YYYYMMDDHHmmss").fromNow() }}</abbr>
                        </div>
                        <div v-html="comment.content" class="custom markdown-body"></div>
                        <div class="reply">
                          <!-- <a href="javascript:void(0)" v-on:click="showReplyLayout=!showReplyLayout">Reply</a> -->
                          <a href="javascript:void(0)" @click="showReplyLayout(index)">Reply</a>
                        </div>
                      </div>
                      <!-- 回复评论输入框 -->
                      <div v-show="index == i">
                        <div class="comment-input">
                          <div class="user-avatar">
                            <v-gravatar v-bind:email="currentUserEmail" size='40' />
                          </div>
                          <div class="mavon-editor">
                            <mavon-editor  v-on:change="getReplyContent" style="height: 100%" placeholder="markdown editor" v-bind:toolbars="Toolbars"
                              v-bind:default_open="edit"></mavon-editor>
                          </div>
                        </div>
                        <div class="reply-actions">
                          <!-- <input type="submit" name="user-submit" id="user-submit" value="回复"> -->
                          <a href="javascript:;" @click="createReply(comment._id)">回复</a>
                          <a href="javascript:;" @click="cancelReply">取消</a>
                        </div>
                      </div>
                      <!-- 回复评论显示 -->
                      <ul class="user-reply">
                          <li v-for="reply in comment.replys" v-bind:key="reply._id">
                              <el-row :gutter="10" class="replyTo">
                        <el-col :xs="3" :sm="2" :md="2" :lg="2" :xl="2">
                          <div class="grid-content bg-purple">
                            <div class="user-avatar">
                              <v-gravatar v-bind:email="reply.author.userEmail" size='40' align="right" />
                            </div>
                          </div>
                        </el-col>
                        <el-col :xs="21" :sm="22" :md="22" :lg="22" :xl="22">
                          <div class="grid-content bg-purple">
                            <div>
                              <div class="meta">
                                <router-link :to="{ name: 'like', params: { uName: reply.author.userName }}"> {{reply.author.userName}}</router-link>
                                <span class="separator">• </span>
                                <abbr class="timeago" :title="reply.createTime"> {{ moment(reply.createTime, "YYYYMMDDHHmmss").fromNow() }}</abbr>
                              </div>
                              <div v-html="reply.content" class="custom markdown-body"></div>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                          </li>
                      </ul>
                      
                      <!-- <div class="replyTo">
                            
                            
                          </div> -->
                    </section>
                  </div>
                </el-col>
              </el-row>
            </li>
          </ul>
          <div class="view-more-normal" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    mavonEditor
  } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import '../../static/css/markdown.css'
  export default {
    components: {
      mavonEditor
      // or 'mavon-editor': mavonEditor
    },
    name: 'topicdetail',
    data() {
      return {
        i:-1,
        tid: '',
        topicdetail: [],
        currentUserEmail: '',
        commentContent: '',
        replyContent: '',
        comments: [],
        commentNum:0,
        busy: true,
        page: 1,
        pageSize: 5,

        // userName:'test',

        // showReplyLayout: false,
        value: '<p>组件实例的作用域是孤立的。这意味着不能 (也不应该) 在子组件的模板内直接引用父组件的数据。父组件的数据需要通过 prop 才能下发到子组件中</p> <p>子组件要显式地用 <code>props</code> 选项声明它预期的数据：</p> <pre class="hljs"><code class="">Vue.component(\'child\', {<br> // 声明 props<br> props: [\'message\'],<br> // 就像 data 一样，prop 也可以在模板中使用<br> // 同样也可以在 vm 实例中通过 this.message 来使用<br> template: \'&lt;span&gt;{{ message }}&lt;/span&gt;\'template: \'&lt;span&gt;{{ message }}&lt;/span&gt;\'template: \'&lt;span&gt;{{ message }}&lt;/span&gt;\'<br> }) </code></pre> <p>然后我们可以这样向它传入一个普通字符串：</p> <pre class="hljs"><code class="">&lt;child message=&quot;hello!&quot;&gt;&lt;/child&gt; </code></pre> <p>结果：</p> <pre class="hljs"><code class="">hello! </code></pre>',
        value2: '<h4>动态 Prop</h4> <p>与绑定到任何普通的 HTML 特性相类似，我们可以用 v-bind 来动态地将 prop 绑定到父组件的数据。每当父组件的数据变化时，该变化也会传导给子组件：</p> <pre class="hljs"><code class="">&lt;div&gt;<br> &lt;input v-model=&quot;parenMsg&quot;&gt;<br> &lt;child v-bind:my-message=&quot;parenMsg&quot;&gt;&lt;/child&gt;&lt;child v-bind:my-message=&quot;parenMsg&quot;&gt;&lt;/child&gt;&lt;child v-bind:my-message=&quot;parenMsg&quot;&gt;&lt;/child&gt;<br>&lt;/div&gt; </code></pre>',
        //   value2:'<h4>动态 Prop</h4> <p>与绑定到任何普通的 HTML 特性相类似，我们可以用 v-bind 来动态地将 prop 绑定到父组件的数据。每当父组件的数据变化时，该变化也会传导给子组件：</p> ',
        creatTime: '2017-11-2 16:30:20',
        topicName: '使用 Prop 传递数据',
        edit: 'edit',
        Toolbars: {
          //   quote: true, // 引用
          code: true, // cod
          trash: true, // 清空
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
      }
    },
    mounted() {
      this.tid = this.$route.params.t_id;
      this.currentUserName = localStorage.getItem('userName');
      this.currentUserEmail = localStorage.getItem('userEmail');

      this.fetchTopicDetail();
      this.fetchComment();
    },
    methods: {
      getCommentContent(val, render) {
        this.commentContent = render;
      },
      getReplyContent(val, render) {
        this.replyContent = render;
      },
      showReplyLayout(index) {
        console.log(`before==>i:${this.i}`)
        console.log(`before==>index:${index}`)
        this.i = index;
        console.log(`after==>i:${this.i}`)
        console.log(`after==>index:${index}`)
      },
      cancelReply(){
        this.i = -1;
      },
      fetchTopicDetail() {
        // console.log(this.gid)
        let param = {
          t_id: this.tid,
        };
        axios.get('/topic/fetchtopicdetail', {
          params: param
        }).then(response => {
          let res = response.data;
          if (res.status == "1") {
            this.topicdetail = res.result
          } else {
            this.topicdetail = []
          }
        }).catch(error => {
          console.log(error)
        })
      },
      createComment() {
        // this.isbuilding = true;

        this.$http.post('/comment/createcomment', {
          content: this.commentContent,
          userName: this.currentUserName,
          t_id: this.tid,
        }).then(response => {
          let res = response.data;
          if (res.status == "1") {
            // this.$router.push('/groupindex')
            // this.$message.success(`创建成功！`);
            this.$message.success('评论成功');
            // this.formGroup.groupIntro = '';
          } else {
            this.$message.error('评论失败！请重试');

          }
        }).catch(err => {
          this.$message.error(`${err.message}`, 'ERROR!');
        })
      },
      fetchComment(flag) {
        let param = {
          page: this.page,
          pageSize: this.pageSize,
          t_id: this.tid
        };
        axios.get("/comment/fetchcomment", {
          params: param
        }).then((response) => {

          var res = response.data;
          // this.loading = false;
          // status == 0 数据读取成功
          if (res.status == "1") {
            this.commentNum = res.result.count;
            // 不是第一次，需要拼接数据
            if (flag) {
              this.comments = this.comments.concat(res.result.list.comments);
              //如果没有数据，停止滚动加载
              if (res.result.count == 0) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.comments = res.result.list.comments;
              this.busy = false;
            }
          } else {
            this.comments = [];
          }

        }).catch(function (error) {
          console.log(error)
        })
      },
      createReply(id) {
        //   console.log(id);
        this.$http.post('/comment/createreply', {
          content: this.replyContent,
          userName: this.currentUserName,
          c_id: id,
        }).then(response => {
          let res = response.data;
          if (res.status == "1") {
            // this.$router.push('/groupindex')
            // this.$message.success(`创建成功！`);
            this.$router.go()
            this.$message.success('回复成功');
            // this.formGroup.groupIntro = '';
          } else {
            this.$message.error('回复失败！请重试');

          }
        }).catch(err => {
          this.$message.error(`${err.message}`, 'ERROR!');
        })
      },

      loadMore() {
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
  ul {
    padding: 0;
  }

  main {
    margin: 5px auto;
    height: auto;
    padding: 0 15px;
    /* border: 1px solid green; */
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

  .topic-content {
    /* display: flex; */
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
      /* margin-bottom: 5px; */
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
    /* float: right; */
    margin-top: 20px;
  }

  .reply a {
    text-decoration: none;
    color: #2b2c40b3;
  }

  .replyTo {
    margin-top: 20px;
  }


  /* @media screen and (max-width:370px) {
    .v-note-wrapper {
      width: 250px !important;
  }
} */

  @media screen and (min-width:960px) {
    main {
      width: 720px;
      margin: 5px auto;
      height: auto;
    }
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
      width: 700px;
      margin: 5px auto;
      height: auto;
    }
  }

</style>

<template>
  <div class="topicdetail">
    <main>
      <section class="topic-content">
        <div class="user-info">
          <div class="user-avatar">
            <v-gravatar v-bind:email="topicdetail.user.email" :size='40' />
          </div>
          <div class="meta" style="margin-left:10px">
            <router-link :to="{ name: 'user_article', params: { userId: topicdetail.user._id }}">{{topicdetail.user.nickname}}</router-link>
            <span class="separator">• </span>
            <abbr class="timeago" :title="new Date(topicdetail.createDateTime)"> {{ moment(new Date(topicdetail.createDateTime), "YYYYMMDDHHmmss").fromNow() }}</abbr>
          </div>
        </div>
        <p class="topic-name">{{topicdetail.title}}</p>
        <div v-html="topicdetail.content" class="markdown-body"></div>
      </section>

      <comment :topic="Number(tid)"></comment>

    </main>
  </div>
</template>

<script>
  import axios from 'axios'
  import comment from './libs/Commment.vue';

  export default {
    components: {
      comment
      // or 'mavon-editor': mavonEditor
    },
    name: 'topicdetail',
    data() {
      return {
        tid: '',
        topicdetail: [],
        currentUserEmail: '',
        commentContent: ''
      }
    },
    mounted() {
      this.tid = this.$route.params.t_id;
      this.currentUserName = localStorage.getItem('userName');
      this.currentUserEmail = localStorage.getItem('userEmail');
      this.currentUserId = localStorage.getItem('userId');

      this.fetchTopicDetail();
    },
    methods: {

      fetchTopicDetail() {
        let params = {_id: this.tid};
        this.$http.get(this.$config.topic.url, {params: params})
          .then(response => {
            let res = response.data;
            if (res.status === this.$status.success) {
              this.topicdetail = res.data[0];
            } else {
              this.topicdetail = []
            }
          }).catch(error => {
          console.log(error)
        });
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

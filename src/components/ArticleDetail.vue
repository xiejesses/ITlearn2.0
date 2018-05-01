<template>
  <div class="share">
    <main>
      <section class="topic-content">
        <div class="user-info">
          <div class="user-avatar">
            <v-gravatar v-bind:email="detail.user.email" :size='40' />
          </div>
          <div class="meta" style="margin-left:10px">
            <router-link :to="{ name: 'user_article', params: { userId: detail.user._id }}">{{detail.user.nickname}}</router-link>
            <span class="separator">• </span>
            <abbr class="timeago" :title="new Date(detail.createDateTime)"> {{ moment(new Date(detail.createDateTime), "YYYYMMDDHHmmss").fromNow() }}</abbr>
          </div>
        </div>
        <div v-show="detail.user._id === currentUserId" style="float:right">
          <el-dropdown size="mini" split-button type="primary">
            选项
            <el-dropdown-menu slot="dropdown">
              <router-link :to="{name: 'modify_recommend', params: {recommendId: detail._id}}" style="{text-decoration:none}">
                <el-dropdown-item>
                 修改
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <p class="topic-name">{{detail.title}}</p>
        <p v-show="detail.desc" class="desc">{{detail.desc}}</p>
        <div v-if="!detail.url || detail.url == ''" v-html="detail.content" class="markdown-body"></div>
        <a class="linkto" target="_blank" v-if="detail.url && detail.url !== ''" :href="detail.url"><span>阅读原文</span></a>
      </section>

      <comment :topic="Number(recommend)"></comment>

    </main>


  </div>
</template>
<script>
  import 'mavon-editor/dist/css/index.css';
  import 'mavon-editor/src/lib/font/css/fontello.css';
  import '../../static/css/markdown.css';
  import comment from './libs/Commment.vue';

  export default {
    name: 'ArticleDetail',
    components: {
      comment
    },
    data() {
      return {
        detail: {},
        recommend: Number(this.$route.params.shareId),
        currentUserId: Number(localStorage.getItem("userId")),
      };
    },
    mounted() {
      this.fetchRecommend();
    },

    methods: {
      // 获取分享
      fetchRecommend(){
        let params = {_id: this.recommend};
        this.$http.get(this.$config.recommend.url, {params: params})
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success) {
              this.detail = res.data[0];
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(err => {
              this.$message.error(err.response.data.message);
          });
      },

      // 打开链接
      openUrl() {
        window.open(this.detail.url);
      }
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
  .desc {
    /* width: 200px; */
    padding: 15px 50px 15px 15px;
    border-left: 4px solid #4b616a;
    margin-bottom: 40px;
    /* background-color: #edecef3d; */
  }
  .linkto{
    color:white;
    text-decoration: none;
    padding: 8px 15px;
    background-color: #66b1ff;
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


</style>

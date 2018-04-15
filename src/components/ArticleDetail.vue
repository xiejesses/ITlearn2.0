<template>
  <div class="share">
    <el-container>
      <el-main>
        <el-card>
          <!--标题-->
          <h1 class="cxy-h1">{{detail.title}}</h1>

          <!--desc-->
          <div>{{detail.desc}}</div>

          <!--内容-->
          <div v-if="!detail.url || detail.url === ''" v-html="detail.content" class="markdown-body"></div>

          <!--链接按钮-->
          <el-button v-if="detail.url && detail.url !== ''" type="primary" @click="openUrl">查看链接</el-button>
        </el-card>
      </el-main>
      <el-aside style="padding: 20px;">
        <el-card>
          <section class="user-avatar">
            <!--头像-->
            <v-gravatar v-bind:email="detail.user.email" size='40' :alt="detail.user.nickname"/>
            <!--昵称-->
            <span class="cxy-nickname">{{detail.user.nickname}}</span>
          </section>
          <!--时间-->
          <abbr class="timeago" :title="new Date(detail.createDateTime)">
            {{ moment(new Date(detail.createDateTime), "YYYYMMDDHHmmss").fromNow() }}
          </abbr>
        </el-card>
      </el-aside>
    </el-container>

    <comment :topic="Number(recommend)"></comment>
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
        recommend: Number(this.$route.params.shareId)
      };
    },
    mounted() {
      this.fetchRecommend();
    },

    methods: {
      // 获取分享
      fetchRecommend(){
        let params = {recommend: this.recommend};
        this.$http.get(this.$config.recommend.url, params)
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

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .cxy-nickname{
    margin-left:5px;
  }
  .user-avatar{
    float: left;
  }

  .clearfix{
    clear: both
  }

</style>

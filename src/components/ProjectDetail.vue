<template>
  <div class="share">
    <main>
      <section class="project-content">
        <div class="user-info">
          <div class="user-avatar">
            <v-gravatar :email="detail.user.email" :size='40'/>
          </div>
          <div class="meta" style="margin-left:10px">
            <router-link :to="{ name: 'User', params: { userId: detail.user._id }}">{{detail.user.nickname}}</router-link>
            <span class="separator"> • </span>
            <abbr class="timeago" :title="new Date(detail.date)">
              {{ moment(new Date(detail.date), "YYYYMMDDHHmmss").fromNow() }}
            </abbr>
            <span class="separator"> • </span>
            <el-tag size="mini" v-if="detail.state === 0">正在开发ing...</el-tag>
            <el-tag size="mini" v-if="detail.state === 1">招募成员</el-tag>
            <el-tag size="mini" v-if="detail.state === 2">维护ing</el-tag>
          </div>
        </div>
        <p class="project-name"><a :href="detail.git">{{detail.name}}</a></p>
        <div class="tags">
          <div><span class="left">Powered by</span><span class="right"><a :href="gitDetail.owner.html_url">{{gitDetail.owner.login}}</a></span></div>
          <div><span class="left">star</span><span class="right blue">{{gitDetail.watchers}}</span></div>
          <div><span class="left">fork</span><span class="right orange">{{gitDetail.forks_count}}</span></div>
          <div><span class="left">watch</span><span class="right">{{gitDetail.subscribers_count}}</span></div>
          <div><span class="left">date</span><span class="right gray">{{moment(new Date(gitDetail.created_at), "YYYYMMDDHHmmss").fromNow()}}</span></div>
        </div>
        <p class="desc">{{gitDetail.description}}</p>
        <p v-show="detail.desc">{{detail.desc}}</p>
      </section>
      <comment :project="Number(project)"></comment>
    </main>
  </div>
</template>
<script>
  import 'mavon-editor/dist/css/index.css';
  import 'mavon-editor/src/lib/font/css/fontello.css';
  import '../../static/css/markdown.css';
  import comment from './libs/Commment.vue';

  export default {
    name: 'ProjectDetail',
    components: {
      comment
    },
    data() {
      return {
        detail: {
          user: {email: ""}
        },
        gitDetail: {
          owner: {login: "", html_url: ""}
        },
        project: Number(this.$route.params.projectId)
      };
    },
    mounted() {
      this.fetchProject();
    },

    methods: {
      // 获取分享
      fetchProject(){
        let params = {_id: this.project};
        this.$http.get(this.$config.project.url, {params: params})
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success) {
              this.detail = res.data[0];
              this.getGitDetail(this.detail);
            } else {
              console.log(res.message);
            }
          })
          .catch(err => {
            this.$message.error(err.response.data.message);
          });
      },

      // 获取git 信息
      getGitDetail(detail){
        let apiUrl = "https://api.github.com/repos/" + detail.owner + "/" + detail.name;
        this.$http.get(apiUrl)
          .then(response => {
            this.gitDetail = response.data;
          })
          .catch(error => {
            console.log(error.stack);
            this.$message.error("网络异常");
          })
        ;
      },

      // 打开链接
      openUrl() {
        window.open(this.detail.git);
      }
    }
  }

</script>

<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
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

  .project-name a {
    text-decoration: none;
    color:#2D2D2F;
     font-size: 30px;
  }
  .desc {
    padding: 15px 50px 15px 15px;
    border-left: 4px solid #4b616a;
    margin-bottom: 40px;
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

  .tags {
    display:flex;
  }
  .tags div {
    margin-right: 10px;
  }
  .left {
    display:inline-block;
    font-size: 13px;
    padding: 1px 10px;
    color:#fff;
    background:#4f4f4f;
  }
  .right {
    display:inline-block;
    font-size: 13px;
    padding: 1px 10px;
    color:#fff;
    background:#8ab932;
  }
  .blue {
    background:#0b74b5
  }
  .orange {
    background: #e07441;
  }
  .gray {
    background: #959594;
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

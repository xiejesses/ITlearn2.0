<template>
  <div class="project">
    <main>
      <section class="projects">
        <ul class="projects-list">
          <li v-for="(project, index) in projects" :key="project._id">
            <section class="user-avatar">
              <v-gravatar :email="project.user.email" ::size='40' :alt="project.user.nickname"></v-gravatar>
            </section>
            <section class="projects-meta">
              <div class="projects-name">
                <h2>
                  <router-link :to="{ name: 'projectDetail', params: { g_id: project._id }}">{{project.name }}
                  </router-link>
                </h2>
              </div>
              <div class="projects-intro">
                {{ project.desc }}
              </div>
              <div class="author-meta">
                <router-link :to="{ name: 'p', params: { uName: project.user._id }}"> {{ project.user.nickname
                  }}
                </router-link>
                <span class="separator">• </span>
                <abbr class="timeago" :title="new Date(project.date)">{{ moment(new Date(project.date), "YYYYMMDDHHmmss").fromNow() }}</abbr>
                <span class="separator"> • </span>

              </div>
            </section>
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
  export default {
    name: 'project',
    data() {
      return {
        projects:[],
        busy:true,
        page:1,
        pageSize:5,
        member:''
      }
    },
    mounted() {
      this.fetchProject();
    },
    methods: {
      fetchProject(flag) {
        let params = {
          page: this.page,
          page_size: this.pageSize,
          isPass: true
        };

        this.$http.get(this.$config.project.url, {params: params})
          .then((response) => {
            let res = response.data;
            if (res.status === this.$status.success) {

              // 不是第一次，需要拼接数据
              if (flag) {
                this.projects = this.projects.concat(res.data);
                //如果没有数据，停止滚动加载
                this.busy = res.data.length === 0;
              } else {
                this.projects = res.data;
                this.busy = false;
              }
            } else {
              this.projects = [];
            }
          }).catch(error =>
          this.$message.error(error.response.data.message)
        );
      },

      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.fetchProject(true);
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
  abbr {
    font-size: 11px;
  }
  .projects-intro {
    max-width: 300px;
    text-align: left;
    font-size: 14px;
    margin-bottom: 5px;
    color:#423c3c;
  }
  main {
    width: 100%;
    margin: 0 auto;
    height: auto;
  }
  .projects li {
    border-bottom: 1px solid #f3f3f3;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
  }
  .projects-meta {
    padding: 15px 0;
    -webkit-box-flex: 1;
    flex: 1;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .projects-name a {
    font-size: 18px;
    color: #54595f;
    text-decoration: none;
  }
  .projects-name h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  .projects-name a:hover {
    color: #EC681B;
  }
  .user-avatar {
    width: 20px;
    height: 20px;
    margin: 25px 7px 0 4px;
    align-self: baseline;
  }

  .user-avatar img {
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }

  .author-meta {
    color: #8f8f8f;
    font-size: 12px;
    line-height: 18px;
    position: relative;
  }

  .author-meta a {
    color: #8f8f8f;
    padding: 3px 0 0 0;
    text-decoration: none;
    border-bottom: 2px solid #f3f3f3;
  }
  .users::before {
    font-size: 11px;
  }
  .users-number {
    margin-left: 3px;
  }

  .join-project button {
    background: none;
    border: 1px solid #8f8f8f;
    outline:none;
    border-radius: 20px;
    padding: 3px 10px;
    margin: 0 5px 0 10px;
    color: #8f8f8f;

  }
  .join-project button:hover {
    color: #2DBF80;
    border-color: #2DBF80;
  }

  @media screen and (min-width:500px) {
    .projects-name a{
      font-size: 20px;
    }
    .author-meta {
      font-size: 14px;
      margin: 3px 0 4px 0;
    }
    abbr {
      font-size: 13px;
    }
    .projects-intro {
      max-width: 400px;
      font-size: 15px;
    }
    .join-project button {
      padding: 5px 15px;
    }
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
    .projects-name a{
      font-size: 21px;
      line-height: 28px;
    }
    .author-meta a{
      font-size: 15px;
      line-height: 24px;
    }
    .projects-intro {
      max-width: 450px;
    }
  }

  @media screen and (min-width:960px) {
    .projects-intro {
      max-width: 450px;
      font-size: 16px;
    }
    .users::before {
      font-size: 13px;
    }
  }

  @media screen and (min-width:1200px) {
    .projects-name a{
      font-size: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .projects-intro {
      max-width: 500px;
    }
  }

</style>

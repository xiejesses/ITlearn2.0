<template>
  <div class="group">
    <main>
      <section class="groups">
        <ul class="groups-list">
          <li v-for="(group, index) in groups" v-bind:key="group._id">
            <section class="user-avatar">
              <v-gravatar v-bind:email="group.user.email" size='40' :alt="group.user.nickname" ></v-gravatar>
            </section>
            <section class="groups-meta">
              <div class="groups-name">
                  <h2><router-link :to="{ name: 'groupdetail', params: { g_id: group._id }}">{{group.name }}</router-link></h2>
                  </div>
              <div class="groups-intro">
                  {{ group.groupIntro }}
              </div>
              <div class="author-meta">
                <router-link :to="{ name: 'article', params: { uName: group.user._id }}"> {{ group.user.nickname }}</router-link>
                <span class="separator">• </span>
                <abbr class="timeago" :title="new Date(group.createDateTime)"> {{ moment(new Date(group.createDateTime), "YYYYMMDDHHmmss").fromNow() }}</abbr>
                <span class="separator"> • </span><i class="users el-icon-fa el-icon-fa-users" aria-hidden="true" title="成员人数"></i><span class="users-number">{{group.users.length}}</span>

              </div>
            </section>
            <section class="join-group">
              <button v-if="lovegroupid.indexOf(group._id) >= 0" @click="addlovegroup(group._id,index)">退出</button>
              <button v-else @click="addlovegroup(group._id,index)">加入</button>
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
    name: 'group',
    data() {
      return {
        groups:[],
        busy:true,
        page:1,
        pageSize:5,
        lovegroupid: [],
        member:''
      }
    },
    mounted() {
       this.fetchGroup();
       this.fetchLovegroup()
    },
    methods:{
      fetchGroup (flag) {
        let param = {
          page:this.page,
          page_size:this.pageSize,
        };
        this.$http.get(this.$config.group.url, {params: param}
        ).then((response) => {
          let res = response.data;
          if (res.status === this.$status.success) {

            // 不是第一次，需要拼接数据
            if (flag) {
              this.groups = this.groups.concat(res.data);
              //如果没有数据，停止滚动加载
              this.busy = res.data.length === 0;
            } else {
              this.groups = res.data;
              this.busy = false;
            }
          } else {
            this.groups = [];
          }
        }).catch(error =>
          this.$message.error(error.response.data.message)
        );
      },

      addlovegroup(group_id, index) {
        if (!localStorage.getItem('userName')) {
          this.$message.error(`请先登录！`);
          return false;
        } else {
          this.$http.get(this.$config.group.join.url.format({"group_id": group_id}))
            .then(response => {
              let res = response.data;
              if (res.status === this.$status.success) {
                this.lovegroupid = res.lovegroup;
                this.$message.success('加入成功');
              } else {
                this.$message.error('发生错误');
              }
            })
            .catch(
              err => this.$message.error()
            );
          }
        }
      },
      fetchLovegroup() {
        if (localStorage.getItem('userName')) {
          let param = {
            users: localStorage.getItem('userId')
          };
          this.$http.get(this.$config.group.url, {params: param})
            .then(response => {
              let res = response.data;
              if (res.status === this.$status.success) {
                this.lovegroupid = [];
                for (let group of res.data) {
                  this.lovegroupid.push(group._id);
                }
              } else {
                // todo 获取当前用户喜爱小组失败
              }
            })
            .catch(err =>
              this.$message.error(err.response.data.message)
            );
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
.groups-intro {
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
  .groups li {
    border-bottom: 1px solid #f3f3f3;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
  }
  .groups-meta {
     padding: 15px 0;
    -webkit-box-flex: 1;
    flex: 1;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .groups-name a {
    font-size: 18px;
    color: #54595f;
    text-decoration: none;
  }
  .groups-name h2 {
      margin-top: 0;
      margin-bottom: 10px;
  }
  .groups-name a:hover {
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

    .join-group button {
        background: none;
        border: 1px solid #8f8f8f;
        outline:none;
        border-radius: 20px;
        padding: 3px 10px;
        margin: 0 5px 0 10px;
        color: #8f8f8f;

    }
    .join-group button:hover {
        color: #2DBF80;
        border-color: #2DBF80;
    }

  @media screen and (min-width:500px) {
    .groups-name a{
      font-size: 20px;
    }
    .author-meta {
      font-size: 14px;
      margin: 3px 0 4px 0;
    }
    abbr {
      font-size: 13px;
    }
    .groups-intro {
        max-width: 400px;
        font-size: 15px;
    }
    .join-group button {
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
    .groups-name a{
      font-size: 21px;
      line-height: 28px;
    }
    .author-meta a{
      font-size: 15px;
      line-height: 24px;
    }
    .groups-intro {
        max-width: 450px;
    }
  }

  @media screen and (min-width:960px) {
    .groups-intro {
        max-width: 450px;
        font-size: 16px;
    }
    .users::before {
      font-size: 13px;
  }
  }

  @media screen and (min-width:1200px) {
    .groups-name a{
      font-size: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .groups-intro {
        max-width: 500px;
    }
  }

</style>

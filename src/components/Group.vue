<template>
  <div class="group">
    <main>
      <section class="groups">
        <ul class="groups-list">
          <li v-for="(group,index) in groups" v-bind:key="group._id">
            <section class="user-avatar">
              <v-gravatar v-bind:email="group.author.userEmail" size='40' />
            </section>
            <section class="groups-meta">
              <div class="groups-name">
                  <!-- <h2><router-link :to="{ name: 'groupdetail', params: { gName: group.groupName }}">{{group.groupName}}</router-link></h2> -->
                  <h2><router-link :to="{ name: 'groupdetail', params: { g_id: group._id }}">{{group.groupName}}</router-link></h2>
                  </div>
              <div class="groups-intro">
                  <!-- 一起学习 vue 相关的知识,探索和发现各种技巧,提出你踩过的坑
                  一起学习 vue 相关的知识,探索和发现各种技巧,提出你踩过的坑 -->
                  {{ group.groupIntro }}
              </div>
              <div class="author-meta">
                <router-link :to="{ name: 'article', params: { uName: group.author.userName }}"> {{ group.author.userName }}</router-link>
                <span class="separator">• </span>
                <abbr class="timeago" :title="new Date(group.createTime)"> {{ moment(new Date(group.createTime), "YYYYMMDDHHmmss").fromNow() }}</abbr>
                <!-- <span class="separator">• </span> -->
                <!-- <router-link :to="{ name: 'like', params: { uName: userName }}">Vue</router-link> -->
                <span class="separator"> • </span><i class="users el-icon-fa el-icon-fa-users" aria-hidden="true" title="成员人数"></i><span class="users-number">{{group.member.length}}</span>
                
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
 import axios from 'axios'
  export default {
    name: 'group',
    data() {
      return {
        // userName: 'jesses',
        // groupName:'打开Vue的大门',
        // creatTime: '2017-11-2 16:30:20',
        // joinmsg:'关注',
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
          pageSize:this.pageSize,
          userName:this.$route.params.uName
        };
        axios.get("/group/fetchgroup",
          {params:param}
        ).then( (response) => {
         
          // this.loading = false;
          // this.articles = res.data.result.list;


          var res = response.data;
                // this.loading = false;
                // status == 0 数据读取成功
                if(res.status=="1"){
                  // 不是第一次，需要拼接数据
                  if(flag){
                      this.groups = this.groups.concat(res.result.list);
                        //如果没有数据，停止滚动加载
                      if(res.result.count==0){
                          this.busy = true;
                      }else{
                          this.busy = false;
                      }
                  }else{
                      this.groups = res.result.list;
                      this.busy = false;
                  }
                }else{
                  this.groups = [];
                }

        }).catch(function (error) {
          console.log(error)
        })
      },

      addlovegroup(group_id, index) {
        if (!localStorage.getItem('userName')) {
          this.$message.error(`请先登录！`);
          return false;
        } else {
          this.$http.post('/group/joingroup', {
            _id: group_id,
            userName: localStorage.getItem('userName')
          }).then(response => {
            let res = response.data
            if (res.status == "1") {
              // this.isHeartClick = true;
              // this.i = index;
              this.lovegroupid = res.lovegroup;
              // this.joinmsg = "取消关注"
              this.$message.success('加入成功');
              // return true;
            } else if (res.status == "2") {
              // this.isHeartClick = false;
              // this.i = -1;
              this.lovegroupid = res.lovegroup;
              this.$message.success('退出成功');
              // return false;
            } else {
              this.$message.error('发生错误');
            }
          })
        }
      },
      fetchLovegroup() {
        if (localStorage.getItem('userName')) {
          let param = {
            userName: localStorage.getItem('userName')
          }
          this.$http.get('/users/getlovegroup', {
              params: param
            })
            .then(response => {
              let res = response.data;
              if (res.status == '1') {
                this.lovegroupid = res.doc.lovegroup;
                // console.log(`this.lovelinkid:${this.lovelinkid}`)
                // console.log('lovelink-成功')
              } else {
                // console.log('lovelink-失败')
              }
            })
        }
        // else {
        //   return false;
        // }
      },

      loadMore(){
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
ul,
li,
a {
    padding: 0;
    margin: 0;
    list-style: none;
    /* text-decoration: none; */
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
    /* color:black; */
}
  main {
    width: 100%;
    margin: 0 auto;
    /* border: 1px solid green; */
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
      /* margin: 0 0 10px 0; */
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
    /* main {
      width: 720px;
      margin: 0 auto;
      height: auto;
    } */
    .groups-intro {
        max-width: 450px;
        font-size: 16px;
    }
    .users::before {
      font-size: 13px;
  }
  }

  @media screen and (min-width:1200px) {
    /* main {
      width: 940px;
      margin: 0 auto;
      height: auto;
    } */
    .groups-name a{
      font-size: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .groups-intro {
        max-width: 500px;
    }
  }
  /* @media screen and (min-width:1600px) {
    main {
      width: 940px;
      width: 100%;
      margin: 0 auto;
      height: auto;
    }
  } */

</style>

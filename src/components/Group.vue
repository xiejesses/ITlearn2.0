<template>
  <div class="group">
    <main>
      <section class="groups">
        <ul class="groups-list">
          <li>
            <section class="user-avatar">
              <v-gravatar email="835614574@qq.com" size='40' />
            </section>
            <section class="groups-meta">
              <div class="groups-name">
                  <h2><router-link :to="{ name: 'groupdetail', params: { gName: groupName }}">{{groupName}}</router-link></h2>
                  </div>
              <div class="groups-intro">
                  一起学习 vue 相关的知识,探索和发现各种技巧,提出你踩过的坑
                  一起学习 vue 相关的知识,探索和发现各种技巧,提出你踩过的坑
              </div>
              <div class="author-meta">
                <router-link :to="{ name: 'like', params: { uName: userName }}"> {{ userName }}</router-link>
                <span class="separator">• </span>
                <abbr class="timeago" :title="creatTime"> {{ moment(creatTime, "YYYYMMDDHHmmss").fromNow() }}</abbr>
                <!-- <span class="separator">• </span> -->
                <!-- <router-link :to="{ name: 'like', params: { uName: userName }}">Vue</router-link> -->
                <span class="separator"> • </span><i class="users el-icon-fa el-icon-fa-users" aria-hidden="true" title="成员人数"></i><span class="users-number">10</span>
                
              </div>
            </section>
            <section class="join-group"><button>加入</button></section>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>
<script>
  export default {
    name: 'group',
    data() {
      return {
        userName: 'jesses',
        groupName:'打开Vue的大门',
        creatTime: '2017-11-2 16:30:20',
        msg: '我的小组'
      }
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
    main {
      width: 720px;
      margin: 0 auto;
      /* border: 1px solid green; */
      height: auto;
    }
    .groups-intro {
        max-width: 450px;
        font-size: 16px;
    }
    .users::before {
      font-size: 13px;
  }
  }

  @media screen and (min-width:1200px) {
    main {
      width: 940px;
      margin: 0 auto;
      /* border: 1px solid green; */
      height: auto;
    }
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

<template>
  <div id="follow">
    <div class="container">
      <section class="user-profile-wrap">
          <div v-for="userInfo in userInfos"  v-bind:key="userInfo._id" class="user-profile">
              <div class="head-bg"></div>
              <div class="user-info">
                <div class="user-avatar">
                    <v-gravatar v-bind:email="userInfo.userEmail" size='40' />
                </div>
                <div class="username">
                    <router-link :to="{ name: 'user_article', params: { uName: userInfo.userName }}">{{userInfo.userName}}</router-link>
                    </div>
                <div class="userIntro">{{userInfo.userIntro}}</div>
              </div>
          </div>
          
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'follow',
    data() {
      return {
        userName: '',
        userInfos: [],
      }
    },
    mounted() {
      this.userName = this.$route.params.uName;
      console.log(this.$route.name)
      this.fetchFollowUser()
    },
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    },
    methods: {
      fetchFollowUser() {
        let param = {
          userName: this.$route.params.uName,
          followRel: this.$route.name
        };
        this.$http.get('/users/getfollowUser', {
          params: param
        }).then(response => {
          let res = response.data;
          if (res.status == "1") {
            this.userInfos = res.result;
            console.log(this.userInfo.userEmail)
          } else {
            return false
          }
        })



      },
    }
  }

</script>

<style scoped>
a {
    text-decoration: none;
    color: #54595f
}
.user-profile-wrap {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 10px 20px;
    background: #e7edf1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: wrap
}
.user-profile {
    
    height: 160px;
    overflow: hidden;
    background: white;
}
.user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -20px;
}
.username {
    font-size: 25px;
}
.user-avatar img{
    border-radius: 50%;
}
.head-bg {
    height: 50px;
    background: #5e8579;
}
.userIntro {
    text-overflow: ellipsis;
    padding: 10px;

    text-align: center;
    
}
</style>

<template>
  <div id="follow">
    <div class="container">
      <section class="user-profile-wrap">
          <div v-for="userInfo in userInfos"  v-bind:key="userInfo._id" class="user-profile">
              <div class="head-bg"></div>
              <div class="user-info">
                <div class="user-avatar">
                    <v-gravatar v-bind:email="userInfo.email" size='40' />
                </div>
                <div class="username">
                    <router-link :to="{ name: 'user_article', params: { userId: userInfo._id }}">{{userInfo.nickname}}</router-link>
                    </div>
                <div class="userIntro">{{userInfo.desc}}</div>
              </div>
          </div>

      </section>
    </div>
  </div>
</template>

<script>
// document.querySelector('.head-bg').onmousemove = (e) => {

// 	const x = e.pageX - e.target.offsetLeft
// 	const y = e.pageY - e.target.offsetTop

// 	e.target.style.setProperty('--x', `${ x }px`)
// 	e.target.style.setProperty('--y', `${ y }px`)

// }
  export default {
    name: 'follow',
    data() {
      return {
        userName: '',
        userInfos: [],
      }
    },
    mounted() {
      this.userId = this.$route.params.userId;
      console.log(this.$route.name);
      this.fetchFollowUser()
    },
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
      }
    },
    methods: {
      fetchFollowUser() {
        let params = {};
        if (this.$route.name === "following"){
          params["user"] = parseInt(this.$route.params.userId);
        } else {
          params["follower"] = parseInt(this.$route.params.userId);
        }

        this.$http.get(this.$config.relation.url, {params: params})
          .then(response => {
            let res = response.data;
            if (res.status === 0) {
              this.userInfos = res.data;
            } else {
              return false
            }
          })
          .catch(err => {
              this.$message.error(err.response.data.message);
          });
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
    position: relative;
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
    position: relative;
    height: 50px;
    background: #5e8579;
}

/* .head-bg::before {
  --size: 0;
  content: '';
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle closest-side, #4405f7, transparent);
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transition: width .2s ease, height .2s ease;
  transition: width .2s ease, height .2s ease;
}
.head-bg:hover::before {
  --size: 100px;
} */

.userIntro {
    text-overflow: ellipsis;
    padding: 10px;

    text-align: center;

}
</style>

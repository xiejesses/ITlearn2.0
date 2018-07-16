<template>

</template>
<script>
  import {
    mapActions
  } from 'vuex'
  export default {
    name: 'turn_to_page',
    mounted() {

      this.$http.post(this.$config.user.login.url, {
        email: this.$route.query.email,
        uuid: this.$route.query.token
      })
      .then(response => {
        let data = response.data;
        if (data.status === this.$status.success) {
          this.userLogin(data.user);
          console.log("验证成功");
          this.$router.push({name: 'vindex'});
        } else {
          this.$message.error(data.message);
        }
      })
      .catch(err => {
        console.log(err);
        console.log(err.stack);
        if (err.response) {
          this.$message.error(err.response.data.message);
        }
      });
    },
    methods: {
      ...mapActions(['userLogin']),
    }
  }
</script>
<style>

</style>

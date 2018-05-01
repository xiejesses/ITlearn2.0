<template>
  <div>
    <div class="tab">
      <router-link :to="{name: 'message'}" :exact="true" class="ListItem">
        <el-badge :is-dot="message" class="item">消息</el-badge></router-link>
      <router-link :to="{name: 'users_message'}" class="LastItem">
        <el-badge :is-dot="usersMessage" class="item">动态</el-badge></router-link>
      <router-link :to="{name: 'system_message'}" class="LastItem">
        <el-badge :is-dot="systemMessage" class="item">系统通知</el-badge></router-link>
    </div>
      <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:'notification',
  data() {
      return {
        message: false,
        usersMessage: false,
        systemMessage: false
      }
  },
  mounted(){
    this.getUserMessageCount();
    this.getPersonMessageCount();
    this.getSystemMessageCount();
  },
  methods: {
    getPersonMessageCount() {
      let params = {
        receiver: Number(localStorage.getItem("userId")),
        type: 0,
        isSee: false
      };
      this.$http.get(this.$config.new.count.url, {params: params})
        .then(response => {
          let data = response.data;
          if (data.status === this.$status.success) {
            this.message = data.count !== 0;
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
    getUserMessageCount() {
      let params = {
        receiver: Number(localStorage.getItem("userId")),
        type: 1,
        isSee: false
      };
      this.$http.get(this.$config.new.count.url, {params: params})
        .then(response => {
          let data = response.data;
          if (data.status === this.$status.success) {
            this.usersMessage = data.count !== 0;
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
    getSystemMessageCount() {
      let params = {
        receiver: Number(localStorage.getItem("userId")),
        type: 2,
        isSee: false
      };
      this.$http.get(this.$config.new.count.url, {params: params})
        .then(response => {
          let data = response.data;
          if (data.status === this.$status.success) {
            this.systemMessage = data.count !== 0;
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
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
  font-size: 16px;
  color:#54595f;
  margin-right: 10px;
}
.tab {
  margin: 20px 0;
}
.router-link-active {
    padding-bottom: 5px;
    border-bottom: 2px solid #2DBF80;
  }

</style>

<template>
  <div>
    <div class="tab">
        <router-link to="/notification" :exact="true" class="ListItem">消息</router-link>
        <router-link to="/notification/system" class="LastItem">系统通知</router-link>
    </div>

        <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:'notification',
  data() {
      return {
      }
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

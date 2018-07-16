<template>
  <div class="Search">
    <div class="tab">
      <router-link :to="{ name: 'search_article', query: {query: $route.query.query}}" :exact="true" class="ListItem">文章</router-link>
      <router-link :to="{ name: 'search_group', query: {query: $route.query.query}}" class="ListItem">小组</router-link>
      <router-link :to="{ name: 'search_topic', query: {query: $route.query.query}}" class="ListItem">话题</router-link>
      <router-link :to="{ name: 'search_project', query: {query: $route.query.query}}" class="ListItem">项目</router-link>
    </div>

    <router-view :key="key"></router-view>
  </div>
</template>

<script>
  export default {
      name:'Search',
    data() {

      return {
         search_condition:'',
      }
    },
    beforeRouteEnter (to, from, next) {

      if(to.query.query !== '') {
        next()
      } else {
        console.log(from);
        window.alert('请输入搜索内容！');
        // this.$message.success('请输入搜索内容！');
        next(false)
      }
    },
    mounted() {
      this.search_condition = this.$route.query.query;
      console.log(this.$route.query.query)
    },
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab {
  margin-top: 10px;
  margin-left: 10px;
}
 .ListItem {
   text-decoration: none;
   color: cadetblue;
   font-size: 18px;
   margin-right: 5px;
 }
</style>

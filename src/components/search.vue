<template>
  <div class="Search">
    <div class="tab">
      <router-link :to="{ name: 'search_article', query: {query: $route.query.query}}" :exact="true" class="ListItem">文章</router-link>
      <router-link :to="{ name: 'search_group', query: {query: $route.query.query}}" class="ListItem">小组</router-link>
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

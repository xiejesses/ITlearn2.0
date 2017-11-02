<template>
  <div class="index">
    <p>{{msg}}</p>
    <!-- <input type="text" ref="input" class="search-input" name="s" placeholder="搜索文章..." v-focus="true"> -->
    <!-- <el-input v-model="input" placeholder="请输入内容" v-focus="true"></el-input> -->
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: ''
    }
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

<template>
  <div id="search">
    <form class="search-form" method="get" action="" role="search" v-on:click.stop>
          <input type="text" ref="input" class="search-input" name="s" placeholder="搜索文章..." autofocus>
          <i class="search-icon el-icon-search"></i>
        </form>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'search',
}
</script>

<style scoped>
.search-form {
    padding: 40px 0 0 0;
    position: relative;
    margin: 0 auto;
    width: 80%;
  }

  .search-input {
    display: block;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 22px;
    line-height: 22px;
    color: #37414c;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  .search-icon {
    position: absolute;
    right: 5px;
    top:50%;
    margin-top: -8px;
    cursor: pointer;
  }
</style>

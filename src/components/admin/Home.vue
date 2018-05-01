<template>
  <div class="home">
    <section class="data-body">
      <h2>欢迎来到 ITlearn 后台管理系统</h2>
      <!-- <div class="today-data">
        <div>当日数据</div>
        <div><span>12</span> 新增用户</div>
        <div><span>23</span> 新增推荐</div>
        <div><span>6</span> 新增小组</div>
      </div>
      <div class="all-data">
        <div>总数据</div>
        <div><span>6</span> 所有用户</div>
        <div><span>6</span> 所有推荐</div>
        <div><span>6</span> 所有小组</div>
      </div> -->
    </section>
  </div>
</template>

<script>
  export default {
    name:'home',
    data() {

      return {
      }
    },
    methods: {
      fetAllData() {
        
      }
    }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.data-body{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
 .today-data,
 .all-data {
    display:flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
 }
 .today-data div,
 .all-data div{
    /* text-align: center; */
    width: 100px;
    padding: 8px 20px;
    margin-right: 10px;
    background-color: #7da38842;
    /* border: 1px solid green; */
    border-radius: 8px;
 }
 .today-data div:nth-child(1) {
   background-color:#7dd0a9;
 }
 .all-data div:nth-child(1) {
   background-color:#6d95c4;
 }


</style>

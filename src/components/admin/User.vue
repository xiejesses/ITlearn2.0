<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="_id" label="id" width="80">
      </el-table-column>
      <el-table-column prop="createDateTime" label="注册时间" width="180" :formatter="formatDate">
      </el-table-column>
      <el-table-column prop="nickname" label="用户昵称" width="180" @click="">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
        page: 1,
        pageSize: 10,
        tableData: [],
        pageSum: 1,
        count: 0,
      }
    },
    mounted() {
      this.fetchUser();
      this.getUserCount();
    },
    methods: {

      // 处理当前页
      handleCurrentChange(page){
        this.page = Number(page);
        this.fetchUser();
      },

      // 获取用户
      fetchUser(){
        let params = {page: this.page, page_size: this.pageSize};
        this.$http.get(this.$config.user.url, params)
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success) {
              this.tableData = res.data;
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(
            err => this.$message.error(err.response.data.message)
          );
      },

      // 点击打开
      formatDate(row){
        return this.moment(new Date(row.createDateTime), 'YYYYMMDDHHmmss').fromNow();
      },

      // 获取用户
      getUserCount(){
        this.$http.get(this.$config.user.count.url)
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success) {
              this.count = res.count;
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(
            err => this.$message.error(err.response.data.message)
          );
      },

      // 跳转
      turnToUser() {
        window.open()
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

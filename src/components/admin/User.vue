<template>
  <div>

    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item label="属性">
        <el-select v-model="search.meta" placeholder="属性">
          <el-option label="id" value="_id"></el-option>
          <el-option label="昵称" value="nickname"></el-option>
          <el-option label="邮箱" value="email"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="输入搜索内容">
        <el-input v-model="search.content" placeholder="输入搜索内容" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="_id" label="id" width="80">
      </el-table-column>
      <el-table-column prop="createDateTime" label="注册时间" width="180" :formatter="formatDate">
      </el-table-column>
      <el-table-column prop="nickname" label="用户昵称" width="180" @click="">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column label="设置管理员">
        <template slot-scope="scope">
          <el-tooltip :content="'Switch value: ' + scope.row.isManager" placement="top" >
            <el-switch
              v-model="scope.row.isManager"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="patchUser(scope.row.isManager, scope.row._id)">
            </el-switch>
          </el-tooltip>
        </template>
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
        search: {
          meta: '_id',
          content: ''
        }
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

      // 搜索
      onSubmit() {
        let params = {};
        if (this.search.content === "") {
          this.$message.error("不得为空");
          return;
        }

        if (this.search.meta in ["_id", "user", "group", "project", "recommend"]) {
          params[this.search.meta] = Number(this.search.content);
          if(isNaN(params._id)) {
            this.$message.error("id为数字");
            return;
          }
        } else {
          params[this.search.meta] = {$regex: this.search.content};
        }

        this.$http.get(this.$config.user.url, {params: {$: JSON.stringify(params)}})
          .then(response => {
            let data = response.data;
            if (data.status === this.$status.success) {
              this.tableData = data.data;
              this.count = data.data.length;
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

      // 设置管理员
      patchUser(isManager, _id){
        this.$http.patch(this.$config.user.url + "?_id=" + _id, {isManager: isManager})
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success) {
              this.fetchUser();
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

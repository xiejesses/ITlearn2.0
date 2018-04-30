<template>
  <div>
    <el-table :data="tableData" style="width: 100%">

      <el-table-column prop="date" label="发表日期" sortable width="120" :formatter="formatDate">
      </el-table-column>

      <el-table-column prop="user.nickname" label="用户名" width="180">
      </el-table-column>

      <el-table-column prop="name" label="项目名"></el-table-column>

      <el-table-column prop="state" label="状态" width="180" ></el-table-column>
      <el-table-column label="审核">
        <template slot-scope="scope">
          <el-tooltip :content="'Switch value: ' + scope.row.isPass" placement="top">
            <el-switch
              v-model="scope.row.isPass"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="patchProject(scope.row.isPass, scope.row._id)">
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteProject(scope.$index, scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'project',
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
      this.fetchProject();
      this.getProjectCount();
    },
    methods: {
      // 获取用户
      fetchProject(){
        let params = {page: this.page, page_size: this.pageSize};
        this.$http.get(this.$config.project.url, {params: params})
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

      // 获取用户数
      getProjectCount(){
        this.$http.get(this.$config.project.count.url)
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

      // 点击打开
      formatDate(row){
        return this.moment(new Date(row.date), 'YYYYMMDDHHmmss').fromNow();
      },

      // 转向
      patchProject(isPass, _id) {
        this.$http.patch(this.$config.project.url + "?_id=" + _id, {isPass: isPass})
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success) {
              this.fetchProject();
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(
            err => this.$message.error(err.response.data.message)
          );
      },

      // 处理当前页
      handleCurrentChange(page){
        this.page = Number(page);
        this.fetchProject();
      },

      // 删除推荐
      deleteProject(index, _id) {
        let params = {_id: _id};
        this.$http.delete(this.$config.project.url, {params: params})
          .then(response => {
            if (response.status === 204) {
              let data = this.tableData[index];
              let new_ = {
                newType: 7,
                sender: Number(localStorage.getItem('userId')),
                receiver: data.user._id,
                content: data.git
              };
              this.$units.createSystemNews(new_);

              this.fetchProject();
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch(
            err => this.$message.error(err.response.data.message)
          );
      }
    }
  }

</script>
<style scoped>


</style>

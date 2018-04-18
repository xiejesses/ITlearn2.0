<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="createDateTime" label="创建日期" sortable width="180" :formatter="formatDate">
      </el-table-column>
      <el-table-column prop="user.nickname" label="创建者" width="180" @cell-click="window.open('https://www.baidu.com')">
      </el-table-column>
      <el-table-column prop="name" label="小组名">
      </el-table-column>
      <el-table-column label="审核">
        <template slot-scope="scope">
          <el-tooltip :content="'Switch value: ' + scope.row.isPass" placement="top" >
            <el-switch
              v-model="scope.row.isPass "
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="patchGroup(scope.row.isPass, scope.row._id)">
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteGroup(scope.$index, scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'group',
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
      this.fetchGroup();
      this.getGroupCount();
    },
    methods: {
      // 获取用户
      fetchGroup() {
        let params = {page: this.page, page_size: this.pageSize};
        this.$http.get(this.$config.group.url, {params: params})
          .then(response => {
            let res = response.data;
            if (res.status === this.$status.success) {
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
      getGroupCount() {
        this.$http.get(this.$config.group.count.url)
          .then(response => {
            let res = response.data;
            if (res.status === this.$status.success) {
              this.count = res.count;
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
        this.fetchGroup();
      },

      // 点击打开
      formatDate(row){
        return this.moment(new Date(row.createDateTime), 'YYYYMMDDHHmmss').fromNow();
      },

      //
      patchGroup(isPass, _id) {
        this.$http.patch(this.$config.group.url + "?_id=" + _id, {isPass: isPass})
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success) {
              this.fetchGroup();
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(
            err => this.$message.error(err.response.data.message)
          );
      },

      deleteGroup(index, _id) {
        let params = {_id: _id};
        this.$http.delete(this.$config.group.url, {params: params})
          .then(response => {
            if (response.status === 204) {
              this.fetchGroup();
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

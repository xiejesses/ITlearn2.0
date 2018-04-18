<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="createDateTime" label="创建日期" sortable width="180" :formatter="formatDate">
      </el-table-column>
      <el-table-column prop="user.nickname" label="创建者" width="180">
      </el-table-column>
      <el-table-column prop="title" label="话题" >
      </el-table-column>
      <el-table-column label="审核">
        <template slot-scope="scope">
          <el-tooltip :content="'Switch value: ' + scope.row.isPass" placement="top" >
            <el-switch
              v-model="scope.row.isPass "
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="patchTopic(scope.row.isPass, scope.row._id)">
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteTopic(scope.$index, scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'topic',
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
      this.fetchTopic();
      this.getTopicCount();
    },
    methods: {
      // 获取用户
      fetchTopic(){
        let params = {page: this.page, page_size: this.pageSize};
        this.$http.get(this.$config.topic.url, {params: params})
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
      getTopicCount(){
        this.$http.get(this.$config.topic.count.url)
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
        return this.moment(new Date(row.createDateTime), 'YYYYMMDDHHmmss').fromNow();
      },

      // 转向
      turnToTopic(row) {
        window.open(this.$turnUrl + "user/" + row._id);
      },

      // 处理当前页
      handleCurrentChange(page){
        this.page = Number(page);
        this.fetchTopic();
      },

      // 转向
      patchTopic(isPass, _id) {
        this.$http.patch(this.$config.topic.url + "?_id=" + _id, {isPass: isPass})
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success) {
              this.fetchTopic();
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(
            err => this.$message.error(err.response.data.message)
          );
      },

      deleteTopic(index, _id) {
        let params = {_id: _id};
        this.$http.delete(this.$config.topic.url, {params: params})
          .then(response => {
            if (response.status === 204) {
              this.fetchTopic();
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

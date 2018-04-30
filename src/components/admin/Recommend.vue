<template>
  <div>
    <el-form :inline="true" :model="search" class="demo-form-inline">

      <el-form-item label="属性">
        <el-select v-model="search.meta" placeholder="属性">
          <el-option label="_id" value="_id"></el-option>
          <el-option label="content" value="content"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="输入搜索内容">
        <el-input v-model="search.content" placeholder="输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%">

      <el-table-column prop="createDateTime" label="发表日期" sortable width="100" :formatter="formatDate">
      </el-table-column>

      <el-table-column prop="user.nickname" label="用户名" width="180">
      </el-table-column>

      <el-table-column prop="title" label="标题"></el-table-column>

      <el-table-column prop="tag" label="标签" width="240" >
        <template slot-scope="scope">
          <el-tag v-for="tag in scope.row.tags" :key="tag._id" :type="'success'" close-transition style="margin-right: 4px">{{tag.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核">
        <template slot-scope="scope">
          <el-tooltip :content="'Switch value: ' + scope.row.isPass" placement="top">
            <el-switch
              v-model="scope.row.isPass "
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="patchRecommend(scope.row.isPass, scope.row._id)">
            </el-switch>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteRecommend(scope.$index, scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :total="count" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'recommend',
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
      this.fetchRecommend();
      this.getRecommendCount();
    },
    methods: {
      // 获取用户
      fetchRecommend(){
        let params = {page: this.page, page_size: this.pageSize};
        this.$http.get(this.$config.recommend.url, {params: params})
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
      getRecommendCount(){
        this.$http.get(this.$config.recommend.count.url)
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
      patchRecommend(isPass, _id) {
        this.$http.patch(this.$config.recommend.url + "?_id=" + _id, {isPass: isPass})
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success) {
              this.fetchRecommend();
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
        console.log('submit!');
      },

      // 处理当前页
      handleCurrentChange(page){
        this.page = Number(page);
        this.fetchRecommend();
      },

      // 删除推荐
      deleteRecommend(index, _id) {
        let params = {_id: _id};
        this.$http.delete(this.$config.recommend.url, {params: params})
          .then(response => {
            if (response.status === 204) {
              this.$message.success("删除成功");
              let data = this.tableData[index];
              let new_ = {
                newType: 6,
                sender: Number(localStorage.getItem('userId')),
                receiver: data.user._id,
                content: data.title
              };
              this.$units.createSystemNews(new_);
              this.fetchRecommend();
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

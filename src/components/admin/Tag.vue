<template>
  <div class="tag">
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item label="属性">
        <el-select v-model="search.meta" placeholder="属性">
          <el-option label="id" value="_id"></el-option>
          <el-option label="标签名" value="name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="输入搜索内容">
        <el-input v-model="search.content" placeholder="输入搜索内容" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

      <el-input v-model="inputTag" placeholder="请输入标签名" style="width:180px"></el-input>
      <span class="cxy-but" @click="addTag" style="cursor:pointer;">添加标签</span>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="_id" label="编号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="标签名" width="180">
      </el-table-column>
      <el-table-column prop="color" label="颜色" width="180">
        <!-- <el-color-picker v-model="color"></el-color-picker> -->
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="dialogVisible = true;modifyTag = scope.row.name;modifyTagId = scope.row._id">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteTag(scope.$index, scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next" :current-page="currentPage" :total="count" @current-change="handleCurrentChange">
    </el-pagination>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <el-input v-model="modifyTag" placeholder="请输入标签名" style="width:180px"></el-input>
        <p>
         选取背景：
        </p>
        <p> <el-color-picker v-model="colorbg"></el-color-picker></p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false;patchTag()">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'tag',
    data() {
      return {
        page: 1,
        pageSize: 10,
        tableData: [],
        pageSum: 1,
        count: 0,
        inputTag: "",
        currentPage: 1,
        modifyTagId: -1,
        modifyTag: "",
        dialogVisible: false,
        colorbg:null,
        search: {
          meta: '_id',
          content: ''
        }
      }
    },
    mounted() {
      this.fetchTag();
      this.getTagCount();
    },
    methods: {
      // 获取用户
      fetchTag(){
        let params = {page: this.page, page_size: this.pageSize};
        this.$http.get(this.$config.tag.url, {params: params})
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
      getTagCount(){
        this.$http.get(this.$config.tag.count.url)
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

      // 处理当前页
      handleCurrentChange(page){
        this.page = Number(page);
        this.fetchTag();
      },

      // 添加标签
      addTag() {
        this.$http.post(this.$config.tag.url, {name: this.inputTag})
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success) {
              this.$message.success("创建成功");

              this.currentPage = 1;
              this.page = 1;
              this.fetchTag();
              this.inputTag = "";
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(
            err => this.$message.error(err.response.data.message)
          );
      },

      deleteTag(index, _id) {
        let params = {_id: _id};
        this.$http.delete(this.$config.tag.url, {params: params})
          .then(response => {
            if (response.status === 204) {
              this.fetchTag();
              this.$message.success("删除成功");
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch(
            err => this.$message.error(err.response.data.message)
          );
      },

      // 修改标签
      patchTag() {
        this.$http.patch(this.$config.tag.url + "?_id=" + this.modifyTagId, {name: this.modifyTag,color: this.colorbg})
          .then(response => {
            let res = response.data;
            if(res.status === this.$status.success) {
              this.$message.success("创建成功");
              this.fetchTag();
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

        this.$http.get(this.$config.tag.url, {params: {$: JSON.stringify(params)}})
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
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cxy-but {
    padding: 5px 10px;
    color: white;
    background-color: #2eb279;
}

</style>

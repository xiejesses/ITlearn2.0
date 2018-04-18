<template>
  <div id="app">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" >
        <!-- <i class="el-icon-document"></i>首页 -->
        <el-menu :default-openeds="['0']">
            <router-link to="/"  exact=true>
          <el-menu-item index="0">
              <i class="el-icon-location"></i><span>首页</span>
          </el-menu-item>
            </router-link>
            <router-link to="/user">
          <el-menu-item index="1">
              <i class="el-icon-document"></i><span>用户管理</span>
          </el-menu-item>
            </router-link>
            <router-link to="/recommend">
          <el-menu-item index="2">
            <i class="el-icon-share"></i>推荐管理
          </el-menu-item>
          </router-link>
          <router-link to="/tag">
          <el-menu-item index="3">
            <i class="el-icon-star-on"></i>标签管理
          </el-menu-item>
          </router-link>
          <router-link to="/group">
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>小组管理
          </el-menu-item>
          </router-link>
          <router-link to="/topic">
          <el-menu-item index="5">
            <i class="el-icon-news"></i>话题管理
          </el-menu-item>
          </router-link>
          <router-link to="/comments">
          <el-menu-item index="6">
            <i class="el-icon-tickets"></i>评论管理
          </el-menu-item>
          </router-link>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"><span> 管理员</span></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的首页</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          
        </el-header>

        <el-main>
          <!-- <el-table :data="tableData" style="background-color:#2eb279">
            <el-table-column style="" prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table> -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  /* color: #2eb279; */
}
a span {
  color:#333;
}
.el-header {
    background-color: #2eb279;
    /* background-color: #B3C0D1; */
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    /* color: red; */
    /* color: #333; */
  }
  .el-table thead {
    color:#50b37a;
  }
</style>

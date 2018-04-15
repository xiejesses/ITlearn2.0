<template>
  <div class="share">


    <el-container>
      <el-main>
        <el-card>
          <h1 class="cxy-h1">来自星星星的你</h1>
          <div class="cxy-meta"> 几日前 </div>
          <div class="content"></div>
        </el-card>
      </el-main>
      <el-aside style="padding: 20px;">
        <el-card>
          <section class="user-avatar">
            <v-gravatar v-bind:email="email" size='40' :alt="喵喵喵" />
            <span class="cxy-nickname">好吃的汉堡</span>
          </section>

          <div class="bottom clearfix">
          </div>
          <time class="time"></time>
          <el-button type="text" class="button">操作按钮</el-button>
        </el-card>
      </el-aside>
    </el-container>

    <comment></comment>
  </div>
</template>
<script>
  export default {
    name: 'ArticleDetail',
    data() {
      return {
        email: "123@qq.com",
        nickname: "123@qq.com"
      };
    },
    mounted() {
    },

    methods: {

    }
  }

</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
  .cxy-nickname{
    margin-left:5px;
  }
  .user-avatar{
    float: left;
  }

  .clearfix{
    clear: both
  }

</style>

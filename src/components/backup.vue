<template>



<el-container>
      <el-main>
        <el-card>
          <!--标题-->
          <h1 class="cxy-h1">{{detail.title}}</h1>

          <!--desc-->
          <div>{{detail.desc}}</div>

          <!--内容-->
          <div v-if="!detail.url || detail.url === ''" v-html="detail.content" class="markdown-body"></div>

          <!--链接按钮-->
          <el-button v-if="detail.url && detail.url !== ''" type="primary" @click="openUrl">查看链接</el-button>
        </el-card>
      </el-main>
      <el-aside style="padding: 20px;">
        <el-card>
          <section class="user-avatar">
            <!--头像-->
            <v-gravatar v-bind:email="detail.user.email" :size='40' :alt="detail.user.nickname"/>
            <!--昵称-->
            <span class="cxy-nickname">{{detail.user.nickname}}</span>
          </section>
          <!--时间-->
          <abbr class="timeago" :title="new Date(detail.createDateTime)">
            {{ moment(new Date(detail.createDateTime), "YYYYMMDDHHmmss").fromNow() }}
          </abbr>
        </el-card>
      </el-aside>
    </el-container>
    </template>
    <script>
    export default {
      
      // this.$validator.validateAll().then((result) => {
      //     if (result) {
            
      //     } else {
      //         this.$message.error(`请填写完整信息！`);
      //         return false;
      //     }
      //   });

    }
    </script>
    

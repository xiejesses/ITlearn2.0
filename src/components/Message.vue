<template>
  <div>
    <div v-for="message in messages" :key="message.id" class="systemNotice">
      <div class="user-avatar">
        <v-gravatar :email="message.sender.email" :size='40' />
      </div>

      <!--个人消息-->
      <div v-if="type === 0" class="meta" style="margin-left:15px">
        <el-tag v-if="!message.isSee" size="mini" type="danger"> New </el-tag>
        <router-link class="username" :to="{ name: 'user_article', params: { userId: message.sender.user_id }}">
          {{message.sender.nickname}}
        </router-link>
        <div v-if="message.newType === 0">点赞了</div>
        <div v-if="message.newType === 1">收藏了</div>
        <div v-if="message.newType === 2">回复了</div>

        <article class="message-body">
          <div class="message-content">
            <router-link :to="{ name: 'share_detail', params: { shareId: message.recommend._id }}">
              {{ message.recommend.title }}
            </router-link>
          </div>
          <div class="time">
            <abbr class="timeago" :title="new Date(message.date)"> {{ moment(new Date(message.date), "YYYYMMDDHHmmss").fromNow() }}</abbr>
          </div>
        </article>

      </div>

      <!--动态-->
      <div v-if="type === 1" class="meta" style="margin-left:15px">
        <el-tag v-if="!message.isSee" size="mini" type="danger"> New </el-tag>
        <router-link class="username" :to="{ name: 'user_article', params: { userId: message.sender.user_id }}">
          {{message.sender.nickname}}
        </router-link>
        <div v-if="message.newType === 5">发表了</div>
        <article class="message-body">
          <div class="message-content">
            <router-link v-if="'recommend' in message" :to="{name: 'share_detail', params: {shareId: message.recommend._id}}">
              <span v-if="message.recommend">{{ message.recommend.title }}</span>
              <span v-else-if="message.recommend"> 推荐已被删除 </span>
            </router-link>
            <router-link v-else-if="'topic' in message" :to="{name: 'topicdetail', params: {t_id: message.topic._id}}">
              <span v-if="message.topic">{{ message.topic.title }}</span>
              <span v-else-if="message.topic"> 话题已被删除 </span>
            </router-link>
            <router-link v-else-if="'project' in message" :to="{ name: 'project_detail', params: { projectId: message.project._id }}">
              <span v-if="message.project">{{ message.project.name }}</span>
              <span v-else-if="message.project"> 项目已被删除 </span>
            </router-link>
          </div>
          <div class="time">
            <abbr class="timeago" :title="new Date(message.date)"> {{ moment(new Date(message.date), "YYYYMMDDHHmmss").fromNow() }}</abbr>
          </div>
        </article>
      </div>

      <!--系统消息-->
      <div v-if="type === 2" class="meta" style="margin-left:15px">
        <el-tag v-if="!message.isSee" size="mini" type="danger"> New </el-tag>
        <router-link class="username" :to="{ name: 'user_article', params: { userId: message.sender.user_id }}">
          {{message.sender.nickname}}
        </router-link>
        <article class="message-body">
          <div class="message-content">
            <span v-if="message.newType === 4"> 审核 </span>
            <span v-else="message.newType !== 4"> 删除 </span>
            你的
            <span v-if="message.newType === 6"> 文章 </span>
            <span v-if="message.newType === 7"> 项目 </span>
            <span v-if="message.newType === 8"> 小组 </span>
            <span v-if="message.newType === 9"> 评论 </span>
            <span v-if="message.newType === 10"> 话题 </span>

            <span v-else-if="message.newType === 4 && 'recommend' in message"> 文章</span>
            <span v-else-if="message.newType === 4 && 'topic' in message"> 话题 </span>
            <span v-else-if="message.newType === 4 && 'group' in message"> 小组</span>
            <span v-else-if="message.newType === 4 && 'project' in message"> 项目</span>

            <span>{{ message.content }}</span>
            <router-link v-if="'recommend' in message && message.newType === 4"
                         :to="{ name: 'share_detail', params: { shareId: message.recommend._id }}">
              <span v-if="message.recommend">{{ message.recommend.title }}</span>
              <span v-else > 推荐已被删除 </span>
            </router-link>

            <router-link v-else-if="'topic' in message && message.newType === 4 && message.topic"
                         :to="{ name: 'topicdetail', params: { t_id: message.topic._id }}">
              <span v-if="message.recommend">{{ message.topic.title }}</span>
              <span v-else> 话题已被删除 </span>
            </router-link>

            <router-link v-else-if="'project' in message && message.newType === 4 && message.project"
                         :to="{ name: 'project_detail', params: { projectId: message.project._id }}">
              <span v-if="message.project">{{ message.project.name }}</span>
              <span v-else> 项目已被删除 </span>
            </router-link>

            <router-link v-else-if="'group' in message && message.newType === 4 && message.group"
                         :to="{ name: 'group_detail', params: { g_id: message.group._id }}">
              <span v-if="message.group">{{ message.group.name }}</span>
              <span v-else> 小组已被删除 </span>
            </router-link>

            <span v-if="'isPass' in message && message.isPass">通过</span>
            <span v-else-if="'isPass' in message && !message.isPass">不通过</span>
          </div>
          <div class="time">
            <abbr class="timeago" :title="new Date(message.date)"> {{ moment(new Date(message.date), "YYYYMMDDHHmmss").fromNow() }}</abbr>
          </div>
        </article>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    name: 'message',
    data() {
      return {
        type: 0,
        page: 1,
        pageSize: 10,
        messages: []
//        {
//        email: '234@qq.com',
//        nickname: 'jesses',
//        user_id: '1',
//        article_id: '22',
//        title: '这是一个test',
//        createDateTime: '2018-4-21',
//      },
//        {
//          email: '234@qq.com',
//          nickname: 'jesses',
//          user_id: '1',
//          article_id: '21',
//          title: 'Vue 从入门到放弃',
//          createDateTime: '2018-4-24',
//        },
      }
    },
    mounted() {
      this.fetchNews();
    },
    methods: {

      // 获取消息
      fetchNews() {
        let params = {
          page: this.page,
          page_size: this.page_size,
          receiver: Number(localStorage.getItem("userId"))
        };

        // 设置获取消息类型
        if (this.$route.name === "message") {
          this.type = 0;
          params.type = this.type;
        } else if (this.$route.name === "users_message") {
          this.type = 1;
          params.type = this.type;
        } else if (this.$route.name === "system_message") {
          this.type = 2;
          params.type = this.type;
        }

        this.$http.get(this.$config.new.url, {params: params})
          .then(response => {
            let data = response.data;
            if (data.status === this.$status.success) {
              this.messages = this.messages.concat(data.data);
              this.updateIsSee();
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

      // 更新isSee
      updateIsSee() {
        let data = {isSee: true};
        let query = "?type=" + this.type + "&receiver=" + localStorage.getItem("userId");
        this.$http.patch(this.$config.new.url + query, data)
          .then(response => {
            let data = response.data;
            if (data.status === this.$status.success) {

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
      }
    }
  }

</script>
<style scoped>
  .systemNotice {
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #f3f3f3;
    margin-top: 10px;
  }

  .systemNotice img {
    border-radius: 50%;

  }

  article {
    font-size: 15px;
    color: #2D2D2F;
    line-height: 23px;
    margin-top: 5px;
  }

  .meta {
    width: 50vw;
  }

  .meta a {
    text-decoration: none;
  }

  .username {
    cursor: pointer;
    color: gray;
  }

  .message-content a {
    color: #54595f;
    font-size: 18px;
  }

  .time {
    margin-top: 20px;
    color: #C7C7C7;
  }

</style>

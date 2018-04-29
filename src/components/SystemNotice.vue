<template>
  <div>
    <div v-for="notice in systemNotices" :key="notice.id" class="systemNotice">
      <div class="user-avatar">
        <v-gravatar :email="notice.manager.email" :size='40' />
      </div>
      <div class="meta" style="margin-left:15px">
        <span>{{notice.manager.nickname}}</span>
        <article class="message-body">
          <div class="username">
            {{notice.currentUser}} 您好，
          </div>
          <div v-if="notice.messageContent" class="message-content">
            您提交的
            <span style="color:blue">{{notice.messageContent}}</span> 存在不合规的地方，请您检查重新提交，感谢您的理解与支持。
          </div>
          <div v-else class="message-content">
            {{notice.ITlearn}}
          </div>
          <div class="time">
            <abbr class="timeago" :title="new Date(notice.createDateTime)"> {{ moment(new Date(notice.createDateTime), "YYYYMMDDHHmmss").fromNow() }}</abbr>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'systemNotice',
    data() {
      return {

        systemNotices: [{
            currentUser: 'jesses',
            manager: {
              email: '1234@qq.com',
              nickname: 'ITlearn'
            },
            ITlearn: 'ITlearn 是一个专门为程序员开发的，集分享链接或文章、创建或加入小组和项目交流的社区；既来之，则安之，期待您在社区里的进步。',
            createDateTime: '2018-4-21',
          },
          {
            currentUser: 'jesses',
            manager: {
              email: '1234@qq.com',
              nickname: 'ITlearn'
            },
            messageContent: 'Vue 从入门到放弃',
            createDateTime: '2018-4-24',
          },

        ]
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

  .username {
    margin-bottom: 20px;
  }

  .time {
    margin-top: 20px;
    color: #C7C7C7;
  }

</style>

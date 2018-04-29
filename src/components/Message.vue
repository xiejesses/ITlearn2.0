<template>
  <div>
    <div v-for="message in messages" :key="message.id" class="systemNotice">
      <div class="user-avatar">
        <v-gravatar :email="message.email" :size='40' />
      </div>
      <div class="meta" style="margin-left:15px">
        <router-link class="username" :to="{ name: 'user_article', params: { userId: message.user_id }}">{{message.nickname}}</router-link> 分享了
        <article class="message-body">
          <div class="message-content">
            <router-link :to="{ name: 'share_detail', params: { shareId: message.article_id }}">{{message.title}}</router-link>
          </div>
          <div class="time">
            <abbr class="timeago" :title="new Date(message.createDateTime)"> {{ moment(new Date(message.createDateTime), "YYYYMMDDHHmmss").fromNow() }}</abbr>
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

        messages: [{
            email: '234@qq.com',
            nickname: 'jesses',
            user_id: '1',
            article_id: '22',
            title: '这是一个test',
            createDateTime: '2018-4-21',
          },
          {
            email: '234@qq.com',
            nickname: 'jesses',
            user_id: '1',
            article_id: '21',
            title: 'Vue 从入门到放弃',
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

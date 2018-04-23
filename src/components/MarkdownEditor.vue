<template>
  <div id="editor">
    <main>
      <form name="markdownform" :v-model="formMarkdown" action="#" method="post">
        <div class="title-input">
          <p>
            <input type="text" v-model="formMarkdown.topicTitle" name="shareTitle" class="input" placeholder="请输入标题"
                   value="">
          </p>
        </div>
        <div class="mavon-editor">
          <mavon-editor v-model="formMarkdown.topicContent" v-on:save="getContent" v-on:change="getContent"
                        style="height: 100%" placeholder="markdown editor" v-bind:toolbars="Toolbars"></mavon-editor>
        </div>

        <div class="actions">
          <div class="buttons">
            <p class="submit">
              <a href="javascript:;" class="user-submit" @click="cretetopic">发布</a>
              <a href="javascript:;" class="cancel" @click="cancel">取消</a>
            </p>
          </div>
        </div>
      </form>
    </main>

  </div>
</template>
<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import 'mavon-editor/src/lib/font/css/fontello.css'
  import '../../static/css/markdown.css'
  // import 'katex/dist/katex.min.css'
  export default {
    name: 'markdowneditor',
    components: {
      mavonEditor
    },
    data() {
      return {
        Name:'test',
        gid:'',
        isjoin:'',
        formMarkdown:{
          topicTitle:'',
          topicContent:'',
        },
        value:'',
        isclick:false,
        Toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          // strikethrough: true, // 中划线
          // mark: true, // 标记
          // superscript: true, // 上角标
          // subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
      }
    },
    beforeRouteEnter (to, from, next) {

      if(to.query.isjoin >= 0) {
        next()
      } else {
        console.log(to.query.isjoin);
        console.log(from);
        from.$message.success('请先加入');
        next(false)
      }
    },
    methods: {
      getContent(val, render) {
        this.formMarkdown.topicContent = render;
      },
      cretetopic() {
        this.$http.post(this.$config.topic.url,{
          group: this.gid,
          title: this.formMarkdown.topicTitle,
          content: this.formMarkdown.topicContent,
          user: localStorage.getItem('userId')
        }).then(response => {
          let res = response.data;
          if(res.status === this.$status.success) {
            //成功返回上一级
            window.history.go(-1);
            this.$message.success('发表成功');
          }else {
            this.$message.error('发生错误，请重试！');
          }
        }).catch(err => {
          this.$message.error(err.response.data.message);
          // todo state权限显示message
        });
      },
      cancel() {
        this.formMarkdown.topicContent = '';
        this.formMarkdown.topicTitle = '';
      }
    },
    mounted() {
     this.gid = this.$route.query.g_id;
      this.isjoin = this.$route.query.isjoin;
      console.log(this.$route.query.g_id);
      console.log(this.$route.query.isjoin);
    }
  }

</script>
<style scoped>
  a {
    text-decoration: none;
  }

  main {
    width: 100%;
    margin: 5px auto;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .cancel {
    color:gray;
    font-size: 15px;
    margin-left: 5px;
    text-decoration: underline;
    cursor: pointer;
  }

  input[type="text"] {
    display: block;
    height: 40px;
    width: 100%;
    padding: 0;
    margin-top: 20px;
    border: 1px solid #d8dce5;
    box-shadow: 0 0px 4px 0px #cac4c4;
    outline: none;
    box-sizing: border-box;
    -webkit-appearance: none;
    font-size: 16px;
    text-indent: 15px;
    font-weight: 400;
    vertical-align: bottom;
    position: relative;
  }
  .user-submit {
    display: inline-block;
    background: #f28964;
    height: 36px;
    min-width: 80px;
    padding: 0 10px 2px 10px;
    border: none;
    border-radius: 2px;
    outline: none;
    font-size: 17px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    -webkit-appearance: none;
    margin-top: 10px;
    vertical-align: bottom;
    cursor: pointer;
  }


</style>

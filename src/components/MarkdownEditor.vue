<template>
  <div id="editor">
    <main>
      <form name="markdownform" :v-model="formMarkdown"  action="#" method="post">
        <div class="title-input">
          <p>
            <input type="text" v-model="formMarkdown.topicTitle" name="shareTitle" class="input" placeholder="请输入标题" value="">
          </p>
        </div>
        <div class="mavon-editor">
          <!-- <mavon-editor v-on:save="getContent" v-model="formMarkdown.topicContent"  style="height: 100%" placeholder="markdown editor"  v-bind:toolbars="Toolbars"></mavon-editor> -->
          <mavon-editor v-on:save="getContent" v-on:change="getContent" style="height: 100%" placeholder="markdown editor"  v-bind:toolbars="Toolbars"></mavon-editor>
        </div>

        <div class="actions">
          <div class="buttons">
            <p class="submit">
              <a href="javascript:;" @click="cretetopic">发布</a>
              <!-- <input type="submit" name="user-submit" id="user-submit" value="发布"  > -->
              <!-- <router-link :to="{ name:'topicdetail', params:{tName:value}}" class="article-link">发布</router-link> -->
            </p>
            <!-- <p class="cancel">取消</p> -->
            <a href="javascript:;">取消</a>
          </div>
        </div>
      </form>
      <!-- 测试 -->
      <div v-html="formMarkdown.topicContent" class="markdown-body">

      </div>
      <div>
          {{formMarkdown.topicContent}}
      </div>
      <!-- 测试-end -->

    </main>

  </div>
</template>
<script>
  // Local Registration
  import {
    mavonEditor
  } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import 'mavon-editor/src/lib/font/css/fontello.css'
  import '../../static/css/markdown.css'
  // import 'katex/dist/katex.min.css'
  export default {
    name: 'markdowneditor',
    components: {
      mavonEditor
      // or 'mavon-editor': mavonEditor
    },
    data: {

    },

    data() {
      return {
        Name:'test',
        gid:'',
        formMarkdown:{
          topicTitle:'',
          topicContent:'',
        },
        value:'',
        isclick:false,
        // content:'',
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
    methods: {
      getContent(val, render) {
        this.formMarkdown.topicContent = render;
      },
      cretetopic() {
        // console.log(this.formMarkdown.topicTitle)
        // console.log(this.formMarkdown.topicContent)
        // console.log(this.gid)
        // this.getContent();
        this.$http.post('/topic/createtopic',{
          _id:this.gid,
          topicTitle:this.formMarkdown.topicTitle,
          topicContent:this.formMarkdown.topicContent,
          userName:localStorage.getItem('userName')
        }).then(response => {
          let res = response.data;
          if(res.status == "1") {
            // this.$router.push('/groupindex')
            //成功返回上一级
            window.history.go(-1)
            // this.$message.success(`创建成功！`);
            this.$message.success('发表成功');
            // console.log(res)
          }else {
            this.$message.error('发生错误，请重试！');
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
     this.gid = this.$route.params.g_id;
    }
  }

</script>
<style>
  /* #editor {
     display: flex;
    flex-direction: column;
    min-height: 100%;
  } */
  
  main {
    margin: 5px auto;
  }

  .mavon-editor {
      /* height: 500px; */
      /* height: 350px; */
      /* min-height: 400px; */
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  }
  input[type="text"] {
    display: block;
    /* color:#dbdee6; */
    height: 40px;
    width: 100%;
    padding: 0;
    margin-top: 20px;
    border: 1px solid #d8dce5;
    box-shadow: 0 0px 4px 0px #cac4c4;
    /* border-radius: 4px; */
    outline: none;
    box-sizing: border-box;
    -webkit-appearance: none;
    font-size: 16px;
    text-indent: 15px;
    font-weight: 400;
    vertical-align: bottom;
    position: relative;
  }
  input[type="submit"] {
    display: inline-block;
    background: #f28964;
    height: 36px;
    min-width: 100px;
    padding: 0 10px 2px 10px;
    border: none;
    border-radius: 2px;
    outline: none;
    font-size: 17px;
    line-height: 33px;
    color: #fff;
    -webkit-appearance: none;
    margin-top: 10px;
    vertical-align: bottom;
    cursor: pointer;
  }


  @media screen and (min-width:960px) {
    main {
      width: 720px;
      margin: 5px auto;
      height: auto;
    }
  }

  @media screen and (min-width:1200px) {
    main {
      width: 800px;
      margin: 5px auto;
    }
  }

</style>

<template>
  <div id="editor">
    <main>
      <div class="title-input">
        <p>
          <input type="text" name="shareTitle" class="input" placeholder="请输入标题" value="">
        </p>
      </div>
      <div class="mavon-editor">
        <mavon-editor v-on:save="getContent" v-bind:code_style="code-github" style="height: 100%" placeholder="markdown editor"  v-bind:toolbars="Toolbars"></mavon-editor>
      </div>

      <div class="actions">
        <div class="buttons">
          <p class="submit">
            <input type="submit" name="user-submit" id="user-submit" value="发布"  >
          </p>
          <!-- <p class="cancel">取消</p> -->
        </div>
      </div>
      <!-- 测试 -->
      <div v-html="value" class="markdown-body">

      </div>
      <div>
          {{value}}
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
  import 'mavon-editor/src/lib/css/markdown.css'
  // import 'katex/dist/katex.min.css'
  export default {
    name: 'editor',
    components: {
      mavonEditor
      // or 'mavon-editor': mavonEditor
    },
    data: {

    },

    data() {
      return {
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
        this.value = render;
      }
    }
    // mounted() {
    //  content = this.$refs.editor.vShowContent;
    // }
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
      height: 350px;
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

<template>
  <div class="share">
    <div class="main">
      <section>
        <div class="share-form">
          <form name="shareform" :v-model="form" id="shareform" action="#" method="post">
            <h1>
              <span class="veiled">分享 github</span>
            </h1>
            <div>
              <p>
                <input type="text" v-validate="'required|url'" v-model="form.git" name="git" placeholder="输入项目 url" value="" required>
                <span v-show="errors.has('git')" style="font-size:15px">{{ errors.first('git') }}</span>
              </p>
            </div>
            <p>
              <el-select v-validate="'required'" v-model="form.state" placeholder="请选择">
                <el-option :key="0" :label="'正在开发ing...'" :value="0">
                </el-option>
                <el-option :key="1" :label="'招募成员'" :value="1">
                </el-option>
                <el-option :key="2" :label="'维护ing'" :value="2">
                </el-option>
              </el-select>
            </p>
            <p>
              <el-input type="textarea" :rows="3" placeholder="请输入简介" v-model="form.desc">
              </el-input>
            </p>
            <div class="buttons">
              <p class="submit">
                <el-button type="primary" @click="share">发布</el-button>
                <a href="javascript:;" class="cancel" @click="cancel">取消</a>
              </p>
            </div>
          </form>

        </div>
        <div class="tips">
          <h2>Tips:</h2>
          <h3>分享你的项目 </h3>

          <p>它应该与专业技术相关：开发、设计、产品、科技</p>
          <p>它应该有用、有趣、有社会价值</p>
          <p>它应该以技术的角度启发他人去了解和学习</p>

          <h3>不该分享什么 ?</h3>

          <p>不正确、不明确的分享内容</p>
          <p>不文明的讨论及人身攻击</p>
          <p>刻意夸张的标题党</p>

        </div>
      </section>

    </div>

  </div>
</template>

<script>
  import {
    mavonEditor
  } from 'mavon-editor';
  import 'mavon-editor/dist/css/index.css';
  import 'mavon-editor/src/lib/font/css/fontello.css';
  import '../../static/css/markdown.css';

  export default {
    components: {
      mavonEditor
    },
    name: 'share',
    data() {
      return {
        form: {
          name: '',
          git: '',
          state: '',
          user: localStorage.getItem("userId"),
          desc: ''
        },
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
        }
      }
    },
    mounted() {
    },
    methods: {
      getContent(val, render) {
        this.formShare.content = render;
        console.log(render);
      },

      // 创建分享
      share() {
        let data = this.form;
        // console.log(data);

        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$http.post(this.$config.project.url, data)
          .then(response => {
            let res = response.data;
            if (res.status === 0) {
              this.$message.success('添加成功');
            } else {
              this.$message.error(`${res.message}`);
              return false;
            }
          }).catch(
          err =>
            this.$message.err(err.response.data.message)
          // todo 状态码返回提示操作
        );
          } else {
              this.$message.error(`请检查或填写完整信息！`);
              return false;
          }
        });
      },

      cancel() {
        this.form.name = '';
        this.form.desc = '';
        this.form.git = '';
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    text-decoration: none;
  }

  h3 {
    color: #54595f;
  }

  p {
    font-size: 11px;
    color: #bfbfbf;
  }

  p:hover {
    color: black;
  }

  .main {
    margin: 40px 0 0 0;
  }

  @media screen and (min-width: 960px) {
    .main {
      width: 940px;
      margin: 0 auto;
    }
  }

  section {
    width: 80%;
    margin: 0 auto;
  }

  @media screen and (min-width: 500px) {
    section {
      width: 75%;
      margin: 0 auto;
    }
  }

  @media screen and (min-width: 768px) {
    section {
      width: 60%;
      margin: 0 auto;
    }
  }

  @media screen and (min-width: 960px) {
    section {
      width: 720px;
      margin: 0 auto;
      background: #ffffff;
      padding: 0 84px 40px 84px;
      border-radius: 2px;
      margin-top: 50px;
      box-sizing: border-box;
    }
  }

  .inline-input {
    margin-top: 10px;
  }

  .cancel {
    color: gray;
    font-size: 15px;
    margin-left: 5px;
    text-decoration: underline;
    cursor: pointer;
  }

  .tips {
    height: auto;
    margin-top: 20px;
  }

  input[type="text"] {
    display: block;
    height: 40px;
    width: 100%;
    padding: 0;
    margin-top: 20px;
    border: 1px solid #d8dce5;
    border-radius: 4px;
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

  /*标题*/

  h1 {
    cursor: pointer;
  }

  .veiled {
    color: #6a737d;
  }

</style>

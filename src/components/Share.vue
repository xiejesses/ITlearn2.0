<template>
  <div class="share">
    <div class="main">
      <section>
        <div class="share-form">
          <form name="shareform" :v-model="formShare" id="shareform" action="#" method="post">
            <h1>分享链接</h1>
            <h4 class="errMessage"></h4>
            <p>
              <input type="text" v-model="formShare.url" name="shareUrl"  placeholder="分享网址" value="">
            </p>
            <p>
              <input type="text" v-model="formShare.title" name="shareTitle"  placeholder="标题" value="">
            </p>
            <p>
              <el-select v-model="formShare.tags" multiple filterable="" allow-create="false" default-first-option placeholder="请选择标签">
                <el-option  v-for="item in options" :key="item.name" :label="item.name" :value="item._id">
                </el-option>
              </el-select>
            </p>
            <div class="actions">
              <div class="buttons">
                <p class="submit">
                  <a class="user-submit" href="javascript:;" @click="share">发布</a>
                  <a href="javascript:;" class="cancel" @click="cancel">取消</a>
                </p>
              </div>
            </div>
          </form>

        </div>
        <div class="tips">
          <h2>Tips:</h2>
          <h3>什么值得分享 ?</h3>

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
  export default {
    name: 'share',
    data() {
      return {
        formShare:{
          url:'',
          title:'',
          tags:[]
        },
        options: [],
      }
    },
    mounted() {
       this.fetchTags();

    },
    methods: {
      share() {
        this.$http.post(this.$config.recommend.url, {
          url: this.formShare.url,
          title: this.formShare.title,
          tags: this.formShare.tags,
          user: localStorage.getItem('userId')
        }).then(response => {
          let res = response.data;
          if (res.status === 0) {
            this.$message.success('添加成功');
          } else {
            this.$message.error(`${res.message}`);
            return false;
          }
        }).catch(
          err =>
            this.$message.err(err.message)
          // todo 状态码返回提示操作
        );
      },
      fetchTags() {
        this.$http.get(this.$config.recommend.tag.url).then(response => {
          let res = response.data;
          if (res.status === this.$status.success) {
            this.options = res.data;
            console.log(this.options)
          } else {
            console.log("获取标签失败");
            return false;
          }
        }).catch(err =>
          this.$message.error(err.response.data.message)
        );

      },

      cancel() {
        this.formShare.url = '';
        this.formShare.title = '';
        this.formShare.tags = '';
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

  @media screen and (min-width:960px) {
    .main {
      width: 940px;
      margin: 0 auto;
    }
  }

  section {
    width: 80%;
    margin: 0 auto;
  }

  @media screen and (min-width:500px) {
    section {
      width: 75%;
      margin: 0 auto;
    }
  }

  @media screen and (min-width:768px) {
    section {
      width: 60%;
      margin: 0 auto;
    }
  }

  @media screen and (min-width:960px) {
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
    color:gray;
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

</style>

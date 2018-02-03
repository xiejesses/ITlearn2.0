<template>
  <div class="share">
    <div class="main">
      <section>
        <div class="share-form">
          <form name="shareform" :v-model="formShare" id="shareform" action="#" method="post">
            <h1>分享链接</h1>
            <h4 class="errMessage"></h4>
            <p>
              <input type="text" v-model="formShare.url" name="shareUrl" class="input" placeholder="分享网址" value="">
            </p>
            <p>
              <input type="text" v-model="formShare.title" name="shareTitle" class="input" placeholder="标题" value="">
            </p>
            
            <el-select v-model="formShare.tags" multiple filterable="" allow-create="false" default-first-option placeholder="请选择文章标签">
              <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <div class="actions">
              <div class="buttons">
                <p class="submit">
                  <a href="javascript:;" @click="share">发布</a>
                  <!-- <input type="submit" name="user-submit" id="user-submit" value="发布"> -->
                </p>
                <!-- <p class="cancel">取消</p> -->
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
        // let formData = {
        //   url: this.formShare.url,
        //   title: this.formShare.title,
        //   tags: this.formShare.tags
        // };
        this.$http.post('/sharelink/submit',{
          url: this.formShare.url,
          title: this.formShare.title,
          tags: this.formShare.tags,
          userName:localStorage.getItem('userName')
        }).then(response => {
            let res = response.data;
            if (res.status == "1") {
              // this.userLogin(res);
              this.$message.success(`${res.message}`)
              //登录成功，跳转到首页
              //this.$router.push({name:'Home'})
              // this.$router.push('/')
            } else {
              this.$message.error(`${res.message}`);
              return false;
            }
        })
      },
      fetchTags() {
        this.$http.get('/tags').then(response => {
          let res = response.data;
          if(res.status == "1") {
            this.options = res.result[0].tags;
            // this.options.push(res.result[0].tags[0]);
            // this.options.concat(res.result[0].tags[0]);
          } else {
            // this.tags.push('没有相关标签')\
            // console.log("失败")
            return false
          }
        })
      }

    }
    
    

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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


    /* border: 1px solid green; */
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

    /* border: 1px solid red; */
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
      /* box-shadow:0px 0px 5px 0px #6b5858; */
    }
  }

  .inline-input {
    margin-top: 10px;
  }


  .tips {
    /* width: 300px; */
    height: auto;
    margin-top: 20px;


    /* border: 1px solid black; */
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

</style>

<template>
  <div class="share">
    <div class="main">
      <section>
        <div class="share-form">
          <form name="shareform" id="shareform" action="#" method="post">
            <h1>分享链接</h1>
            <h4 class="errMessage"></h4>
            <p>
              <input type="text" name="shareUrl" class="input" placeholder="分享网址" value="">
            </p>
            <p>
              <input type="text" name="shareTitle" class="input" placeholder="标题" value="">
            </p>
            <p>
              <el-autocomplete  class="inline-input" v-model="state1" :fetch-suggestions="querySearch" placeholder="请选择分类" @select="handleSelect"></el-autocomplete>
            </p>
            <div class="actions">
              <div class="buttons">
                <p class="submit">
                  <input type="submit" name="user-submit" id="user-submit" value="发布">
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
        msg: '分享链接'
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  color:#54595f;
}
p {
  font-size: 1.1rem;
  color:#bfbfbf;
}
p:hover {
  color:black;
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
    height:auto;
    margin-top: 20px;


    /* border: 1px solid black; */
  }




  input[type="text"] {
    display: block;
    /* color:#dbdee6; */
    height: 40px;
    width: 100%;
    padding: 0;
    margin-top: 20px;
    border: 1px solid #d8dce5;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    -webkit-appearance: none;
    font-size: 1.6rem;
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
    font-size: 1.7rem;
    line-height: 3.3rem;
    color: #fff;
    -webkit-appearance: none;
    margin-top: 10px;
    vertical-align: bottom;
    cursor: pointer;
  }


</style>

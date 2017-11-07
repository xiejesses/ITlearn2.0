<template>
  <div class="groupindex">
    <main>
      <section class="build-group">
        <p>发现和创建小组，共同学习与分享知识</p>
        <div class="build-form" v-if="isbuilding">
          <form name="buildform" id="buildform" action="#" method="post">
            <!-- <h1>分享链接</h1> -->
            <h4 class="errMessage"></h4>
            <p>
              <el-input  class="inputstyle" v-model="input" placeholder="小组名"></el-input>
            </p>
            <p>
              <el-input class="inputstyle" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="小组简介" v-model="textarea3">
              </el-input>
            </p>
           
            <div class="actions">
              <div class="buttons">
                <input type="submit" name="user-submit" id="user-submit" value="创建">
                <p class="cancel" @click="isbuilding = false">取消</p>
              </div>
            </div>
          </form>
        </div>
        <div class="build-button" v-else>
          <button @click="isbuilding = true">创建小组</button>
        </div>

        <!-- <div contenteditable>edit</div> -->
      </section>

      <section>
        
        <router-view></router-view>
      </section>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'groupindex',
    data() {
      return {
        isbuilding:false,
        msg: '学习小组'
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  main {
    margin: 5px auto;
    height: auto;
    /* border: 1px solid green; */
  }

  .build-group {
    /* background: #54595f; */
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    text-align: center;
  }

  .build-group p {
    font-size: 18px;
  }

  .build-button {
    margin-bottom: 10px;
    width: 100px;
    /* border: 1px solid red; */
  }

  .build-button button {
    background: #2DBF80;
    border: none;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 13px;
    color: #fff;
    max-height: 40px;
    max-width: 100px;
  }

  .build-button button:hover {
    background: #2DB270;
  }

input[type="submit"] {
    display: inline-block;
    background: #f28964;
    height: 35px;
    min-width: 100px;
    padding: 0 10px 0 10px;
    border: none;
    border-radius: 4px;
    outline: none;
    font-size: 17px;
    line-height: 33px;
    color: #fff;
    -webkit-appearance: none;
    margin-top: 10px;
    vertical-align: bottom;
    cursor: pointer;
  }

  .actions {
    display: flex;
    justify-content: flex-start;
  }
  .cancel {
    display: inline-block;
    margin: 5px 5px;
    cursor: pointer;
    color: #A0A0A0;
    text-align: center;
    border-bottom: 2px solid #a0a0a0;
  }

.inputstyle {
  width:250px;
}

 
  @media screen and (min-width:960px) {
    main {
      width: 720px;
      margin: 5px auto;
      height: auto;
    }
    .inputstyle {
    width:300px;
    }
  }

  @media screen and (min-width:1200px) {
    main {
      width: 940px;
      margin: 5px auto;
      height: auto;
    }
    .inputstyle {
  width:400px;
}
  }

</style>

<template>
  <div id="setNewPwd">
    <div class="setting-form">
      
      <!-- 设置新密码表单 -->
      <form name="resetform" :v-model="formSetting" id="resetform" action="#" method="post">
        <h2>
          设置新密码
        </h2>
        <p>
          <input type="text" v-model="formSetting.newPwd" name="newPwd" placeholder="请输入新密码" value="" required>
        </p>
        <p class="submit">
          <el-button type="primary" @click="submit">确定</el-button>
          <router-link to="/">返回首页</router-link>
        </p>
      </form>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'setNewPwd',
    data() {
      return {
        formSetting: {
          email:''
        },
      }
    },
    methods: {
      submit() {

      }
    }
  }

</script>

<style scoped>

  .setting-form {
    margin-bottom: 100px;
     display:flex;
    justify-content: center;
    align-content: center;
  }
  .setting-form a{
      color: gray;
    font-size: 15px;
    margin-left: 5px;
    text-decoration: underline;
    cursor: pointer;
  }

  input[type="text"] {
    display: block;
    height: 40px;
    width: 40vw;
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

</style>

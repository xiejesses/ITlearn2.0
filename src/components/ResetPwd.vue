<template>
  <div id="setting">
    <div class="setting-form">
      
      <!-- 重置密码表单 -->
      <form name="resetform" :v-model="formSetting" id="resetform" action="#" method="post">
        <h2>
          重置密码
        </h2>
        <p>
          <input type="text" v-validate="'required|email'" v-model="formSetting.email" name="email" placeholder="请输入邮箱" value="" required>
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </p>
        <p class="submit">
          <el-button type="primary" @click="resetPwd">发送邮件</el-button>
          <router-link to="/">返回首页</router-link>
        </p>
      </form>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'setting',
    data() {
      return {
        formSetting: {
          email:''
        },
      }
    },
    methods: {
      resetPwd() {

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

<template>
  <div id="changePwd">
    <div class="setting-form">
      <!-- 修改密码表单 -->
      <form name="changePwdForm" :v-model="formSetting" id="changePwdForm" action="#" method="post">
        <h2>
          修改密码
        </h2>
        <p>
          <input type="text" v-model="formSetting.oldPwd" name="oldPwd" placeholder="旧密码" value="" required>
        </p>
        <p>
          <input type="text" v-model="formSetting.newPwd" name="newPwd" placeholder="新密码" value="" required>
        </p>
        <p>
          <input type="text" v-model="formSetting.ensureNewPwd" name="ensureNewPwd" placeholder="确认新密码" value="" required>
        </p>
        <p class="submit">
          <el-button type="primary" @click="changePwd">保存修改</el-button>
          <router-link :to="{ name: 'resetPwd'}" style="float:right" class="ListItem">忘记密码？</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'changePwd',
    data() {
      return {
        formSetting: {
          oldPwd: '',
          newPwd: '',
          ensureNewPwd: '',
        },
      }
    },
    methods: {
      changePwd() {

      },
      
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

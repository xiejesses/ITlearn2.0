<template>
  <div id="setting">
    <div class="setting-form">
      <!-- 修改密码表单 -->
      <form v-if="isSettintgPwd" name="changePwdForm" :v-model="formSetting" id="changePwdForm" action="#" method="post">
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
          <a href="javascript:;" @click="isSettintgPwd=false">忘记密码？</a>
        </p>
      </form>
      <!-- 重置密码表单 -->
      <form v-else name="resetform" :v-model="formSetting" id="resetform" action="#" method="post">
        <h2>
          重置密码
        </h2>
        <p>
          <input type="text" v-validate="'required|email'" v-model="formSetting.email" name="email" placeholder="请输入邮箱" value="" required>
          <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </p>
        <p class="submit">
          <el-button type="primary" @click="resetPwd">发送邮件</el-button>
          <a href="javascript:;" @click="isSettintgPwd=true">返回</a>
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
          oldPwd: '',
          newPwd: '',
          ensureNewPwd: '',
          email:''
        },
        isSettintgPwd: true,
      }
    },
    methods: {
      changePwd() {

      },
      resetPwd() {

      }
    }
  }

</script>

<style scoped>
  /* .setting {
    display:flex;
    justify-content: center;
    align-content: center;
} */

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

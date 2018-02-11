<template>
  <div class="register">
    <div class="main">
      <section class="register-in">

        <section class="traditional-auth">

          <form name="registerform" :v-model="formRegister" id="registerform" action="#" method="post">
            <h2>注册</h2>
            <h4 class="errMessage"></h4>
            <p>
                 <input  v-model="formRegister.userName" name="userName" type="text" placeholder="用户名">
            </p>
            <!-- <p>
                 <input  v-model="formRegister.userEmail" name="userEmail" type="text" placeholder="邮箱">
            </p>
            <p>
                 <input  v-model="formRegister.userPwd" name="userPwd" type="text" placeholder="密码">
            </p> -->

            <!-- <p :class="{ 'control': true }">
              <input v-validate="'required|userName'" v-model="formLogin.userName" :class="{'input': true, 'is-danger': errors.has('userName') }"
                name="userName" type="text" placeholder="用户名">
              <span v-show="errors.has('userName')" class="help is-danger">{{ errors.first('userName') }}</span>
            </p> -->
            <p :class="{ 'control': true }">
              <input v-validate="'required|email'" v-model="formRegister.userEmail" :class="{'input': true, 'is-danger': errors.has('userEmail') }"
                name="userEmail" type="text" placeholder="邮箱">
              <span v-show="errors.has('userEmail')" :v-model="emailError = errors.has('userEmail')" class="help is-danger">{{ errors.first('userEmail') }}</span>
            </p>
            <p :class="{ 'control': true }">
              <input v-validate="'required|Pwd'" v-model="formRegister.userPwd" :class="{'input': true, 'is-danger': errors.has('userPwd') }"
                name="userPwd" type="password" placeholder="密码">
              <span v-show="errors.has('userPwd')" class="help is-danger">{{ errors.first('userPwd') }}</span>
            </p>
            
            <div class="actions">
              <div class="buttons">
                <p class="submit">
                  <a href="javascript:;" @click="register">注册</a>
                </p>
                <!-- <p class="cancel">取消</p> -->
              </div>
              <div class="toRegister">
                <h3 class="message">已有帐户？
                  <!-- <a href="javascript:void(0)" @click="isloginfrom=true">点击登录</a> -->
                  <!-- <router-link to="/login " class="">点击登录</router-link> -->
                  <router-link :to="{ name: 'login'}" >点击登录</router-link>
                </h3>
              </div>
            </div>
          </form>
        </section>
      </section>
    </div>

  </div>
</template>

<script>
  import {
    mapActions
  } from 'vuex'
  // import axios from 'axios'
  export default {
    name: 'register',
    data() {
      return {
        emailError: '',
        formRegister: {
          userName: '',
          userEmail: '',
          userPwd: ''
        }
      }
    },
    methods: {
      ...mapActions(['userLogin']),


      //关闭注册验证
      register() {
        let user = this.formRegister;
        let formData = {
          userName: user.userName,
          userEmail: user.userEmail,
          userPwd: user.userPwd
        };
        
        this.$validator.validateAll().then((result) => {
          if (result) { // eslint-disable-next-line
            this.$http.post('/users/register', {
            userName: formData.userName,
            userEmail: formData.userEmail,
            userPwd: formData.userPwd
          })
          .then(response => {
            let res = response.data;
            if (res.status == "1") {
              this.userLogin(res);
              this.$message.success(`${res.message}`)
              //登录成功，跳转到首页
              //this.$router.push({name:'Home'})
              this.$router.push('/')
            } else {
              this.$message.error(`${res.message}`);
              return false;
            }
          })
          .catch(err => {
            this.$message.error(`${err.message}`, 'ERROR!');
          })
          } else {
              this.$message.error(`邮箱或密码有误，请重新填写！`);
              return false;
          }
          
        });
      }
      //关闭注册验证

      //没有注册验证
      // register() {
      //   let user = this.formRegister;
      //   let formData = {
      //     userName: user.userName,
      //     userEmail: user.userEmail,
      //     userPwd: user.userPwd
      //   };
      //       this.$http.post('/users/register', {
      //       userName: formData.userName,
      //       userEmail: formData.userEmail,
      //       userPwd: formData.userPwd
      //     })
      //     .then(response => {
      //       let res = response.data;
      //       if (res.status == "1") {
      //         this.userLogin(res);
      //         this.$message.success(`${res.message}`)
      //         //登录成功，跳转到首页
      //         //this.$router.push({name:'Home'})
      //         this.$router.push('/')
      //       } else {
      //         this.$message.error(`${res.message}`);
      //         return false;
      //       }
      //     })
      //     .catch(err => {
      //       this.$message.error(`${err.message}`, 'ERROR!');
      //     })
      // }
      // //没有注册验证
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    /* background-color: #F8F8F8; */
    /* height: 800px; */
  }

  .register-in h2 {
    color: #676c72;
  }

  .toRegister h3 {
    color: #54595f;
  }

  .toRegister a {
    text-decoration: none;
    color: #2DBF80;
  }

  .toRegister a:hover {
    color: #f28964;
  }

  .main {
    margin: 40px 0 0 0;


    /* border: 1px solid green; */
  }

  @media screen and (min-width:960px) {
    .main {
      width: 720px;
      margin: 0 auto;
    }
    .register-in h2 {
      display: block;
      /* position: relative; */
      text-align: center;
      color: #676c72;
      font-size: 24px;
      padding: 20px 0 0 0;
      /* margin-top: 20px; */
    }
    input[type="submit"] {
      width: 100%;
    }
  }

  .register-in {
    width: 80%;
    margin: 0 auto;

    /* border: 1px solid red; */
  }

  @media screen and (min-width:500px) {
    .register-in {
      width: 75%;
      margin: 0 auto;
    }
  }

  @media screen and (min-width:768px) {
    .register-in {
      width: 60%;
      margin: 0 auto;
    }
  }

  @media screen and (min-width:960px) {
    .register-in {
      width: 376px;
      margin: 0 auto;
      background: #ffffff;
      padding: 0 82px 40px 82px;
      border-radius: 2px;
      margin-top: 50px;
      box-shadow: 0px 0px 5px 0px #6b5858;
    }
  }

  /**********
    登录表单
    **********/

  input[type="text"],
  input[type="password"] {
    display: block;
    height: 40px;
    width: 100%;
    padding: 0;
    margin-top: 20px;
    border: 2px solid #f3f3f3;
    border-radius: 2px;
    outline: none;
    box-sizing: border-box;
    -webkit-appearance: none;
    font-size: 16px;
    text-indent: 10px;
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

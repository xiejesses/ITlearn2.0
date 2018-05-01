<template>
  <div class="login">
    <div class="main">
      <section class="log-in">
        <section class="traditional-auth">
          <form name="loginform" :v-model="formLogin" id="loginform" action="#" method="post" v-if="isloginfrom">
            <h2 v-if="isAdmin">管理员登录</h2>
            <h2 v-else>登录</h2>
            <h4 class="errMessage"></h4>
            <p :class="{ 'control': true }">
              <input v-validate="'required|email'" v-model="formLogin.userEmail" :class="{'input': true, 'is-danger': errors.has('userEmail') }"
                name="userEmail" type="text" placeholder="Email">
              <span v-show="errors.has('userEmail')" class="help is-danger">{{ errors.first('userEmail') }}</span>
            </p>
            <!-- <p>
              <input type="text" v-model="formLogin.userEmail" name="userEmail" id="user_login" class="input" placeholder="Email" value=""
                autofocus>
            </p> -->
            <p :class="{ 'control': true }">
              <input v-validate="'required|Pwd'" v-model="formLogin.userPwd" :class="{'input': true, 'is-danger': errors.has('userPwd') }"
                name="userPwd" type="password" placeholder="Password">
              <span v-show="errors.has('userPwd')" class="help is-danger">{{ errors.first('userPwd') }}</span>
            </p>
            <div class="actions">
              <div class="buttons">
                <p class="submit">
                  <a href="javascript:;" class="user-login" @click="login">登录</a>
                </p>
                  <router-link v-if="!isAdmin" :to="{ name: 'resetPwd'}" style="float:right" class="ListItem">忘记密码？</router-link>
                <!-- <p class="cancel">取消</p> -->
              </div>
              <div class="toRegister" v-if="!isAdmin">
                <h3 class="message">还没有帐户？
                  <router-link :to="{ name: 'register'}" >点击注册</router-link>
                </h3>
              </div>
              <div class="backtoindex"><span><router-link to="/" :exact="true" class="ListItem">返回首页</router-link></span></div>
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
    name: 'login',
    data() {
      return {
        isloginfrom: true,
        isAdmin: this.$route.name === 'admin_login',
        emailError: '',
        formLogin: {
          userEmail: '',
          userPwd: '',
        },
        formRegister: {
          userName: '',
          userEmail: '',
          userPwd: ''
        }
      }
    },
    methods: {
      ...mapActions(['userLogin']),

      login() {
        let user = this.formLogin;
        let formData = {
          userEmail: user.userEmail,
          userPwd: user.userPwd
        };
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.$http.post(this.$config.user.login.url, {
              email: formData.userEmail,
              password: formData.userPwd
            })
            .then(response => {

              if (response.data.status === 0) {
                let res = response.data.user;
                this.userLogin(res);


                //登录成功，跳转到要到的页面
                  if(!this.isAdmin) {
                    this.$message.success("登录成功");
                    this.$router.push({
                      path: decodeURIComponent(this.$route.query.redirect || '/') //  你需要接受路由的参数再跳转
                    });
                  } else if (res.isManager){
                    this.$message.success("管理员登录成功");
                    localStorage.setItem('Manager', res.nickname);
                    this.$router.push({
                      path: decodeURIComponent(this.$route.query.redirect || '/') //  你需要接受路由的参数再跳转
                    });
                  } else {
                    this.$message.success("你不是管理员");
                  }
              } else {
                this.$message.error(`${response.data.message}`);
                return false;
              }
            })
            .catch(err => {
              this.$message.error(err.response.data.message);
            })
          } else {
              this.$message.error(`请填写完整信息！`);
              return false;
          }
        });
      },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .log-in h2 {
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
  }

  @media screen and (min-width:960px) {
    .main {
      width: 720px;
      margin: 0 auto;
    }
    .log-in h2 {
      display: block;
      text-align: center;
      color: #676c72;
      font-size: 24px;
      padding: 20px 0 0 0;
    }
    input[type="submit"] {
      width: 100%;
    }
  }

  .log-in {
    width: 80%;
    margin: 0 auto;
  }

  @media screen and (min-width:500px) {
    .log-in {
      width: 75%;
      margin: 0 auto;
    }
  }

  @media screen and (min-width:768px) {
    .log-in {
      width: 60%;
      margin: 0 auto;
    }
  }

  @media screen and (min-width:960px) {
    .log-in {
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

  .user-login {
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
    text-decoration: none;
    text-align: center;
    color: #fff;
    -webkit-appearance: none;
    margin-top: 10px;
    vertical-align: bottom;
    cursor: pointer;
  }
  .actions a:nth-child(2){
    font-size: 16px;
    color: #54595f;
    text-decoration: none;
  }

  .backtoindex {
    display: flex;
    justify-content: center;
    background: #335680;
  }
  .backtoindex span {
    padding: 8px 12px;
  }
  .backtoindex a {
    text-decoration: none;
    color: #fff;
  }

</style>

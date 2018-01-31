<template>
  <div class="login">
    <div class="main">
      <section class="log-in">
        
        <section class="traditional-auth">
            
            <form name="loginform" :v-model="formLogin" id="loginform" action="#" method="post" v-if="isloginfrom">
                <h2>登录</h2>
                <h4 class="errMessage"></h4>
                <p>
                    <input type="text" v-model="formLogin.userEmail" name="userEmail" id="user_login" class="input" placeholder="Email" value="" autofocus>
                </p>
                <p>
                    <input type="password" v-model="formLogin.userPwd" name="userPwd" id="user_pass" class="input" placeholder="Password" value="">
                </p>
                <div class="actions">
                    <div class="buttons">
                        <!-- <p class="submit"><input type="submit" name="user-submit" id="user-submit" value="提交"></p> -->
                        <p class="submit"><a href="javascript:;" @click="login">登录</a></p>
                        <!-- <p class="cancel">取消</p> -->
                    </div>
                    <div class="toRegister">
                        <h3 class="message">还没有帐户？<a href="javascript:void(0)" @click="isloginfrom=false">立即注册</a></h3>
                    </div>  
                </div>
            </form>
            <form name="registerform" :v-model="formRegister" id="registerform" action="#" method="post" v-else>
                <h2>注册</h2>
                <h4 class="errMessage"></h4>
                <p>
                    <input type="text" v-model="formRegister.userName" name="reg" id="user_reg" class="input" placeholder="username" value="">
                </p>
                <p>
                    <input type="text" v-model="formRegister.userEmail" name="email_reg" id="user_email_reg" class="input" placeholder="email" value="">
                </p>
                <p>
                    <input type="password" v-model="formRegister.userPwd" name="pwd_reg" id="user_pass_reg" class="input" placeholder="password" value="">
                </p>
                <div class="actions">
                    <div class="buttons">
                        <p class="submit"><a href="javascript:;" @click="register">注册</a></p>
                        <!-- <p class="cancel">取消</p> -->
                    </div>
                    <div class="toRegister">
                        <h3 class="message">已有帐户？<a href="javascript:void(0)" @click="isloginfrom=true">点击登录</a></h3>
                    </div>  
                </div>
            </form>
        </section>
      </section>
    </div>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
// import axios from 'axios'
  export default {
    name: 'login',
    data() {
      return {
        isloginfrom:true,
        formLogin:{
            userEmail:'',
            userPwd:'',
        },
        formRegister:{
            userName:'',
            userEmail:'',
            userPwd:''
        }
      }
    },
    methods:{
        ...mapActions(['userLogin']),

        login() {
            let user = this.formLogin;
            let formData = {
                userEmail: user.userEmail,
                userPwd: user.userPwd
            };
            this.$http.post('/users/login',{
            // axios.post("/users/login",{
                userEmail:formData.userEmail,
                userPwd:formData.userPwd
            })
            .then(response => {
                let res = response.data;
                if(res.status == "1") {
                    this.userLogin(res);
                    this.$message.success(`haha${res.message}`)
                    //登录成功，跳转到首页
                    //this.$router.push({name:'Home'})
                    this.$router.push('/')
                } else {
                    this.$message.error(`emmm${res.message}`);
                    return false;
                }
            })
            .catch(err => {
                this.$message.error(`ai${err.message}`,'ERROR!');
            })
        },


        register() {
            let user = this.formRegister;
            let formData = {
                userName:  user.userName,
                userEmail: user.userEmail,
                userPwd:   user.userPwd
            };
            this.$http.post('/users/register',{
                userName:formData.userName,
                userEmail:formData.userEmail,
                userPwd:formData.userPwd
            })
            .then(response => {
                let res = response.data;
                if(res.status == "1") {
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
                this.$message.error(`${err.message}`,'ERROR!');
            })
        }


        // login(){
        //          let user = this.formLogin;
        //             let formData = {
        //                 userEmail: user.userEmail,
        //                 userPwd: user.userPwd
        //             };
        //         axios.post("/users/login",{
        //              userEmail:formData.userEmail,
        //         userPwd:formData.userPwd
        //         },{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>{
        //             let res = response.data;
        //             if(res.status=="1"){
        //             //   this.errorTip = false;
        //             //   this.loginModalFlag = false;
        //             //   this.$store.commit("updateUserInfo",res.result.userName);
        //             //   this.getCartCount();
        //             alert(res.message)
        //             }else{
        //             //   this.errorTip = true;
        //             alert(res.message)
        //             }
        //         }).catch(err => {
        //             this.$message.error(`ai${err.message}`,'ERROR!');
        //     })
        //     },
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .login {
    /* background-color: #F8F8F8; */
    /* height: 800px; */
  }
.log-in h2 {
    color: #676c72;
}

.toRegister h3 {
    color:#54595f;
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
    .log-in h2 {
        display: block;
        /* position: relative; */
        text-align: center;
        color:#676c72;
        font-size: 24px;
        padding: 20px 0 0 0;
        /* margin-top: 20px; */
    }
    input[type="submit"] {
        width: 100%;
    }
  }

  .log-in {
    width: 80%;
    margin: 0 auto;

    /* border: 1px solid red; */
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
      box-shadow:0px 0px 5px 0px #6b5858;
    }
  }

  /**********
    登录表单
    **********/
input[type="text"],
input[type="password"] {
    display: block;
    height: 40px;
    width:100%;
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
    color:#fff;
    -webkit-appearance: none;
    margin-top: 10px;
    vertical-align: bottom;
    cursor: pointer;
}
</style>

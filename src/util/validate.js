import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN';//引入中文文件


const config = {
    locale: 'zh_CN',
    events:'blur',
    dictionary: {
    zh_CN: {
        zh_CN,
        messages:{
        // email:() => '邮箱格式不对',
        required: ( field )=> "请输入" + field,
        },
        attributes:{
            userEmail:'邮箱',
            userPwd:'密码',
            userName: '用户名',
          }
    } 
    }
};

Vue.use(VeeValidate,config);


//自定义验证邮箱规则
Validator.extend('email', {
  getMessage: () => '邮箱格式不对',
  validate: value => {
    return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)
  }
});
//自定义验证密码规则
Validator.extend('Pwd', {
  getMessage: () => '密码必须6位以上',
  validate: value => {
    return value.length > 6
  }
});
//自定义验证用户名规则
Validator.extend('userName', {
  getMessage: () => '用户名有误',
  validate: value => {
    // return /^[a-zA-Z0-9_-]{4,16}$/.test(value)
    }
});
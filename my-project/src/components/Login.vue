<template>
  <el-form :rules="rules" :model="loginForm" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">中国银行聚合支付系统登录</h3>
    <el-form-item prop="userName">
      <el-input type="text" v-model="loginForm.userName" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="passWord">
      <el-input type="password" v-model="loginForm.passWord" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="submitClick" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default{
  data (){
    return {
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur'},],
        passWord:
          [{ required: true, message: '请输入密码', trigger: 'blur'}, { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }]
      },
      checked: true,
      loginForm: {
        userName: '',
        passWord: ''
      },
      loading: false
    }
  },
  methods: {
    submitClick: function () {
      var _this = this;
      this.loading = true;

      this.postRequest('/login', {
        username: _this.loginForm.userName,
        password: _this.loginForm.passWord
      }).then(resp=> {
//        console.log("resp:")
//        console.log(resp)
        _this.loading = false;
        if (resp && resp.status == 200) {
          var data = resp.data;
          _this.$store.commit('login', data.msg);
          var path = _this.$route.query.redirect;
          _this.$router.replace({path: path == '/' || path == undefined ? '/home' : path});

        }
      });
    }
  },
  onSubmit(e){
    console.log('submit!')
    console.log(e)
  }
}
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>

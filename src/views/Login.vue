<template>
  <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" class="avatar" alt />
      <el-form :model="LoginForm" :rules="rules" ref="LoginForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="LoginForm.username" prefix-icon="icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="LoginForm.password" prefix-icon="icon-key" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="loginSubmit">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入实现登陆的方法
import { login } from '@/apis/user.js'
export default {
  data () {
    return {
      LoginForm: {
        username: '110110',
        password: '110'
      },
      // 添加数据的验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '请输入3~16位的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginSubmit () {
      // console.log(res)
      // 添加数据的二次验证，如果验证成功再发送请求，否则就不要发送请求
      this.$refs.LoginForm.validate(async vaild => {
        if (vaild) {
          let res = await login(this.LoginForm)
          if (res.data.message === '登录成功') {
            // 如果用户登录成功，将token值存储起来
            localStorage.setItem('userLoginToken_back', res.data.data.token)
            // 跳转到首页
            this.$router.push({ name: 'Index' })
          } else {
            // 给出提示信息
            this.$message.error(res.data.message)
          }
        } else {
          // 提示用户
          this.$message.error('数据输入不合法')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>

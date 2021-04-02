<template>
  <div class="login">
    <div class="login-wrap-box">
      <!-- logo -->
      <div class="img-logo"><img src="@/assets/logo.png" alt="logo" /></div>
      <!-- Form表单 -->
      <el-form
        :model="loginForm"
        class="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-search"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" @click="loginBtn">登录</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { reqLogin } from '../../api'
export default defineComponent({
  name: 'Login',
  setup(props) {
    // 获取Form表单元素
    const loginFormRef = ref(null)
    // 组件实例
    const { proxy } = getCurrentInstance()

    const loginReactive = reactive({
      // 表单数据对象
      loginForm: {
        username: 'admin',
        password: ''
      },
      // 表单校验规则
      loginFormRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 12,
            message: '长度在 3 到 12 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          }
        ]
      }
    })

    // 点击登录按钮
    const loginBtn = () => {
      // 表单校验规则通过后走这里
      loginFormRef.value.validate(async valid => {
        if (valid) {
          // 发送请求
          const res = await reqLogin(
            loginReactive.loginForm.username,
            loginReactive.loginForm.password
          )
          if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
          ElMessage.success(res.meta.msg)
          //   proxy.router.replace()
        } else {
          return false
        }
      })
    }
    return {
      ...toRefs(loginReactive),
      loginBtn,
      loginFormRef
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .login-wrap-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    .img-logo {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 150px;
      height: 150px;
      background-color: #fff;
      border-radius: 50%;
      padding: 10px;
      box-sizing: border-box;
      box-shadow: 0px 0px 10px 3px #eee;
      border: 1px solid #eee;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eeeeee;
      }
    }
    .loginForm {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      /deev/ .el-form-item__content {
        float: right;
      }
    }
  }
}
</style>

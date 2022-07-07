<template>
  <div class="login-page">
    <TitleHeader title="账号登录"/>

    <form class="form" method="post" @submit.prevent="handleSubmit">
      <FormItem label="账号">
        <Input v-model="formData.user" placeholder="手机号/邮箱/会员名" />
      </FormItem>
      <FormItem v-show="!msgLogin" label="登录密码">
        <Input v-model="formData.password" type="password" placeholder="请输入密码" />
      </FormItem>
      <FormItem v-show="msgLogin" label="短信验证码" labelWidth="27%">
        <Input v-model="formData.msg" placeholder="短信验证码" />
        <Button class="msg-button" theme="white" @click="getMsg"><span>{{ msgTime ? msgTime : '获取短信验证码' }}</span></Button>
      </FormItem>
      <Button class="submit" type="submit" :disabled="!isSubmit">登录</Button>
    </form>

    <div class="other-link">
      <div class="link" @click="msgLogin = !msgLogin">{{ msgLogin ? '账号密码登录' : '短信校验码登录'}}</div>
      <router-link :to="{ name: 'register' }" class="link">免费注册</router-link>
    </div>

    <Model v-model="visibleModel" cancelText="确定">
      <p class="modelMsg">{{ modelMsg }}</p>
    </Model>
  </div>
</template>

<script>
import Cookies     from 'js-cookie'
import FormItem    from '@/components/FormItem'
import Input       from '@/components/Input'
import Button      from '@/components/Button'
import Model       from '@/components/Model'
import TitleHeader from '@/components/TitleHeader'

export default {
  name: 'LoginPage',
  data() {
    return {
      formData: {
        user: '',
        password: '',
        msg: ''
      },
      visibleModel: false,
      msgLogin: false,
      msgTime: 0,
      modelMsg: ''
    }
  },
  computed: {
    isSubmit () {
      return this.formData.user && (this.msgLogin ? this.formData.msg : this.formData.password)
    }
  },
  components: {
    FormItem,
    Button,
    Input,
    Model,
    TitleHeader
  },
  methods: {
    handleSubmit () {
      // this.modelMsg = '账号或密码错误'
      this.modelMsg = '登录成功'
      this.visibleModel = true

      Cookies.set('token', 'dasdfasfasfadfsafsadfsdfadgagds')

      setTimeout(() => {
        this.$router.replace('/')
      }, 500)
    },
    getMsg () {
      if (this.msgTime) {
        return
      }

      this.msgTime = 60
      const countdown = () => {
        this.msgTime --
        this.msgTime > 0 && setTimeout(countdown, 1000)
      }
      countdown()

      this.modelMsg = '短信验证码已发送成功'
      this.visibleModel = true
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background-color: #f0f0f0;
}

.form {
  display: flex;
  flex-direction: column;
  padding-top: 35px;
  font-size: 32px;
}

.msg-button {
  width: 280px;
  flex-shrink: 0;

  span {
    display: inline-block;
    border-left: 1px solid #c8c8c8;
    width: 100%;
  }
}

.submit {
  margin: 26px 20px 0 20px;
}

.other-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100px;
}

.link {
  display: flex;
  align-items: center;
  color: rgb(255, 0, 54);
  height: 80px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

.modelMsg {
  padding: 20px 0;
  color: #6c6c6c;
  text-align: center;
}
</style>


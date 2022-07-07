<template>
  <div class="register-page">
    <TitleHeader title="账号注册"/>

    <form class="form" method="post" @submit.prevent="handleSubmit">
      <FormItem label="账号">
        <Input v-model="formData.user" placeholder="手机号/邮箱/会员名" />
      </FormItem>
      <FormItem label="登录密码">
        <Input v-model="formData.password" type="password" placeholder="请输入密码" />
      </FormItem>
      <FormItem label="确认密码">
        <Input v-model="formData.password2" type="password" placeholder="请输入密码" />
      </FormItem>
      <Button class="submit" type="submit" :disabled="!isSubmit">注册</Button>
    </form>

    <Model v-model="visibleModel" cancelText="确定">
      <p class="modelMsg">{{ modelMsg }}</p>
    </Model>
  </div>
</template>

<script>
import FormItem    from '@/components/FormItem'
import Input       from '@/components/Input'
import Button      from '@/components/Button'
import Model       from '@/components/Model'
import TitleHeader from '@/components/TitleHeader'

export default {
  name: 'RegisterPage',
  data() {
    return {
      formData: {
        user: '',
        password: '',
        password2: ''
      },
      visibleModel: false,
      modelMsg: ''
    }
  },
  computed: {
    isSubmit () {
      return this.formData.user && this.formData.password && this.formData.password2
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
      if (this.formData.password !== this.formData.password2) {
        this.modelMsg = '错误：两次密码不一致'
        this.visibleModel = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  min-height: 100vh;
  background-color: #f0f0f0;
}

.form {
  display: flex;
  flex-direction: column;
  padding-top: 35px;
  font-size: 32px;
}

.submit {
  margin: 26px 20px 0 20px;
}

.modelMsg {
  padding: 20px 0;
  color: #6c6c6c;
  text-align: center;
}
</style>

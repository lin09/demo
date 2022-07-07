<template>
  <section class="go-app">
    <div class="btn">
      前往手机APP&nbsp;&nbsp;查看更多 <ArrowRightIcon class="icon" />
    </div>
    <p class="info">新人还可领<span>￥10-15元</span>无门槛红包哦</p>
  </section>
</template>

<script>
import ArrowRightIcon from '@/components/icons/ArrowRight'

export default {
  name: 'HomeGoApp',
  components: { ArrowRightIcon }
}
</script>

<style lang="scss" scoped>
.go-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #ff0058;
  padding: 0 40px;
  height: 70px;
  border-radius: 42px;
  color: #ff0058;
  font-weight: bold;
  font-size: 28px;
  line-height: 28px;
  letter-spacing: 1px;
  .icon {
    width: 13px;
    margin-left: 10px;
  }
}
.info {
  margin-top: 10px;
  font-size: 22px;
  color: #999;
  > span {
    color: #ff0058;
  }
}
</style>

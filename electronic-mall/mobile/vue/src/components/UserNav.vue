<template>
  <Model v-model="visible" align="top left right" :top="72/16 + 'rem'">
    <div class="user-nav">
      <div class="header">我的E喵<span class="close" @click="visible = false"><TimesIcon class="close-icon"/></span></div>
      <div class="navs">
        <div class="row">
          <a class="item">客户端</a>
          <a class="item">新人无礼</a>
          <a class="item">购物车</a>
        </div>
        <div class="row">
          <a class="item">收藏宝贝</a>
          <a class="item">收藏店铺</a>
          <a class="item">全部订单</a>
        </div>
        <div class="row">
          <a class="item">个人中心</a>
        </div>
      </div>
    </div>
  </Model>
</template>

<script>
import Model from './Model'
import TimesIcon from './icons/Times'

export default {
  name: 'UserNav',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: this.value
    };
  },
  watch: {
    value (val) {
      this.visible = val;
    },
    visible (val) {
      this.$emit('input', val);
    },
  },
  components: { Model, TimesIcon }
}
</script>

<style lang="scss" scoped>
.user-nav {
  margin: -25px -45px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
  height: 66px;
  font-size: 28px;
  font-weight: bold;
  background-color: rgb(229, 229, 229);
}
.close {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 66px;
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    right: 0;
    left: 0;
    display: block;
    margin: auto;
    width: 20px;
    height: 20px;
    background-color: rgb(229, 229, 229);
    transform: rotate(45deg);
  }
}
.close-icon {
  width: 27px;
  height: 27px;
}
.navs {
  .row {
    display: flex;
    justify-content: space-between;
    & + .row {
      border-top: 1px solid #e5e5e5;
    }
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #e5e5e5;
    width: 249px;
    height: 200px;
    &:nth-of-type(3) {
      border-right: 0;
    }
  }
}
</style>


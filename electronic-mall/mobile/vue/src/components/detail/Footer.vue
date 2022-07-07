<template>
  <footer>
    <div class="fixed">
      <div class="icon-btn">
        <ShopIcon/>
        店铺
      </div>
      <div class="icon-btn">
        <SupportIcon/>
        客服
      </div>
      <div class="icon-btn">
        <StarIcon/>
        收藏
      </div>
      <Button>加入购物车</Button>
      <Button>立即购买</Button>
    </div>
  </footer>
</template>

<script>
import Button from '@/components/Button'
import ShopIcon from '@/components/icons/Shop'
import SupportIcon from '@/components/icons/Support'
import StarIcon from '@/components/icons/Star'

export default {
  name: 'DetailFooter',
  components: { Button, ShopIcon, SupportIcon, StarIcon }
}
</script>

<style lang="scss" scoped>
footer {
  height: 100px;
}
.fixed {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin: 0 auto;
  width: 750px;
  background-color: #fff;
}
.icon-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 24px;
  color: #999;
  &:nth-of-type(2) {
    svg {
      color: #4A90E2;
    }
  }
  svg {
    width: 44px;
  }
}
.btn {
  border-radius: 0;
  width: 225px;
  height: 100px;
  line-height: 100px;
  font-size: 30px;
  &:first-of-type {
    background-color: #FF9500;
  }
}
</style>

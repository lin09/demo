<template>
  <section class="shop" :style="'background-image: url(https://img.alicdn.com/imgextra/i4/2616970884/O1CN01F9SdBx1IOubmkI0ND_!!2616970884.jpg_q90.jpg)'">
    <router-link to='shop-sort' class="sort">分类</router-link>
    <div class="shop-info">
      <div class="logo" :style="'background-image: url(https://img.alicdn.com/imgextra/i1/2616970884/TB2RdcVef5TBuNjSspcXXbnGFXa-2616970884.jpg)'"></div>
      <div class="shop-name-content">
        <div class="shop-name">苏宁易购官方旗舰店</div>
        <span class="shop-brand">品牌旗舰店</span>
      </div>
      <div class="like">
        <div class="item status">收藏</div>
        <div class="item num">8888.8万<br>粉丝</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: {
    info: Object
  }
}
</script>

<style lang="scss" scoped>
.shop {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 236px;
  background: center center no-repeat;
  background-size: cover;
  color: #fff;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.4);
    content: ' ';
  }
  .sort {
    position: relative;
    z-index: 1;
    align-self: flex-end;
    margin-top: 28px;
    margin-right: 90px;
    line-height: 50px;
    color: #fff;
    &::after {
      content: ' ';
      position: absolute;
      top: 0;
      right: -57px;
      bottom: 0;
      display: inline-block;
      margin: auto;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #5F646E;
      box-shadow: -16px 0 0 0 #5F646E, -32px 0 0 0 #5F646E;
    }
  }
  .shop-info {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
  }
  .logo {
    width: 132px;
    height: 132px;
    background: center center no-repeat;
    background-size: cover;
  }
  .shop-name-content {
    flex-grow: 1;
    padding-top: 14px;
    padding-left: 19px;
    .shop-name {
      height: 54px;
      line-height: 54px;
      font-size: 28px;
    }
    .shop-brand {
      display: inline-block;
      padding: 0 6px;
      border-radius: 4px;
      height: 32px;
      line-height: 32px;
      font-size: 24px;
      background-color: #dd2727;
    }
  }
  .like {
    display: flex;
    align-items: stretch;
    margin-top: 10px;
    height: 92px;
    font-size: 24px;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 116px;
      text-align: center;
    }
    .status {
      background-color: #dd2727;
    }
    .num {
      background-color: #d0021b;
    }
  }
}
</style>

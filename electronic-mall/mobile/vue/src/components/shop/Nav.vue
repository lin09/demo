<template>
  <nav>
    <div class="nav-item action">
      <i class="icon"></i>
      <span>首页</span>
    </div>
    <div class="nav-item">
      <i class="icon"></i>
      <span>首页</span>
    </div>
    <div class="nav-item">
      <i class="icon"></i>
      <span>首页</span>
    </div>
    <div class="nav-item">
      <i class="icon"></i>
      <span>首页</span>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  border-top: 1px solid rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(0,0,0,0.1);
  height: 124px;
  box-shadow: 0 2px 2px rgba(0,0,0,.2);
  background-color: #fff;
  font-size: 28px;
}
.nav-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;
  &.action {
    position: relative;
    color: #dd2727;
    &::before {
      position: absolute;
      right: 0;
      bottom: 1px;
      left: 0;
      display: block;
      height: 6px;
      background-color: #dd2727;
      content: ' ';
    }
  }
  .icon {
    margin-bottom: 4px;
    width: 40px;
    height: 44px;
    background-color: red;
  }
}
</style>

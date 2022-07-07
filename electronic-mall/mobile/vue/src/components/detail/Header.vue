<template>
  <header :class="{ 'show-nav': showNav }">
    <div class="fixed">
      <div class="btn" @click="$router.back()"><ArrowLeftIcon class="arrow-left-icon"/></div>
      <div class="btn cart"><CartIcon class="cart-icon"/></div>
    </div>
    <nav>
      <div v-for="(item, i) in navList"
        :key="i"
        @click="index = i"
        class="item"
        :class="{ active: index === i }">{{ item }}</div>
    </nav>
  </header>
</template>

<script>
import ArrowLeftIcon from '@/components/icons/ArrowLeft'
import CartIcon      from '@/components/icons/Cart'

export default {
  name: 'DetailHeader',
  components: { ArrowLeftIcon, CartIcon },
  props: {
    navIndex: {
      type: Number,
      default: 0
    },
    navList: Array
  },
  data() {
    return {
      index: this.navIndex,
      showNav: false
    }
  },
  watch: {
    navIndex (val) {
      this.index = val
    },
    index (val) {
      this.$emit('navChange', val)
    }
  },
  methods: {
    toggle () {
      this.showNav = window.pageYOffset > 200
    }
  },
  mounted() {
    window.addEventListener('scroll', this.toggle)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.toggle)
  },
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  width: 750px;
  transition: all 200ms ease;
  background-color: transparent;
  &.show-nav {
    background-color: #fff;
    box-shadow: 0 2px 0 rgba(0,0,0,.05), 0 1px 0 rgba(0,0,0,.09);
    .btn {
      background-color: transparent;
    }
    svg {
      color: #999;
    }
    nav {
      opacity: 1;
    }
  }
  &:not(.show-nav) {
    nav {
      pointer-events: none;
    }
  }
}
.fixed {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 88px;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  background-color: rgba(0,0,0,0.4);
  transition: background-color 200ms ease;
  svg {
    transition: color 200ms ease;
    color: #fff;
  }
  .arrow-left-icon {
    width: 20px;
  }
  .cart-icon {
    width: 40px;
  }
}
nav {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin: 0 auto;
  width: 450px;
  height: 88px;
  opacity: 0;
  transition: opacity 200ms ease;

  .item {
    flex-grow: 1;
    border: 2px solid transparent;
    line-height: 86px;
    text-align: center;
    font-size: 26px;
    color: #666;
    &.active {
      border-bottom-color: #ff0036;
      color: #ff0036;
    }
  }
}
</style>

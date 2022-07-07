<template>
  <div class="to-top" :class="{ 'active': visible }" @click="toTop">
    <ToTopIcon />
  </div>
</template>

<script>
import ToTopIcon from './icons/ToTop'

export default {
  name: 'ToTop',
  data() {
    return {
      visible: false,
      oldY: window.pageYOffset
    }
  },
  components: {
    ToTopIcon
  },
  methods: {
    toggle () {
      if (window.pageYOffset < 50) {
        this.visible = false
      } else if (!this.visible && this.oldY > window.pageYOffset) {
        this.visible = true
      }
      this.oldY = window.pageYOffset
    },
    toTop () {
      window.scrollTo(0,0)
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
.to-top {
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-left: 277px;
  opacity: 0;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  transition: all 300ms ease;
  transform: translateY(0);
  z-index: 1000;
  color: #666;

  &.active {
    opacity: 1;
    transform: translateY(-88px);
  }
}
</style>


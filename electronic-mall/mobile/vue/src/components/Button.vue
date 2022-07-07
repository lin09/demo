<template>
  <button class="btn" :type="type" :disabled="disabled" :class="theme" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'red'
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 94px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  &.border {
    border: 1px solid rgb(255, 0, 54);
  }

  &.red {
    background-color: rgb(255, 0, 54);
    color: #fff;
  }

  &.white {
    background-color: white;
    color: rgb(255, 0, 54);
  }

  &:disabled {
    color: #d4d4d4;
  }
}
</style>


<template>
  <label class="form-item">
    <span class="label" :style="{ width: labelWidth }">{{ label }}</span>
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'FormItem',
  props: {
    label: String,
    labelWidth: {
      type: [String, Number],
      default: '22.5%'
    }
  }
}
</script>


<style lang="scss" scoped>
.form-item {
  display: flex;
  align-items: center;
  height: 99px;
  background-color: #fff;

  & + .form-item {
    border-top: 1px solid #c8c8c8;
  }

  &:hover .clear {
    display: flex;
  }
}

.label {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-left: 20px;
  color: #6c6c6c;
}
</style>

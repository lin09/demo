<template>
  <div class="input-item">
    <input v-model="model" :type="type" :placeholder="placeholder" :disabled="disabled" ref="input">
    <i v-show="model" class="clear" @click="handleClear">
      <ClearIcon class="clear-icon"/>
    </i>
  </div>
</template>

<script>
import ClearIcon from '@/components/icons/Clear'

export default {
  name: 'Input',
  components: {
    ClearIcon
  },
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      model: ''
    }
  },
  watch: {
    value (val) {
      this.model = val
    },
    model (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleClear () {
      this.model = ''
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.input-item {
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  padding-right: 10px;

  input {
    width: 100%;
    background-color: transparent;
  }
}

.clear {
  display: none;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

.clear-icon {
  width: 32px;
  height: 32px;
  color: #fff;
}

.input-item:hover .clear,
input:focus + .clear {
  display: flex;
}
</style>

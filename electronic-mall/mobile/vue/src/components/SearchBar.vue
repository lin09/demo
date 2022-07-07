<template>
  <form class="search-bar" @submit.prevent="handleSubmit">
    <div class="goback" @click="$router.back()">
      <ArrowLeftIcon class="arrow-icon"/>
    </div>
    <Input v-model="model" class="input" :placeholder="placeholder" :disabled="disabled"/>
    <div class="submit" @click="handleSubmit">
      <SearchIcon class="searh-icon"/>
    </div>
  </form>
</template>

<script>
import ArrowLeftIcon from '@/components/icons/ArrowLeft'
import SearchIcon from '@/components/icons/Search'
import Input from '@/components/Input'

export default {
  name: 'SearchBar',
  components: { ArrowLeftIcon, SearchIcon, Input },
  props: {
    value: String,
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      model: this.value
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
    handleSubmit () {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background-color: #fff;
  .goback {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .arrow-icon {
    width: 25px;
    color: #666;
  }
  .input {
    padding: 0 20px;
    height: 60px;
    border-radius: 4px;
    background-color: #eee;
    font-size: 28px !important;
  }
  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .searh-icon {
    width: 40px;
    color: #666;
  }
}
</style>

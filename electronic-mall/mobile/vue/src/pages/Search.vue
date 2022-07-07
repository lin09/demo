<template>
  <div class="search-page">
    <SearchBar v-model="keyword" placeholder="搜索商品、品牌" @submit="handleSubmit"/>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'

export default {
  name: 'SearchPage',
  components: { SearchBar },
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    handleSubmit () {
      // console.log(this.keyword)
    }
  },
}
</script>

<style lang="scss" scoped>
.search-page {
  min-height: 100vh;
  background-color: rgb(238, 238, 238);
}
</style>

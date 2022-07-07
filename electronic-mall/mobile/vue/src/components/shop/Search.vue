<template>
  <a class="search">
    <Button theme="white"><SearchIcon class="icon"/>在店铺内搜索</Button>
  </a>
</template>

<script>
import Button     from '@/components/Button'
import SearchIcon from '@/components/icons/Search'

export default {
  name: 'ShopSearch',
  components: { Button, SearchIcon }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  padding: 18px;
  .btn {
    flex-grow: 1;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    color: #a9a9a9;
  }
  .icon {
    margin-right: 8px;
    width: 38px;
    height: 38px;
    opacity: 0.4;
  }
}
</style>

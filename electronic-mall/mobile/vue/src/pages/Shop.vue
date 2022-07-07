<template>
  <div class="shop-page">
    <header>
      <ShopInfo/>
      <ShopNav/>
      <Search/>
    </header>
    <main></main>
    <footer></footer>
  </div>
</template>

<script>
import ShopInfo   from '@/components/shop/Info'
import ShopNav    from '@/components/shop/Nav'
import Search from '@/components/shop/Search'

export default {
  name: 'ShopPage',
  components: { ShopInfo, ShopNav, Search }
}
</script>

<style lang="scss" scoped>
.shop-page {
  min-height: 100vh;
  background-color: rgb(238, 238, 238);
}
</style>

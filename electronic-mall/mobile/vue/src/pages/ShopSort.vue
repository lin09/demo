<template>
  <div class="shop-sort-page">
    <SearchBar v-model="keyword" @submit="handleSearch" placeholder="宝贝关键字"/>
    <a href="" class="go-all-product">全部宝贝<ArrowRightIcon class="icon"/></a>
    <section class="sort-list" v-for="(item, index) in data" :key="index">
      <a class="title">{{ item.title }}<span>查看全部</span></a>
      <div class="list">
        <a class="item" v-for="(name, index) in item.list" :key="index">{{ name }}</a>
      </div>
    </section>
  </div>
</template>

<script>
import ArrowRightIcon from '@/components/icons/ArrowRight'
import SearchBar      from '@/components/SearchBar'

const data = []
for (let i = 0; i < 10; i ++) {
  data.push({
    title: '分类' + i,
    list: []
  })
  for (let j = 0; j < 10; j ++) {
    data[i].list.push('分类' + i + '_' + j)
  }
}

export default {
  name: 'ShopSortPage',
  components: { SearchBar, ArrowRightIcon },
  data() {
    return {
      data,
      keyword: ''
    }
  },
  methods: {
    handleSearch () {
      // console.log(this.keyword)
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-sort-page {
  min-height: 100vh;
  background-color: rgb(238, 238, 238);
}
.go-all-product {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 0;
  padding: 0 20px;
  height: 88px;
  line-height: 88px;
  background-color: #fff;
  color: #666;
  font-size: 28px;
  .icon {
    width: 20px;
    color: #999;
  }
}
.sort-list {
  background-color: #fff;
  .title {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    height: 88px;
    line-height: 88px;
    font-size: 28px;
    color: #666;
    font-weight: 500;
    > span {
      font-size: 24px;
      color: #ccc;
      font-weight: normal;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      margin-top: 6px;
      padding-left: 24px;
      width: 347px;
      height: 100px;
      line-height: 100px;
      font-size: 24px;
      color: #999;
      background-color: #f8f8f8;
    }
  }
}
</style>


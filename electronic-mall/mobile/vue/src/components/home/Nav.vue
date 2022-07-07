<template>
  <nav>
    <router-link class="link" v-for="(item, index) in navList" :key="index" :to="item.url">
      <img :src="item.logoUrl" :alt="item.text">
      <span>{{ item.text }}</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'HomeNav',
  data() {
    return {
      navList: [
        {
          url: 'shop',
          logoUrl: 'https://gw.alicdn.com/tfs/TB1ISdWSFXXXXbFXXXXXXXXXXXX-146-147.png_110x10000.jpg_.webp',
          text: '苏丁易购'
        },
        {
          url: '',
          logoUrl: 'https://gw.alicdn.com/tfs/TB1wSoFa5qAXuNjy1XdXXaYcVXa-196-196.png?avatar=1_110x10000.jpg_.webp',
          text: '大猫超市'
        },
        {
          url: '',
          logoUrl: 'https://gw.alicdn.com/tfs/TB1Jc0fSFXXXXXTapXXXXXXXXXX-146-147.png_110x10000.jpg_.webp',
          text: '大猫国际'
        },
        {
          url: '',
          logoUrl: 'https://gw.alicdn.com/tfs/TB15lhOSFXXXXaKXpXXXXXXXXXX-147-147.png_110x10000.jpg_.webp',
          text: '巨划算'
        },
        {
          url: 'tabnav',
          logoUrl: 'https://gw.alicdn.com/tfs/TB12CFXSFXXXXcpapXXXXXXXXXX-146-147.png_110x10000.jpg_.webp',
          text: '分类'
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  line-height: 60px;
}
.link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  width: 140px;
  font-size: 26px;
  color: #000;

  & > img {
    margin-bottom: 4px;
    width: 96px;
    height: 96px;
  }
}
</style>


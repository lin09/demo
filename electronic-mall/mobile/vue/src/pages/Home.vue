<template>
  <div class="home-page">
    <Header/>
    <ToTop/>
    <main>
      <HomeNav/>
      <ImageScroll :images="images"/>
      <section class="ad">
        <a href="#">
          <img class="ad-image" src="https://gw.alicdn.com/tfs/TB1EFA.AxTpK1RjSZR0XXbEwXXa-750-365.png_790x10000.jpg_.webp" alt="">
        </a>
      </section>
      <Activity/>
      <Ranking/>
      <Recommend/>
      <GoApp/>
    </main>
  </div>
</template>

<script>
import ImageScroll from '@lin09/image-scroll-vue'
import Header      from '@/components/Header'
import ToTop       from '@/components/ToTop'
import HomeNav     from '@/components/home/Nav'
import Activity    from '@/components/home/Activity'
import Ranking     from '@/components/home/Ranking'
import Recommend   from '@/components/home/Recommend'
import GoApp       from '@/components/home/GoApp'

export default {
  name: 'HomePage',
  components: {
    ImageScroll,
    Header,
    ToTop,
    HomeNav,
    Activity,
    Ranking,
    Recommend,
    GoApp
  },
  data() {
    return {
      images: [{
        imgUrl: 'https://gw.alicdn.com/imgextra/i4/1/O1CN01fFFjmR1BsUtzbDibn_!!1-0-lubanu.jpg_790x10000Q75.jpg_.webp',
        href: 'https://www.baidu.com'
      },{
        imgUrl: 'https://gw.alicdn.com/imgextra/i1/124/O1CN01QTazoU1CmpcKM3axV_!!124-0-luban.jpg_790x10000Q75.jpg_.webp'
      },{
        imgUrl: 'https://gw.alicdn.com/imgextra/i1/50/O1CN01x3WLUL1CEwJJq7Esw_!!50-0-lubanu.jpg_790x10000Q75.jpg_.webp'
      },{
        imgUrl: 'https://gw.alicdn.com/imgextra/i3/103/O1CN01IALwmx1CdDImsIMWb_!!103-0-lubanu.jpg_790x10000Q75.jpg_.webp'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.ad {
  margin-top: 30px;
}
.ad-image {
  width: 750px;
  height: 365px;
}
</style>


<template>
  <div id="app">
    <ImageScroll :images="images" height="292px" />
    <div>
      <img class="qr" src="https://lin09.github.io/demo/image-scroll-vue/public/qr.jpg" alt="二维码">
      <p>扫一扫预览</p>
    </div>
  </div>
</template>

<script>
import ImageScroll from '@lin09/image-scroll-vue'

export default {
  name: 'app',
  components: {
    ImageScroll
  },
  data() {
    return {
      images: [{
        imgUrl: 'https://gw.alicdn.com/imgextra/i4/1/O1CN01fFFjmR1BsUtzbDibn_!!1-0-lubanu.jpg_790x10000Q75.jpg_.webp',
        href: ''
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

<style>
body {
  margin: 0;
  padding-top: 50px;
  font-size: 36px;
}
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 800px;
}
.qr {
  width: 200px;
}
</style>


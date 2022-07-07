<template>
  <section class="recommend">
    <a href="" class="heading"></a>
    <div class="items">
      <div class="item" v-for="(item, index) in list" :key="index">
        <router-link class="content" to="detail">
          <div class="image" :style="'background-image: url(' + item.imgUrl + ')'"></div>
          <div class="tag">{{ item.tag }}</div>
          <div class="title">{{ item.title }}</div>
          <div class="ticket"><span>{{ item.ticket }}</span></div>
          <div class="price">
            <span>￥{{ item.price }}</span>
            <a class="btn">看相似</a>
          </div>
        </router-link>
        <div class="footer">
          <div>
            <div class="title">预计使用新人红包后</div>
            <div class="price">￥{{ item.newcomerPrice }}</div>
          </div>
          <ArrowRightIcon class="icon" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ArrowRightIcon from '@/components/icons/ArrowRightCircle'

let list = []
for (let i = 0; i < 10; i ++) {
  list.push({
    href: '',
    imgUrl: 'https://gw.alicdn.com/bao/uploaded/i4/2013419387/O1CN01evdQ9b2JDINKjQ4Zq_!!2-item_pic.png_290x10000.jpg_.webp',
    title: '会议桌长桌简约现代长桌子工作台职员办公室家具长条洽谈桌椅组合',
    tag: '睿寰创',
    ticket: '20元券',
    price: '448',
    newcomerPrice: '438'
  })
}

export default {
  name: 'HomeRecommend',
  components: { ArrowRightIcon },
  data() {
    return {
      list
    }
  },
}
</script>

<style lang="scss" scoped>
.heading {
  display: block;
  width: 750px;
  height: 176px;
  background: url(https://gw.alicdn.com/tfs/TB1b6qwx9rqK1RjSZK9XXXyypXa-750-176.png_790x10000.jpg_.webp) center bottom no-repeat;
  background-size: 100% 100%;
}
.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 24px;
  background: url(https://gw.alicdn.com/tfs/TB1Pq4.x9zqK1RjSZPcXXbTepXa-750-294.png_790x10000.jpg_.webp) center top no-repeat;
  background-size: 750px 294px;
}
.item {
  position: relative;
  margin-bottom: 20px;
  width: 340px;
  height: 620px;
}
.content {
  display: block;
  border: 1px solid rgb(237, 237, 237);
  .image {
    width: 100%;
    height: 336px;
    background-color: rgba(0, 0, 0, 0.03);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 276px 276px;
  }
  .tag {
    position: absolute;
    top: 318px;
    left: 20px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 36px;
    line-height: 36px;
    font-size: 24px;
    color: #fff;
    background-color: rgb(205, 163, 177);
  }
  .title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding: 24px 10px 4px 10px;
    height: 72px;
    line-height: 36px;
    font-size: 28px;
    color: rgb(62, 62, 62);
  }
  .ticket {
    display: flex;
    margin-top: 6px;
    margin-left: 20px;
    > span {
      display: flex;
      align-items: center;
      border: 1px solid rgb(255, 0, 54);
      height: 26px;
      line-height: 26px;
      font-size: 22px;
      color: rgb(255, 0, 54);
    }
  }
  .price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    color: rgb(255, 0, 54);
    font-weight: bold;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 108px;
      height: 46px;
      border-radius: 23px;
      font-weight: normal;
      font-size: 22px;
      line-height: 22px;
      background-color: rgb(255, 230, 235);
    }
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  background-color: #ff0058;
  align-items: center;
  padding: 0 20px;
  height: 86px;
  color: #fff;
  font-size: 28px;
  .title {
    font-size: 24px;
  }
  .icon {
    width: 40px;
    height: 40px;
    stroke: #ff0058;
  }
}
</style>

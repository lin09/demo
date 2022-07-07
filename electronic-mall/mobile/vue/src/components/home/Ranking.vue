<template>
  <section class="ranking">
    <div class="title">榜单</div>
    <div class="front-row">
      <a class="item" v-for="(item, index) in frontList" :key="index" :href="item.href">
        <Medal1Icon class="icon" text="趋势榜"/>
        <div class="content">
          <img class="image" :src="item.imgUrl" alt="">
          <div class="title">{{ item.title }}</div>
          <div class="value">{{ item.value }}</div>
        </div>
      </a>
    </div>
    <div class="prestige">
      <div class="no-1">
        <div>
          <Medal2Icon class="tag" text="人气榜"/>
          <div class="title">超值可充气火机榜</div>
          <div class="value">月销1787件</div>
        </div>
        <div class="images">
          <ImageScroll :images="PrestigeNo1List" :pagination="false"/>
        </div>
      </div>
      <div class="other">
        <a v-for="(item, index) in PrestigeOtherList" :key="index" :href="item.href" class="item">
          <div class="content">
            <div class="heading">人气榜</div>
            <div class="title">{{ item.title }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
          <div class="image" :style="'background-image: url(' + item.imgUrl + ')'"></div>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import ImageScroll from '@lin09/image-scroll-vue'
import Medal1Icon from '@/components/icons/Medal1'
import Medal2Icon from '@/components/icons/Medal2'

export default {
  name: 'HomeRanking',
  components: { Medal1Icon, ImageScroll, Medal2Icon },
  data() {
    return {
      frontList: [
        {
          href: '',
          imgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1IX0Er8jTBKNjSZFuwu20HFXa.png_150x10000.jpg_.webp',
          title: '营养美味红枣榜',
          value: '趋势上升957%'
        },
        {
          href: '',
          imgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1WV.TAhSYBuNjSsphwu2GvVXa.png_150x10000.jpg_.webp',
          title: '精选热弯水族箱榜',
          value: '趋势上升496%'
        },
        {
          href: '',
          imgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1kPy6dgTqK1RjSZPhwu0fOFXa.png_150x10000.jpg_.webp',
          title: '品质舒适休闲靴榜',
          value: '趋势上升420%'
        }
      ],
      PrestigeNo1List: [
        {
          href: '',
          imgUrl: 'https://lin09.github.io/Electronic-mall/mobile/vue/image/prestige_1_1.jpg'
        },
        {
          href: '',
          imgUrl: 'https://lin09.github.io/Electronic-mall/mobile/vue/image/prestige_1_2.jpg'
        }
      ],
      PrestigeOtherList: [
        {
          imgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1SEimDVuWBuNjSszbwu3S7FXa.png_140x10000.jpg_.webp',
          href: '',
          title: '高耐磨皮鞋榜',
          value: '月销1.2万件'
        },
        {
          imgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1sE8wGVzqK1RjSZFCSuvbxVXa.jpg_140x10000Q75.jpg_.webp',
          href: '',
          title: '流行冬季风衣榜',
          value: '月销1675件'
        },
        {
          imgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1kK8XzFuWBuNjSszbwu3S7FXa.png_140x10000.jpg_.webp',
          href: '',
          title: '轻奢简约凉鞋榜',
          value: '月销213件'
        },
        {
          imgUrl: 'https://gw.alicdn.com/bao/uploaded/TB1C0IMgCzqK1RjSZPcwu2TepXa.png_140x10000.jpg_.webp',
          href: '',
          title: '品质小户型衣柜榜',
          value: '月销661件'
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.ranking {
  padding: 20px 24px;

  > .title {
    font-size: 36px;
    font-weight: 700;
    line-height: 60px;
  }
}
.front-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .item {
    position: relative;
    width: 226px;
    height: 273px;
    border-radius: 6px;
    background: linear-gradient(#f2e8e8, #f2f1f1);
    overflow: hidden;

    &:nth-of-type(2) {
      height: 299px;

      .image {
        margin-top: 32px;
      }
    }
  }

  .icon {
    position: absolute;
    top: 0;
    left: 12px;
    width: 63px;
    height: 50px;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .image {
    margin-top: 16px;
    width: 146px;
    height: 146px;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
    width: 208px;
    height: 36px;
    border-radius: 18px;
    font-size: 22px;
    line-height: 22px;
    color: #fff;
    background: linear-gradient(to right, #6073d1 , #374ba6);
  }
  .value {
    margin-top: 2px;
    line-height: 36px;
    font-size: 24px;
    color: #000;
  }
}
.prestige {
  margin-top: 26px;
  .no-1 {
    display: flex;
    justify-content: space-between;
    padding-left: 26px;
    height: 169px;
    border-radius: 6px;
    background-color: rgb(248, 248, 248);
    font-size: 24px;
    .tag {
      width: 92px;
      height: 43px;
    }
    .title {
      margin-top: 10px;
      font-weight: bold;
      color: rgb(49, 49, 49);
    }
    .value {
      color: rgb(153, 153, 153);
    }
    .images {
      align-self: center;
      width: 422px;
      height: 130px;
    }
    .image-scroll {
      transform: translate(-164px,-81px) scale(0.56267, 0.44521);
    }
  }
  .other {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      align-items: center;
      width: 345px;
      height: 169px;
      border-radius: 6px;
      background-color: rgb(248, 248, 248);
      font-size: 24px;
      line-height: 38px;
      .content {
        padding-left: 26px;
      }
      .heading {
        color: rgb(200, 157, 107);
        line-height: 40px;
        &::after {
          content: ' ';
          display: block;
          margin-top: 4px;
          margin-bottom: 12px;
          width: 22px;
          height: 3px;
          background-color: rgb(227, 227, 227);
        }
      }
      .title {
        font-weight: 600;
        color: rgb(49, 49, 49);
      }
      .value {
        color: rgb(153, 153, 153);
      }
      .image {
        margin-right: 8px;
        width: 110px;
        height: 110px;
        background-color: rgba(0, 0, 0, 0.03);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        overflow: hidden;
      }
    }
  }
}
</style>

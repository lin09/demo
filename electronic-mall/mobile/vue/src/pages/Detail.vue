<template>
  <div class="detail-page">
    <DetailHeader :nav-index="navIndex" :nav-list="navList" @navChange="handleNavChange"/>

    <section>
      <ImageScroll :images="images"/>
      <div class="price"><span>¥</span>984.00</div>
      <div class="title">会议桌长桌简约现代长桌子工作台职员办公室家具长条洽谈桌椅组合会议桌长桌简约现代长桌子工作台职员办公室家具长条洽谈桌椅组合会议桌长桌简约现代长桌子工作台职员办公室家具长条洽谈桌椅组合</div>
    </section>

    <section>
      <div class="more">
        <div class="name">选择</div>
        <div class="value">请选择适用床尺寸 颜色分类</div>
        <ArrowRightIcon/>
      </div>
      <div class="more">
        <div class="name">参数</div>
        <div class="value">件数 材质...</div>
        <ArrowRightIcon/>
      </div>
    </section>

    <section class="comment">
      <div class="comment-title">
        商品评价 (221)
        <span>查看全部 <ArrowRightIcon/></span>
      </div>
      <div class="tags">
        <div class="tag">质量好(81)</div>
        <div class="tag">颜色不错(47)</div>
        <div class="tag">材质不错(44)</div>
      </div>
      <div class="user-comment">
        <div class="user">
          <div class="user-avatar"></div>
          <div class="user-name">过来买东西的</div>
        </div>
        <div class="content">质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好质量好</div>
        <div class="date">2019-03-20 尺寸:1.8m;颜色分类:豆沙</div>
      </div>
    </section>

    <section class="shop">
      <div class="shop-main">
        <div class="logo"></div>
        <div class="shop-info">
          <div class="name">卖东西的店</div>
          <div class="tag">E喵</div>
        </div>
      </div>
      <div class="fractions">
        <div class="item">宝贝描述<b>4.9</b><ArrowUPCircleAlt/></div>
        <div class="item">卖家服务<b>4.9</b><ArrowUPCircleAlt/></div>
        <div class="item">物流服务<b>4.9</b><ArrowUPCircleAlt/></div>
      </div>
      <div class="btns">
        <Button theme="white border">全部商品</Button>
        <Button theme="white border">进入店铺</Button>
      </div>
    </section>

    <DetailDesc/>
    <DetailFooter/>
  </div>
</template>

<script>
import ImageScroll      from '@lin09/image-scroll-vue'
import DetailHeader     from '@/components/detail/Header'
import DetailFooter     from '@/components/detail/Footer'
import DetailDesc       from '@/components/detail/Desc'
import ArrowRightIcon   from '@/components/icons/ArrowRight'
import ArrowUPCircleAlt from '@/components/icons/ArrowUpCircleAlt'
import Button           from '@/components/Button'

const images = []
for (let i = 0; i < 5; i ++) {
  images.push({
    imgUrl: 'https://gw.alicdn.com/bao/uploaded/i4/2013419387/O1CN01evdQ9b2JDINKjQ4Zq_!!2-item_pic.png_290x10000.jpg_.webp'
  })
}

export default {
  name: 'DetailPage',
  components: { ImageScroll, DetailHeader, DetailFooter, DetailDesc, ArrowRightIcon, Button, ArrowUPCircleAlt },
  data() {
    return {
      navIndex: 0,
      navList: ['商品', '评价', '详情'],
      images
    }
  },
  created() {
    window.scrollTo(0,0)
  },
  methods: {
    handleNavChange (index) {
      window.console.log(index)
    }
  },
}
</script>

<style lang="scss" scoped>
.detail-page {
  min-height: 100vh;
  background-color: rgb(238, 238, 238);
}
section {
  margin-bottom: 20px;
  background-color: #fff;
}
.image-scroll {
  height: 750px;
  background-color: rgb(238, 238, 238);
}
.price {
  padding: 0 20px;
  height: 72px;
  line-height: 72px;
  font-size: 48px;
  color: #FF0036;
}
.title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  padding: 6px 20px;
  line-height: 40px;
  font-size: 28px;
  color: #051B28;
}
.more {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 20px;
  font-size: 24px;
  line-height: 84px;
  .name {
    width: 60px;
    color: #999;
  }
  .value {
    flex-grow: 1;
    color: #333;
  }
  svg {
    width: 18px;
    color: #ccc;
  }
}
.comment {
  padding: 12px;
  .comment-title {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
    height: 64px;
    line-height: 64px;
    font-size: 28px;
    color: #666;
    span {
      display: flex;
      align-content: center;
      font-size: 26px;
      color: #FF0036;
    }
    svg {
      align-self: center;
      margin-left: 5px;
      width: 17px;
      height: 26px;
    }
  }
  .tags {
    display: flex;
  }
  .tag {
    margin: 12px 6px;
    padding: 0 18px;
    border-radius: 26px;
    height: 52px;
    line-height: 52px;
    font-size: 24px;
    color: #666;
    background-color: #FEE;
  }
}
.user-comment {
  margin: 8px 12px;
  .user {
    display: flex;
    align-content: center;
  }
  .user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: red;
  }
  .user-name {
    padding: 10px;
    color: #999;
    font-size: 24px;
  }
  .content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-top: 20px;
    line-height: 32px;
    font-size: 26px;
    color: #051b28;
  }
  .date {
    margin-top: 8px;
    line-height: 28px;
    font-size: 20px;
    color: #999;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.shop {
  padding: 20px;
  .shop-main {
    display: flex;
  }
  .logo {
    flex-shrink: 0;
    width: 112px;
    height: 112px;
    background-color: red;
  }
  .shop-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 20px;
  }
  .name {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #333;
  }
  .tag {
    margin-top: 10px;
    padding: 0 15px;
    border-radius: 14px;
    height: 28px;
    line-height: 28px;
    font-size: 20px;
    color: #fff;
    background-color: #FF0036;
  }
  .fractions {
    display: flex;
    margin: 20px 0;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      font-size: 24px;
      color: #999;
      b {
        color: #FF0036;
      }
      svg {
        margin-left: 5px;
        width: 24px;
        height: 24px;
        color: #FF0036;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: center;
    .btn {
      margin: 0 10px;
      border-radius: 24px;
      padding: 0 43px;
      height: 48px;
      line-height: 44px;
      font-size: 26px;
    }
  }
}
</style>

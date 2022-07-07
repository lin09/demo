<template>
  <article>
    <h2 class="title"><span>详情</span></h2>
    <section>
      <h4 class="subtitle">"质量有保证 双重享受"</h4>
    </section>
    <section>
      <h3 class="section-title">产品信息</h3>
      <div class="list">
        <div class="item" v-for="(item, index) in list" :key="index" v-show="index < 5 || showMore">
          <div class="name">{{ item.name }}</div>
          <div class="value">{{ item.value }}</div>
        </div>
      </div>
      <div class="more-btn" v-if="!showMore" @click="showMore = true">查看更多<ArrowDownIcon/></div>
      <div class="more-btn" v-if="showMore" @click="showMore = false">收起<ArrowUpIcon/></div>
    </section>
    <section>
      <h3 class="section-title">商品图片</h3>
      <img src="https://gw.alicdn.com/bao/uploaded/i4/2013419387/O1CN01evdQ9b2JDINKjQ4Zq_!!2-item_pic.png_290x10000.jpg_.webp">
    </section>
    <section class="synopsis">
      <h3>价格说明</h3>
      <div class="content">
        <p><span>划线价格：</span>指商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，<strong>并非原价</strong>，仅供参考。</p>
        <p><span>未划线价格：</span>指商品的<strong>实时标价</strong>，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化最终以订单结算页价格为准。</p>
        <p>此说明仅当出现价格比较时有效，具体请参见《淘宝价格发布规范》。若商家单独对划线价格进行说明的，以商家的表述为准。</p>
      </div>
    </section>
  </article>
</template>

<script>
import ArrowUpIcon   from '@/components/icons/ArrowUp'
import ArrowDownIcon from '@/components/icons/ArrowDown'

const list = []
for (let i = 0; i < 15; i ++) {
  list.push({
    name: '参数' + i,
    value: '值' + i
  })
}
export default {
  name: 'DetailDesc',
  components: { ArrowUpIcon, ArrowDownIcon },
  data() {
    return {
      list,
      showMore: false
    }
  },
}
</script>

<style lang="scss" scoped>
section {
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0,0,0,.3);
  background-color: #fff;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 400;
  color: #999;
  span {
    padding: 0 20px;
  }
  &::after,
  &::before {
    content: ' ';
    width: 106px;
    height: 1px;
    background-color: #999;
  }
}
.subtitle {
  padding: 20px;
  line-height: 56px;
  font-weight: 400;
  text-align: center;
  color: #333;
}
.section-title {
  border-left: 6px solid #FF0036;
  line-height: 80px;
  padding-left: 24px;
  font-size: 28px;
  font-weight: 400;
  color: #666;
}
.list {
  font-size: 28px;
  color: #333;
  background-color: #f9f9f9;
  padding: 12px 36px;
  .item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 12px 0;
  }
  .name {
    min-width: 120px;
    color: #999;
  }
}
.more-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  line-height: 100px;
  font-size: 28px;
  color: #666;
  svg {
    margin-left: 8px;
    width: 22px;
  }
}
img {
  width: 100%;
}
.synopsis {
  h3 {
    padding-left: 20px;
    height: 70px;
    line-height: 70px;
    font-size: 28px;
    color: #333;
    font-weight: 400;
  }
  .content {
    background-color: #f9f9f9;
    padding: 20px;
  }
  p {
    font-size: 24px;
    color: #999;
    &:last-of-type {
      font-size: 20px;
    }
    & + p {
      margin-top: 22px;
    }
  }
  span,
  strong {
    color: #333;
  }
}
</style>

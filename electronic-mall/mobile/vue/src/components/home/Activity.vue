<template>
  <section class="activity">
    <div class="activity-part" v-for="(activity, index) in list" :key="index">
      <a class="activity-header">{{ activity.title }}</a>
      <div class="activity-items">
        <a class="activity-item"
          v-for="(item, index) in activity.items"
          :key="index"
          :href="item.href"
          :style="'background-image: url(' + item.imgUrl + ')'">
          <span class="text">{{ item.text }}</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeActivity',
  data() {
    return {
      list: [
        {
          title: '限时抢购',
          items: [
            {
              imgUrl: 'https://gw.alicdn.com/bao/upload/TB1g_j2h4TpK1RjSZFGwu3HqFXa.png_170x10000.jpg_.webp',
              text: '为你精选',
              href: 'https://www.google.com.hk'
            },
            {
              imgUrl: 'https://gw.alicdn.com/i4/3102721163/O1CN01k4l9TP1KSh7QSomR0_!!0-item_pic.jpg_170x10000Q75.jpg_.webp',
              text: '限时特价',
            }
          ]
        },
        {
          title: '天猫好物',
          items: [
            {
              imgUrl: 'https://gw.alicdn.com/tps/bao/upload/TB1b_8bLSzqK1RjSZPxXXc4tVXa.png_170x10000.jpg_.webp',
              text: '好货必买',
            },
            {
              imgUrl: 'https://gw.alicdn.com/tps/bao/upload/TB1cA4_x7PoK1RjSZKbXXX1IXXa.png_170x10000.jpg_.webp',
              text: '全面屏手机',
            }
          ]
        },
        {
          title: '聚划算',
          items: [
            {
              imgUrl: 'https://gw.alicdn.com/tps/O1CN01M2kE9e1CcIVVxjTIi_!!101-2-lubanu.png_170x10000.jpg_.webp',
              text: '满300元减30',
            },
            {
              imgUrl: 'https://gw.alicdn.com/tps/O1CN01oPEL571BvFHIbXw4j_!!7-2-lubanu.png_170x10000.jpg_.webp',
              text: '满300元减30',
            }
          ]
        },
        {
          title: '天猫闪降',
          items: [
            {
              imgUrl: 'https://gw.alicdn.com/tps/bao/upload/TB1Lvn9tSzqK1RjSZFHXXb3CpXa.png_170x10000.jpg_.webp',
              text: '已降50元',
            },
            {
              imgUrl: 'https://gw.alicdn.com/tps/bao/upload/TB1jEh_EgHqK1RjSZFPXXcwapXa.png_170x10000.jpg_.webp',
              text: '已降9元',
            }
          ]
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.activity {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 24px;
}
.activity-part {
  position: relative;
  margin-top: 12px;
  width: 344px;
  height: 257px;
  border-radius: 8px;
  background-color: #f8f8f8;
  overflow: hidden;
  &::before {
    position: absolute;
    line-height: 70px;
    font-size: 90px;
    color: #f2f2f2;
    font-weight: bold;
  }
  &:nth-of-type(1)::before {
    top: -18px;
    right: -3px;
    content: 'SALE';
  }
  &:nth-of-type(2)::before {
    top: -7px;
    right: -16px;
    content: 'GOODS';
  }
  &:nth-of-type(3)::before {
    top: -14px;
    right: -6px;
    content: 'JU';
  }
  &:nth-of-type(4)::before {
    top: -3px;
    right: -18px;
    content: 'SALE';
  }
}
.activity-header {
  position: relative;
  z-index: 1;
  display: inline-block;
  padding-top: 30px;
  padding-left: 30px;
  line-height: 32px;
  color: #3a3a3a;
  font-weight: bold;
}
.activity-items {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0 12px;
}
.activity-item {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 155px;
  height: 155px;
  background-repeat: no-repeat;
  background-size: contain;
  & .text {
    line-height: 24px;
    border: 1px solid rgb(255, 0, 54);
    background-color: #fff;
    font-size: 24px;
    color: rgb(255, 0, 54);
  }
}
</style>

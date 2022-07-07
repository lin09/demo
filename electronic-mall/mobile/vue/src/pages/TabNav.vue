<template>
  <div class="tab-nav-page">
    <TitleHeader title="全部分类"/>
    <main>
      <aside>
        <div v-show="tabCloneTopShow" class="tab-clone top">{{ listData[index].name }}</div>
        <div v-show="tabCloneBottomShow" class="tab-clone bottom">{{ listData[index].name }}</div>
        <ul ref="tabNav">
          <li v-for="(item, i) in listData" :key="i" :class="{ action: index === i }" @click="toggle(i)">{{ item.name }}</li>
        </ul>
      </aside>
      <section ref="tabMenu">
        <a class="go">
          <Button class="go-btn">进入{{ listData[index].name }}频道 ></Button>
        </a>
        <ul>
          <li class="items" v-for="(items, i) in listData[index].items" :key="i">
            <h2 class="title">{{ items.title }}</h2>
            <ul class="items-list">
              <li v-for="(item, j) in items.list" :key="j">
                <div class="item" :style="'background-image: url(' + item.imgUrl + ')'">{{ item.name }}</div>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import Button from '@/components/Button'
import TitleHeader from '@/components/TitleHeader'

const listData = []
for (let i = 0; i < 25; i ++) {
  listData.push({
    name: '分类' + i,
    items: []
  })
  for (let j = 0; j < 3; j ++) {
    listData[i].items.push({
      title: '分类' + i + '_' + j,
      list: [],
      href: ''
    })
    for (let k = 0; k < 9; k ++) {
      listData[i].items[j].list.push({
        name: i + '_' + j + '_' + k,
        href: '',
        imgUrl: 'https://img.alicdn.com/tps/i4/TB1IAIIGVXXXXb1XpXXMxXJVFXX-100-100.jpg_140x140Q50s50.jpg_.webp'
      })
    }
  }
}
export default {
  name: 'TabNavPang',
  components: { Button, TitleHeader },
  data() {
    return {
      listData,
      index: 0,
      tabCloneTopShow: true,
      tabCloneBottomShow: false
    }
  },
  mounted() {
    this.$refs.tabNav.addEventListener('scroll', this.handleTabCloneShow)
    window.tabNav = this.$refs.tabNav
  },
  methods: {
    toggle (index) {
      this.$refs.tabMenu.scrollTo(0,0)
      this.index = index
      this.handleTabCloneShow()
    },
    handleTabCloneShow () {
      const zoom = document.documentElement.style.fontSize.replace(/(.+)px/,'$1') * 1 / 16
      const itemHeight = 120 * zoom
      const { scrollTop, clientHeight } = this.$refs.tabNav
      this.tabCloneTopShow = this.index <= scrollTop / itemHeight
      this.tabCloneBottomShow = (this.index + 1) * itemHeight >= scrollTop + clientHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-nav-page {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
  font-size: 28px;
}
header {
  background-color: #eee;
}
main {
  flex-grow: 1;
  display: flex;
  align-items: stretch;
  overflow: hidden;
}
aside {
  position: relative;
  flex-shrink: 0;
  width: 172px;
  background-color: #eee;
  color: #999;
  .tab-clone {
    position: absolute;
    z-index: 1;
    left: 0;
    height: 118px;
    width: 100%;
    line-height: 118px;
    text-align: center;
    color: #333;
    background-color: #fff;
    pointer-events: none;
    &.top {
      top: 0;
    }
    &.bottom {
      bottom: 0;
    }
  }
  > ul {
    height: 100%;
    overflow-y: auto;
    > li {
      border-bottom: 2px solid #e1e1e1;
      height: 118px;
      line-height: 118px;
      text-align: center;
      &:last-of-type {
        border-bottom: 0;
      }
      &.action {
        color: #333;
        background-color: #fff;
      }
    }
  }
}
section {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .go {
    display: block;
    padding: 40px 20px;
  }
  .go-btn {
    width: 100%;
    height: 70px;
    line-height: 70px;
    border-radius: 0;
    font-size: 24px;
  }
  .items {
    padding: 20px;
  }
  .items-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > li {
      padding: 10px 0;
      width: percentage(1/3);
    }
  }
  .title {
    padding-bottom: 30px;
    line-height: 28px;
    font-size: 28px;
    color: #999;
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 196px;
    line-height: 62px;
    background-repeat: no-repeat;
    background-position: center top;
    background-size: 134px 134px;
    font-size: 28px;
    color: #5d5d5d;
  }
}
</style>

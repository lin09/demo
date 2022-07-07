<template>
  <header>
    <div v-if="$router.options.routes.length > 1" class="goback" @click="$router.back()">
      <ArrowLeftIcon class="goback-icon"/>
    </div>
    {{ title }}
  </header>
</template>

<script>
import ArrowLeftIcon from '@/components/icons/ArrowLeft'

export default {
  name: 'TitleHeader',
  components: { ArrowLeftIcon },
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid #c8c8c8;
  height: 89px;
  background-color: #f7f7f7;
  font-size: 34px;

  .goback {
    position: absolute;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 89px;
    height: 89px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  .goback-icon {
    width: 20px;
    color: #666;
  }
}
</style>


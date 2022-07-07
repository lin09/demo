<template>
  <div id="app">
    <h1 class="title">影视</h1>

    <form class="form" @submit.prevent="handleSubmit">
      <input type="text" v-model="wd" placeholder="请输入影视名">
      <button type="submit">搜索</button>
      <div v-show="loading" class="loading"></div>
    </form>

    <div v-if="errorMsg" class="errorMsg">{{ errorMsg }}</div>

    <div class="result">
      <div class="list-item" v-for="(item, index) in list.data" :key="index">
        <div class="vod-info">
          <div class="vod-banner"><img :src="item.vod_pic"></div>
          <div class="vod-content">
            <div class="vod-name">{{ item.vod_name }}</div>
            <div class="vod-info-item">
              <span class="vod-info-item-name">导演：</span><span>{{ item.vod_director }}</span>
            </div>
            <div class="vod-info-item">
              <span class="vod-info-item-name">主演：</span><span>{{ item.vod_actor }}</span>
            </div>
            <div class="vod-info-item">
              <span class="vod-info-item-name">地区：</span><span>{{ item.vod_area }}</span>
            </div>
            <div class="vod-info-item">
              <span class="vod-info-item-name">上映：</span><span>{{ item.vod_year }}</span>
            </div>
            <div class="vod-info-item">
              <span class="vod-info-item-name">类型：</span><span>{{ item.list_name }}</span>
            </div>
            <div class="vod-info-item">
              <span class="vod-info-item-name">剧情介绍：</span><span>{{ item.vod_content }}</span>
            </div>
          </div>
        </div>
        <h3>播放</h3>
        <div class="vod-urls">
          <a class="vod-url" v-for="(urlInfo, index) in item.urls" :key="index" :href="urlInfo[1]" target="_blank">{{ urlInfo[0] }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import adaptive from '@lin09/adaptivejs'

adaptive.run()

export default {
  name: 'app',
  data () {
    return {
      wd: '',
      errorMsg: '',
      list: {},
      loading: false
    }
  },
  watch: {
    wd () {
      this.errorMsg = ''
    }
  },
  methods: {
    handleSubmit () {
      if (this.loading) return
      if (this.wd === "") {
        this.errorMsg = "请输入影视名"
        return
      }

      this.errorMsg = ''
      this.list = []
      this.loading = true

      axios.get('/vodname/' + this.wd)
        .then(res => {
          res.data.data.forEach(item => {
            item.urls = item.vod_url.replace(/(^[\r\n\S]+m3u8\${3})|(\${3}[\r\n\S]+m3u8$)/, '')
            item.urls = item.urls.split(/\r\n/).map(urlInfo => urlInfo.split('$'))
          })
          this.list = res.data
        })
        .catch(error => this.errorMsg = error)
        .finally(() => this.loading = false)
    }
  }
}
</script>

<style>
@keyframes turn
{
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

* {
  margin: 0;
}
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  margin: auto;
  text-align: center;
}
img {
  width: 100%;
}
input {
  flex-grow: 1;
  border: 0;
  border-right: 1px solid rgba(0,0,0,.2);
  padding: 0 10px;
  font-size: 16px;
}
button {
  border: 0;
  padding: 0 20px;
  background: none;
  font-size: 16px;
}
.title {
  margin: 20px;
}
.form {
  position: relative;
  display: flex;
  width: 400px;
  margin: 0 auto 20px;
  height: 56px;
  box-shadow: 0 0 6px rgba(0,0,0,.4);
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.4);
}
.loading::before {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  margin: auto;
  width: 24px;
  height: 24px;
  border: 3px outset rgba(255,255,255,.8);
  border-radius: 50%;
  animation: turn 1s linear infinite;
}
.result {
  padding: 10px;
}
.list-item {
  margin-bottom: 20px;
  padding: 20px;
  text-align: left;
  box-shadow: 0px 0px 8px rgba(0,0,0,.3);
}
.vod-info {
  display: flex;
  margin-bottom: 20px;
}
.vod-content {
  font-size: 14px;
}
.vod-name {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}
.vod-info-item {
  display: flex;
  margin-bottom: 10px;
}
.vod-info-item-name {
  flex-shrink: 0;
}
.vod-banner {
  flex-shrink: 0;
  margin-right: 20px;
  width: 230px;
}
.vod-urls {
  display: flex;
  flex-wrap: wrap;
}
.vod-url {
  margin: 3px;
  padding: 7px;
}
</style>

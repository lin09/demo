<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/library'

const videoRef = ref() as any
const videoInputDevices = ref()
const selectedDeviceId = ref('')
const resValue = ref('')
const errs = ref<(string | Event)[]>([])

const codeReader = new BrowserMultiFormatReader()

codeReader.listVideoInputDevices()
  .then((devices) => {
    videoInputDevices.value = devices
    if (devices.length) {
      const device = devices.find(item => /back|0/.test(item.label)) || devices[devices.length - 1]
      selectedDeviceId.value = device.deviceId
    } else {
      alert('加载摄像头错误')
    }
  })
  .catch((err) => {
    errs.value = ['加载' + err]
  })

const result = () => {
  codeReader.reset()
  errs.value = []
}

const scanCode = () => {
  codeReader.decodeFromVideoDevice(selectedDeviceId.value, videoRef.value, (result, err) => {
    if (result) {
      resValue.value = result.getText()
    }
    if (err) {
      errs.value.push(err.message)
    }
  })
}

const changeFront = () => {
  result()
  scanCode()
}
</script>

<template>
  <p>
    <button @click="scanCode">扫码</button>
    <span style="margin: 8px;"></span>
    <button @click="result">关闭</button>
  </p>
  <p>{{ resValue }}</p>

  <div class="media">
    <div>
      <video ref="videoRef" width="300" height="200" style="border: 1px solid gray"></video>
    </div>
    <p>
      <button @click="changeFront">切换摄像头</button>
    </p>
  </div>
  <!-- <p v-for="(item, index) in videoInputDevices" :key="index">{{ item }}</p> -->
  <div class="err">
    <p v-for="(item, index) in errs" :key="index">{{ item }}</p>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

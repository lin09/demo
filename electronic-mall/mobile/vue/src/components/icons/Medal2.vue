<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 92 43" fill="#c99d6a" font-size="25">
    <path d="M0 0 V 24 A 10 10, 0, 0, 0, 7 31 L 46 43 L 85 31 A 10 10, 0, 0, 0, 92 24 V 0"/>
    <text x="46" y="20" fill="#fff" text-anchor="middle" dominant-baseline="middle">{{ text }}</text>
  </svg>
</template>

<script>
export default {
  name: 'MedalIcon2',
  props: {
    text: String
  }
}
</script>


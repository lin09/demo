<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 63 50" font-size="18">
    <path d="M0 50 V 0 H 63 V 30" fill="#575151"/>
    <path d="M63 50 V 0 H 0 V 30" fill="#3e3632"/>
    <text x="31.5" y="15" fill="#f3e4d1" text-anchor="middle" dominant-baseline="middle">{{ text }}</text>
  </svg>
</template>

<script>
export default {
  name: 'Medal1',
  props: {
    text: String
  }
}
</script>
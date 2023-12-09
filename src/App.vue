<script setup>
import '@vant/touch-emulator';

import UserProfile from './components/UserProfile/index.vue';
</script>

<template>
  <UserProfile />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--font-color);
  background-color: #0c1f2c;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  --bg-color: #0c1f2c;
  --bg-color2: #1d2e3c;
  --main-color: #0d6e6e;
  --main-color2: #4a9d9c;
  --font-color1: #ffe0c8;
  --font-color2: #e0e0e0;
}

body {
  margin: 0;
}
</style>

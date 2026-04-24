<template>
  <div id="app-root">
    <Header />
    <router-view />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
</script>

<style lang="scss">
#app-root {
  padding-top: 64px;
  position: relative;
  z-index: 1;
}
</style>

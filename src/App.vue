<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Header />
  <RouterView class="full-height" />
  <Footer />
</template>

<style scoped lang="scss">
.full-height {
  box-sizing: border-box;
  min-height: calc(100vh - #{$height-header} - #{$height-footer});
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

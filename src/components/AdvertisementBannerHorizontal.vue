<template>
  <div class="advertisement-banner-horizontal">
    <a :href="companyUrl" target="_blank">
      <img :src="getImageUrl('../assets/banner-black.png')" alt="company logo" class="dark" />
      <img :src="getImageUrl('../assets/banner-white.png')" alt="company logo" class="light" />
    </a>
  </div>
</template>

<script setup>
import getImageUrl from '@/helpers/getImageUrl'

const companyUrl = import.meta.env.VITE_COMPANY_URL
</script>

<style lang="scss" scoped>
.advertisement-banner-horizontal {
  width: 100%;

  a {
    display: block;

    img {
      border-radius: 5px;
      width: 100%;
    }
  }
}
</style>

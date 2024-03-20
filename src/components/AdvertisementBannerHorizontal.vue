<template>
  <div class="advertisement-banner-horizontal">
    <a :href="companyUrl" target="_blank">
      <img :src="secondary ? bannerSecondary : bannerBlack" alt="company logo" class="dark" />
      <img :src="secondary ? bannerSecondary : bannerWhite" alt="company logo" class="light" />
    </a>
  </div>
</template>

<script setup>
import bannerBlack from '@/assets/banner-black.png'
import bannerWhite from '@/assets/banner-white.png'
import bannerSecondary from '@/assets/banner-2.png'

const companyUrl = import.meta.env.VITE_COMPANY_URL

defineProps({
  secondary: {
    type: Boolean,
    default: false
  }
})
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

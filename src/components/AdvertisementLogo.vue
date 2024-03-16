<template>
  <div class="advertisement-logo">
    <a :href="companyUrl" target="_blank">
      <img
        :src="getImageUrl('../assets/logo-slogan-black.png')"
        alt="company logo"
        class="light"
        width="120px"
      />
      <img
        :src="getImageUrl('../assets/logo-slogan-white.png')"
        alt="company logo"
        class="dark"
        width="120px"
      />
    </a>
  </div>
</template>

<script setup>
import getImageUrl from '@/helpers/getImageUrl'

const companyUrl = import.meta.env.VITE_COMPANY_URL
</script>

<style lang="scss" scoped>
.advertisement-logo {
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

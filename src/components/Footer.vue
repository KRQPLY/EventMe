<template>
  <div class="footer">
    <div class="content">
      © 2023 <span class="logo">evento</span>. All rights reserved. Powered by
    </div>
    <a :href="companyUrl" target="_blank">
      <img src="../assets/logo-black.png" alt="company logo" class="light" width="120px" />
      <img src="../assets/logo-white.png" alt="company logo" class="dark" width="120px" />
    </a>
  </div>
</template>

<script setup>
const companyUrl = import.meta.env.VITE_COMPANY_URL
</script>

<style lang="scss" scoped>
.footer {
  box-sizing: border-box;
  height: $height-footer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: $color-main;
  font-size: 8px;

  .content {
    color: $color-contrast;
  }

  .logo {
    font-family: 'Vibur', sans-serif;
    font-size: 20px;
    font-weight: 300;
  }
}

@include media-xs {
  .footer {
    font-size: 12px;
  }
}
</style>

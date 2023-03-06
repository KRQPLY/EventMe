<template>
  <div class="footer">
    <div class="content">© 2023 <span class="logo">EventMe</span>. All rights reserved.</div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
  box-sizing: border-box;
  height: $height-footer;
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: $color-main;
  font-size: 8px;
  .content {
    color: $color-contrast;
  }
  .logo {
    font-weight: 300;
  }
}

@include media-xs {
  .footer {
    justify-content: flex-start;
    font-size: 12px;
  }
}
</style>

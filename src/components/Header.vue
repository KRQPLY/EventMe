<template>
  <div class="header">
    <div class="title">EventMe</div>
    <div class="right">
      <Menu class="screen"/>
      <Search />
      <Icon width="32px" img="burger.svg" clickable class="mobile" />
    </div>
  </div>
</template>
<script setup>
import Icon from '@/components/Icon.vue'
import Search from './Search.vue'
import Menu from './Menu.vue'
</script>

<style lang="scss" scoped>
.header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $color-black;
}
.title {
  color: $color-white;
  font-size: 25px;
}
.right {
  display: flex;
  gap: 10px;
}
</style>

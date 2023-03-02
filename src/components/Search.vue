<template>
  <div class="search">
    <input type="text" placeholder="Search" />
    <Button><Icon img="search.png" width="16px" /></Button>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'
import Button from './Button.vue'
</script>

<style scoped lang="scss">
.search {
  padding: 5px;
  width: fit-content;
  background: $color-white;
  display: flex;
  border: 1px solid $color-cadet-blue;
  border-radius: 2px;
  &:focus-within {
    outline: 1px solid $color-java;
  }
}
input {
  border: none;
  outline: none;
  font-weight: 500;
}
</style>

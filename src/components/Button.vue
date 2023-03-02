<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script setup>
import { toRef } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#fff'
  }
})

const buttonColor = toRef(props, 'color')
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: v-bind(buttonColor);
  border: none;
}
</style>

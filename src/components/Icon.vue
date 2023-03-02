<template>
  <img class="icon" :src="imageUrl" alt="icon" :class="{ clickable: clickable }" />
</template>

<script setup>
const props = defineProps({
  img: {
    type: String,
    required: true
  },
  width: {
    type: String,
    required: true
  },
  clickable: {
    type: Boolean
  }
})

const imageUrl = new URL(`../assets/${props.img}`, import.meta.url).href
</script>

<style lang="scss" scoped>
.icon {
  width: v-bind(width);

  &.clickable {
    cursor: pointer;
  }
}
</style>

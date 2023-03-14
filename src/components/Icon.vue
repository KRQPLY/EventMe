<template>
  <img class="icon" :src="getImageUrl(img)" alt="icon" :class="{ clickable: clickable }" />
</template>

<script setup>
import getImageUrl from '@/helpers/getImageUrl'

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
</script>

<style lang="scss" scoped>
.icon {
  width: v-bind(width);

  &.clickable {
    cursor: pointer;
  }
}
</style>

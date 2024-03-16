<template>
  <div class="advertisement-card">
    <div class="container-top">
      <div class="title">{{ title }}</div>
      <div class="description">{{ description }}</div>
    </div>
    <div class="container-bottom">
      <div class="price">{{ price }}</div>
      <Button @click="$emit('selected', option)" filled>Choose</Button>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'

defineProps({
  option: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.advertisement-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  gap: 20px;
  background-color: $color-secondary;

  .title {
    text-align: center;
    font-size: 32px;
  }

  .description {
    text-align: center;
    padding: 0 10px;
  }

  .container-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;

    .price {
      font-size: 20px;
      text-align: center;
      margin-bottom: 10px;
    }
  }
}
</style>

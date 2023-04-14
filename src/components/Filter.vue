<template>
  <div class="filter">
    <input type="text" placeholder="Filter" v-model="value" @change="updateValue" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emits = defineEmits(['filter'])

const value = ref('')

const updateValue = () => {
  emits('filter', value.value)
}
</script>

<style lang="scss" scoped>
.filter {
  input {
    font-size: 16px;
    background: $color-secondary;
    padding: 10px 15px;
    width: 80px;
    border: none;
    border-radius: 20%/50%;
    outline: none;
    color: $color-contrast;
    font-weight: 300;

    &:focus {
      outline: none;
      border: none;
      color: $color-accent;
    }
  }
}
@include media-xs {
  .filter {
    input {
      width: 170px;
      border-radius: 10%/50%;
    }
  }
}
</style>

<template>
  <div class="select-container" :class="{ open: isOptionsVisible }">
    <div class="select" @click="isOptionsVisible = !isOptionsVisible">
      {{ value ? value : 'Sort by' }}
    </div>
    <div class="options-container" v-if="isOptionsVisible">
      <div class="options">
        <div
          class="option"
          :class="{ active: value === option }"
          @click="handleSelect(option)"
          v-for="option in options"
        >
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emits = defineEmits(['sort'])

const isOptionsVisible = ref(false)
const value = ref('')
const options = ['soonest', 'popularity']

function handleSelect(option) {
  value.value = option
  isOptionsVisible.value = !isOptionsVisible.value
  emits('sort', option)
}
</script>

<style lang="scss" scoped>
.select-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: $color-secondary;
  border-radius: 20%/50%;
  color: $color-contrast;
  .select {
    width: 80px;
    padding: 10px 15px;
  }
  .options-container {
    position: absolute;
    width: 100%;
    top: 35px;
    padding-top: 5px;
    background-color: $color-secondary;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .options {
      .option {
        padding: 10px 15px;
        border-top: 1px solid $color-main;
        font-size: 14px;
        &.active {
          color: $color-accent;
        }
      }
    }
  }
  &.open {
    border-radius: 10px;
  }
}

@include media-xs {
  .select-container {
    border-radius: 10%/50%;
    .select {
      width: 200px;
    }
  }
}
</style>

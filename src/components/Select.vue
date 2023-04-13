<template>
  <div class="select-container" :class="{ open: isOptionsVisible }">
    <div class="select" @click="isOptionsVisible = !isOptionsVisible">
      {{ value ? value : label }}
      <IconArrowDown />
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
import IconArrowDown from './IconArrowDown.vue'

const props = defineProps({
  options: {
    type: Array
  },
  label: {
    type: String
  },
  defaultOption: {
    type: String
  }
})

const emits = defineEmits(['select'])

const isOptionsVisible = ref(false)
const value = ref(props.defaultOption || '')

function handleSelect(option) {
  value.value = option
  isOptionsVisible.value = !isOptionsVisible.value
  emits('select', option)
}
</script>

<style lang="scss" scoped>
.select-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background-color: $color-secondary;
  border-radius: 20%/50%;
  color: $color-contrast;
  font-weight: 300;
  .select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95px;
    padding: 10px 10px 10px 15px;
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
      padding: 10px 15px;
      width: 170px;
    }
  }
}
</style>

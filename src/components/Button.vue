<template>
  <button class="button" :class="{ filled: filled, desktop: desktop }">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  filled: {
    type: Boolean,
    default: false
  },
  desktop: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background: none;
  border: none;
  border-radius: 2px;
  font-weight: 300;
  color: $color-contrast;
  &.filled {
    background: $color-accent;
    color: #fff;
  }
  &.desktop {
    display: none;
  }
}

@include media-xs {
  .button {
    &.desktop {
      display: flex;
    }
  }
}
</style>

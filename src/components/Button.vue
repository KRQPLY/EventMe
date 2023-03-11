<template>
  <button class="button" :class="{ filled, desktop, mobile }" :style="{ color: color }">
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
  },
  mobile: {
    type: Boolean,
    default: false
  },
  color: String
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
    &:focus-visible {
      box-shadow: 0 0 1px 2px rgba($color-accent, 0.6);
    }
  }
  &.desktop {
    display: none;
  }
  &:focus {
    outline: none;
  }
}

@include media-xs {
  .button {
    &.desktop {
      display: flex;
    }
    &.mobile {
      display: none;
    }
  }
}
</style>

<template>
  <button
    class="button"
    :class="{ filled, desktop, mobile, danger, checked }"
    :style="{ color: color, 'border-radius': radius }"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  filled: {
    type: Boolean,
    default: false
  },
  radius: {
    type: String,
    default: '25% / 50%'
  },
  danger: {
    type: Boolean,
    default: false
  },
  checked: {
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
  font-weight: 300;
  color: $color-contrast;
  &.filled {
    background: $color-accent;
    color: #fff;
    &:focus-visible {
      box-shadow: 0 0 1px 2px rgba($color-accent, 0.6);
    }
  }
  &.danger {
    background-color: $color-danger;
  }
  &.checked {
    background-color: $color-silver;
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

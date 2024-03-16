<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" v-if="isModalVisible">
      <div class="modal" ref="modal">
        <header class="modal-header" v-if="!isHeaderHidden">
          <slot name="header">{{ title }}</slot>
        </header>

        <section class="modal-body">
          <slot name="body"></slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, toRef } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  isHeaderHidden: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['close'])

const modal = ref(null)
const isModalVisible = toRef(props, 'visible')

onClickOutside(modal, () => emits('close'))
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0000004d;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $color-contrast;
  z-index: 1100;
}

.modal {
  position: relative;
  background: $color-secondary;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  z-index: 1150;
}

.modal-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $color-main;
  padding: 15px;
}

.modal-body {
  position: relative;
  display: flex;
  justify-content: space-between;
  max-height: 300px;
  overflow-x: auto;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>

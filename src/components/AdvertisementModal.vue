<template>
  <Modal :visible="visibile" @close="$emit('close')" is-header-hidden>
    <template v-slot:body>
      <AdvertisementBannerVertical />
    </template>
  </Modal>
</template>

<script setup>
import AdvertisementBannerVertical from '@/components/AdvertisementBannerVertical.vue'
import Modal from '@/components/Modal.vue'

defineProps({
  visibile: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
:deep(.modal) {
  background-color: transparent;
  width: 70%;

  @include media-sm {
    width: 70vh;
  }

  .modal-body {
    max-height: none;
  }
}
</style>

<template>
  <div class="edit-event-container">
    <EventForm :event-id="id" />
  </div>
</template>

<script setup>
import EventForm from '@/components/EventForm.vue'

defineProps({
  id: Number
})
</script>

<style lang="scss" scoped>
.edit-event-container {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  background-color: $color-secondary;
}
@include media-xs {
  .edit-event-container {
    padding: 40px 0;
  }
}
</style>

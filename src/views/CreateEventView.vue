<template>
  <div class="create-event-container">
    <EventForm />
  </div>
</template>

<script setup>
import EventForm from '@/components/EventForm.vue'
</script>

<style lang="scss" scoped>
.create-event-container {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  background-color: $color-secondary;
}
@include media-xs {
  .create-event-container {
    padding: 40px 0;
  }
}
</style>

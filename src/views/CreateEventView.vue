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
  background-color: $color-main;
  background-image: repeating-linear-gradient(
      45deg,
      $color-secondary 25%,
      transparent 25%,
      transparent 75%,
      $color-secondary 75%,
      $color-secondary
    ),
    repeating-linear-gradient(
      45deg,
      $color-secondary 25%,
      $color-main 25%,
      $color-main 75%,
      $color-secondary 75%,
      $color-secondary
    );
  background-position: 0 0, 10px 10px;
  background-size: 20px 20px;
}
@include media-xs {
  .create-event-container {
    padding: 40px 0;
  }
}
</style>

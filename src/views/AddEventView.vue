<template>
  <div class="add-event-container">
    <AddEventForm />
  </div>
</template>

<script setup>
import AddEventForm from '@/components/AddEventForm.vue'
</script>

<style lang="scss" scoped>
.add-event-container {
  padding: 10px 0;
  background-color: $color-secondary;
  display: flex;
  justify-content: center;
}
@include media-xs {
  .add-event-container {
    padding: 40px 0;
  }
}
</style>

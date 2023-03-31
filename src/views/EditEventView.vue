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
  background-color: $color-main;
  background-image: linear-gradient(135deg, $color-secondary 25%, transparent 25%),
    linear-gradient(225deg, $color-secondary 25%, transparent 25%),
    linear-gradient(45deg, $color-secondary 25%, transparent 25%),
    linear-gradient(315deg, $color-secondary 25%, $color-main 25%);
  background-position: 10px 0, 10px 0, 0 0, 0 0;
  background-size: 20px 20px;
  background-repeat: repeat;
}
@include media-xs {
  .edit-event-container {
    padding: 40px 0;
  }
}
</style>

<template>
  <div class="edit-event-container">
    <EventForm
      :event-id="id"
      :name="event.name"
      :category="event.category"
      :image-url="event.imageUrl"
      :marker="event.marker"
      :start-date="event.startDate"
      :end-date="event.endDate"
      :max-participants-number="event.maxParticipantsNumber"
      :description="event.description"
      v-if="event"
    />
  </div>
</template>

<script setup>
import EventForm from '@/components/EventForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import getData from '@/helpers/getData'

const props = defineProps({
  id: Number
})

const event = ref(null)
const router = useRouter()

getEvent()

async function getEvent() {
  const response = await getData(`${import.meta.env.VITE_API_URL}/events/${props.id}`, true)

  if (!response) {
    router.push({ name: 'findEvents' })
    return
  }

  event.value = response
}
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

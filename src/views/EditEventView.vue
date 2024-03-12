<template>
  <div class="edit-event-container">
    <EventForm
      :event-id="event.id"
      :name="event.name"
      :categories="event.categories"
      :image-url="event.imageUrl"
      :marker="[event.latitude, event.longitude]"
      :start-date="event.startDate"
      :end-date="event.endDate"
      :max-participants-number="event.habitantes"
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
  name: String
})

const event = ref(null)
const router = useRouter()

getEvent()

async function getEvent() {
  const response = await getData(`${import.meta.env.VITE_API_URL}/object?name=${props.name}`)

  if (!response || !response.length) {
    router.push({ name: 'findEvents' })

    return
  }

  event.value = response[0]
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

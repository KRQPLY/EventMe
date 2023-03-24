<template>
  <div class="event-container">
    <EventDetails
      :description="event.description"
      :name="event.name"
      :author="event.author"
      :date="event.date"
      :image-url="event.imageUrl"
      :marker="event.marker"
      v-if="event"
    />
  </div>
</template>

<script setup>
import EventDetails from '../components/EventDetails.vue'
import { ref } from 'vue'
import getData from '@/helpers/getData'

const props = defineProps({
  id: String
})

const event = ref(null)

getEvent()

async function getEvent() {
  const response = await getData(`${import.meta.env.VITE_API_URL}/events/${props.id}`)

  if (response) {
    event.value = response
  }
}
</script>

<style lang="scss" scoped>
.event-container {
  padding: 0 10px;
}
@include media-xs {
  .event-container {
    padding: 0 30px;
  }
}
@include media-sm {
  .event-container {
    padding: 0 70px;
  }
}
@include media-md {
  .event-container {
    padding: 0 150px;
  }
}
@include media-lg {
  .event-container {
    padding: 0 250px;
  }
}
@include media-xl {
  .event-container {
    padding: 0 350px;
  }
}
@include media-hd {
  .event-container {
    padding: 0 450px;
  }
}
</style>

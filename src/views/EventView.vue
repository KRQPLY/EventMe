<template>
  <div class="event-container">
    <EventDetails
      :event-id="event.id"
      :name="event.name"
      :participants-number="event.habitantes"
      :start-date="event.startDate"
      :end-date="event.endDate"
      :image-url="event.imageUrl"
      :marker="[event.latitude, event.longitude]"
      v-if="event"
    />
  </div>
</template>

<script setup>
import EventDetails from '@/components/EventDetails.vue'
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

  if (response && response.length) {
    event.value = response[0]
  } else {
    router.push({ name: 'findEvents' })
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

<template>
  <div class="event-container">
    <EventDetails
      :description="event.description"
      :name="event.name"
      :author="event.author"
      :date="event.date"
      :image-url="event.imageUrl"
    />
  </div>
</template>

<script setup>
import EventDetails from '../components/EventDetails.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import getData from '@/utils/getData'

const props = defineProps({
  id: String
})

const userStore = useUserStore()
const event = ref({})

if (!userStore.uid) {
  userStore.redirect('signin', { redirect: 'event', redirectId: props.id })
}
if (!props.id) {
  userStore.redirect('findEvents')
}

getEvent()

async function getEvent() {
  const response = await getData(`http://localhost:3000/events/${props.id}`)

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

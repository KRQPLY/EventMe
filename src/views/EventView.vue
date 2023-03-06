<template>
  <div class="event-container">
    <EventDetails :description="event.description" :name="event.name" :image-url="event.imageUrl" />
  </div>
</template>

<script setup>
import EventDetails from '../components/EventDetails.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import getData from '@/utils/getData'
import { ref } from 'vue'

const props = defineProps({
  id: String
})

const userStore = useUserStore()
const router = useRouter()
const event = ref({})

if (!userStore.uid) {
  router.push({ name: 'signin' })
}
if (!props.id) {
  router.push({ name: 'findEvents' })
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
  display: flex;
  flex-direction: column;
  padding: 10px;
}
@include media-xs {
  .event-container {
    padding: 10px 30px;
  }
}
@include media-sm {
  .event-container {
    padding: 10px 70px;
  }
}
@include media-md {
  .event-container {
    padding: 10px 150px;
  }
}
@include media-lg {
  .event-container {
    padding: 10px 250px;
  }
}
@include media-xl {
  .event-container {
    padding: 10px 350px;
  }
}
@include media-hd {
  .event-container {
    padding: 10px 450px;
  }
}
</style>

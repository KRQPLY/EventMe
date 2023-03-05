<template>
  <div class="my-events-container">
    <Hero type="myEvents" />
    <CardsContainer>
      <EventCard
        v-for="event in events"
        :id="event.id"
        :author="event.author"
        :image-url="event.imageUrl"
        :participants-number="event.participantsNumber"
      />
    </CardsContainer>
  </div>
</template>

<script setup>
import Hero from '@/components/Hero.vue'
import EventCard from '../components/EventCard.vue'
import CardsContainer from '@/components/CardsContainer.vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { ref, onBeforeMount } from 'vue'
import getData from '@/utils/getData'

const userStore = useUserStore()
const router = useRouter()
const events = ref([])

getEvents()

onBeforeMount(() => {
  if (!userStore.uid) {
    router.push({ name: 'signin' })
  }
})

async function getEvents() {
  const response = await getData('http://localhost:3000/usersEvents')

  if (response.length) {
    events.value = response
  }
}
</script>

<style lang="scss" scoped></style>

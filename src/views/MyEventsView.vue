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
import { ref } from 'vue'
import getData from '@/helpers/getData'

const events = ref([])

getEvents()

async function getEvents() {
  const response = await getData(`${import.meta.env.VITE_API_URL}usersEvents`)

  if (response.length) {
    events.value = response
  }
}
</script>

<style lang="scss" scoped></style>

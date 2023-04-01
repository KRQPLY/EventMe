<template>
  <div class="my-events-container">
    <Hero type="myEvents" />
    <ControlsContainer>
      <Search @search="getEvents" />
    </ControlsContainer>
    <CardsContainer class="cards-container">
      <EventCard
        v-for="event in events"
        :id="event.id"
        :name="event.name"
        :image-url="event.imageUrl"
        :participants-number="event.participantsNumber"
      />
    </CardsContainer>
  </div>
</template>

<script setup>
import Hero from '@/components/Hero.vue'
import ControlsContainer from '@/components/ControlsContainer.vue'
import Search from '../components/Search.vue'
import EventCard from '../components/EventCard.vue'
import CardsContainer from '@/components/CardsContainer.vue'
import { ref } from 'vue'
import getData from '@/helpers/getData'

const events = ref([])
const searchValue = ref('')

getEvents()

async function getEvents() {
  const response = await getData(`${import.meta.env.VITE_API_URL}/user-events`)

  if (response.length) {
    events.value = response
  }
}
</script>

<style lang="scss" scoped>
.my-events-container {
  .cards-container {
    margin-top: 15px;
  }
}
</style>

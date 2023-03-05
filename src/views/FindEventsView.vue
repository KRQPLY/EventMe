<template>
  <div class="find-events-container">
    <Hero type="findEvents" />
    <Search v-model:value="value" @search="handleSearch" />
    <CardsContainer>
      <!-- <EventCard
        v-for="event in events"
        :id="event.id"
        :author="event.author"
        :image-url="event.imageUrl"
        :participants-number="event.participantsNumber"
      /> -->
    </CardsContainer>
  </div>
</template>

<script setup>
import Search from '@/components/Search.vue'
import Hero from '@/components/Hero.vue'
import EventCard from '../components/EventCard.vue'
import CardsContainer from '@/components/CardsContainer.vue'
import { ref } from 'vue'
import getData from '@/utils/getData'

const value = ref('')
const events = ref([])

getEvents()

function handleSearch() {
  console.log(value.value)
}

async function getEvents() {
  const response = await getData('http://localhost:3000/events')

  if (response.length) {
    events.value = response
  }
}
</script>

<style scoped lang="scss">
.find-events-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: $color-main;
}
</style>

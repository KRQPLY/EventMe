<template>
  <div class="my-events-container">
    <Hero type="myEvents" />
    <ControlsContainer>
      <Search v-model:value="searchValue" @search="getEvents" />
      <template v-slot:row-first>
        <Button filled>Todo</Button>
      </template>
    </ControlsContainer>
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
import Button from '../components/Button.vue'
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

<style lang="scss" scoped></style>

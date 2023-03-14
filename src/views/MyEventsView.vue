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
import { ref } from 'vue'
import getData from '@/helpers/getData'

const userStore = useUserStore()
const events = ref([])

if (!userStore.uid) {
  userStore.redirect('signin', { redirect: 'myEvents' })
}

getEvents()

async function getEvents() {
  const response = await getData('http://localhost:3000/usersEvents')

  if (response.length) {
    events.value = response
  }
}
</script>

<style lang="scss" scoped></style>

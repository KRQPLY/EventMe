<template>
  <div class="my-events-container">
    <Hero type="myEvents" />
    <ControlsContainer>
      <Search @search="handleSearch" />
      <template v-slot:row>
        <Select @select="handleSelect" :options="['joined', 'invites']" default-option="joined" />
      </template>
    </ControlsContainer>
    <CardsContainer class="cards-container">
      <EventCard
        v-for="event in eventsFiltered"
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
import Select from '@/components/Select.vue'
import { ref, computed } from 'vue'
import getData from '@/helpers/getData'

const events = ref([])
const search = ref('')

const eventsFiltered = computed(() =>
  events.value.filter((event) => event.name.toLowerCase().includes(search.value.toLowerCase()))
)

getEvents()

async function getEvents() {
  const response = await getData(`${import.meta.env.VITE_API_URL}/user-events`, true)

  if (response) {
    events.value = response
  }
}

async function getInvitations() {
  const response = await getData(`${import.meta.env.VITE_API_URL}/event-invite`, true)

  if (response) {
    events.value = response
  }
}

function handleSearch(searchVal) {
  search.value = searchVal
}

function handleSelect(option) {
  if (option === 'joined') {
    getEvents()
  } else if (option === 'invites') {
    getInvitations()
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

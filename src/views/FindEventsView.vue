<template>
  <div class="find-events-container">
    <Hero type="findEvents" />
    <ControlsContainer>
      <Search @search="handleSearch" />
      <template v-slot:row>
        <Select
          @select="handleSortChange"
          :options="[...options]"
          @click="getLocation"
          label="Sort by"
        />
        <CreateEventButton />
      </template>
    </ControlsContainer>
    <CardsContainer v-if="isEventsLoaded">
      <EventCard
        v-for="event in filteredEvents"
        :id="event.id"
        :name="event.name"
        :image-url="event.imageUrl"
        :participants-number="event.habitantes"
      />
    </CardsContainer>
    <Spinner :scale="1" offset-y="70px" height="200px" v-else />
  </div>
</template>

<script setup>
import Search from '@/components/Search.vue'
import ControlsContainer from '@/components/ControlsContainer.vue'
import CreateEventButton from '@/components/CreateEventButton.vue'
import Hero from '@/components/Hero.vue'
import EventCard from '@/components/EventCard.vue'
import CardsContainer from '@/components/CardsContainer.vue'
import Spinner from '@/components/Spinner.vue'
import Select from '@/components/Select.vue'
import { computed, ref } from 'vue'
import getData from '@/helpers/getData'

const lat = ref('')
const lng = ref('')
const events = ref([])
const isEventsLoaded = ref(false)
const options = ref(new Set(['Default']))
const keyword = ref('')

const filteredEvents = computed(() =>
  events.value.filter((event) => event.name.toLowerCase().includes(keyword.value.toLowerCase()))
)

getEvents()
getLocation()

async function getEvents(path = 'objects') {
  isEventsLoaded.value = false

  const response = await getData(`${import.meta.env.VITE_API_URL}/${path}`)

  if (response) {
    events.value = response
  } else {
    events.value = []
  }

  isEventsLoaded.value = true
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      lat.value = location.coords.latitude
      lng.value = location.coords.longitude

      options.value.add('Closest')
    },
    () => {
      options.value.delete('Closest')
    }
  )
}

function handleSearch(searchVal) {
  keyword.value = searchVal
}

function handleSortChange(sortVal) {
  if (sortVal === 'Closest') {
    getEvents(`stats?latitude=${lat.value}&longitude=${lng.value}`)

    return
  }
  getEvents()
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

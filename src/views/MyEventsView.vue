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
        v-for="event in events"
        :id="event.id"
        :name="event.name"
        :image-url="event.imageUrl"
        :participants-number="event.participantsNumber"
      />
    </CardsContainer>
    <Pagination
      @page-change="handlePageChange"
      :results="results"
      v-model="page"
      v-if="events.length"
    />
  </div>
</template>

<script setup>
import Hero from '@/components/Hero.vue'
import ControlsContainer from '@/components/ControlsContainer.vue'
import Search from '@/components/Search.vue'
import EventCard from '@/components/EventCard.vue'
import CardsContainer from '@/components/CardsContainer.vue'
import Pagination from '@/components/Pagination.vue'
import Select from '@/components/Select.vue'
import { ref } from 'vue'
import getData from '@/helpers/getData'

const name = ref('')
const page = ref(1)
const events = ref([])
const results = ref(0)
const endpoint = ref('user-events')

getEvents()

async function getEvents() {
  const response = await getData(
    `${import.meta.env.VITE_API_URL}/${endpoint.value}?page=${page.value}&name=${name.value}`,
    true
  )

  if (response) {
    events.value = response.eventsList
    results.value = response.info.results
  } else {
    events.value = []
    results.value = 0
  }
}

function handleSearch(searchVal) {
  name.value = searchVal
  page.value = 1

  getEvents()
}

function handlePageChange(pageNum) {
  page.value = pageNum

  getEvents()
}

function handleSelect(option) {
  if (option === 'joined') {
    endpoint.value = 'user-events'
  } else if (option === 'invites') {
    endpoint.value = 'event-invite'
  }

  page.value = 1

  getEvents()
}
</script>

<style lang="scss" scoped>
.my-events-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>

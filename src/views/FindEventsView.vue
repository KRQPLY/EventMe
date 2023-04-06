<template>
  <div class="find-events-container">
    <Hero type="findEvents" />
    <ControlsContainer>
      <Search @search="handleSearch" />
      <template v-slot:row>
        <Filter @filter="handleFilterChange" />
        <Select @select="handleSortChange" :options="['soonest', 'popularity']" label="Sort by" />
      </template>
    </ControlsContainer>
    <CardsContainer>
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
import Search from '@/components/Search.vue'
import Filter from '@/components/Filter.vue'
import ControlsContainer from '@/components/ControlsContainer.vue'
import Hero from '@/components/Hero.vue'
import EventCard from '@/components/EventCard.vue'
import CardsContainer from '@/components/CardsContainer.vue'
import Pagination from '@/components/Pagination.vue'
import Select from '@/components/Select.vue'
import { ref } from 'vue'
import getData from '@/helpers/getData'

const name = ref('')
const page = ref(1)
const sort = ref('')
const filter = ref('')
const events = ref([])
const results = ref(0)

getEvents()

async function getEvents() {
  const response = await getData(
    `${import.meta.env.VITE_API_URL}/events?page=${page.value}&sort-by=${sort.value}&filter=${
      filter.value
    }&name=${name.value}`
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

function handleSortChange(sortVal) {
  sort.value = sortVal
  page.value = 1

  getEvents()
}

function handleFilterChange(filterVal) {
  filter.value = filterVal
  page.value = 1
  
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

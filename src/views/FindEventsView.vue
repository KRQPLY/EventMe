<template>
  <div class="find-events-container">
    <Hero type="findEvents" />
    <ControlsContainer>
      <Search @search="handleSearch" />
      <template v-slot:row>
        <Filter @filter="handleFilterChange" />
        <Select @sort="handleSortChange" />
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
    <Pagination @page-change="handlePageChange" :results="250" v-model="page" />
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

getEvents()

async function getEvents() {
  const response = await getData(
    `${import.meta.env.VITE_API_URL}/events?page=${page.value}&sort-by=${
      sort.value ? sort.value : null
    }&filter=${filter.value ? filter.value : null}&name=${name.value ? name.value : null}`
  )

  if (response.length) {
    events.value = response.eventsList
  }
}

function handleSearch(searchVal) {
  name.value = searchVal
  page.value = 1
  getEvents()
  console.log('search')
}

function handlePageChange(pageNum) {
  page.value = pageNum
  getEvents()
  console.log('page')
}

function handleSortChange(sortVal) {
  sort.value = sortVal
  page.value = 1
  getEvents()
  console.log('sort')
}

function handleFilterChange(filterVal) {
  filter.value = filterVal
  page.value = 1
  getEvents()
  console.log('filter')
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

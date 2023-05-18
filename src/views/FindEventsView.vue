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
    <CardsContainer v-if="isEventsLoaded">
      <EventCard
        v-for="event in events"
        :id="event.id"
        :name="event.name"
        :image-url="event.imageUrl"
        :participants-number="event.participantsNumber"
      />
    </CardsContainer>
    <Spinner :scale="1" offset-y="70px" height="200px" v-else />
    <Pagination
      @page-change="handlePageChange"
      :results="results"
      :currentPage="page"
      v-if="results > 20 && isEventsLoaded"
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
import Spinner from '@/components/Spinner.vue'
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
const isEventsLoaded = ref(false)

getEvents()

async function getEvents() {
  isEventsLoaded.value = false

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

  isEventsLoaded.value = true
}

function handleSearch(searchVal) {
  name.value = searchVal
  page.value = 1

  getEvents()
}

function handlePageChange(pageNum) {
  page.value = pageNum
  console.log(pageNum);

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

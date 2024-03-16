<template>
  <div class="find-events-container">
    <Hero type="findEvents" />
    <ControlsContainer>
      <Search @search="handleSearch" />
      <template v-slot:row>
        <Filter @filter="handleFilterChange" />
        <Select
          @select="handleSortChange"
          :options="[...options]"
          @click="getLocation"
          label="Sort by"
        />
      </template>
    </ControlsContainer>
    <CardsContainer v-if="isEventsLoaded">
      <EventCard
        v-for="event in selectedPremiumEvents"
        :id="event.id"
        :name="event.name"
        :image-url="event.imageUrl"
        is-sponsored
      />
      <EventCard
        v-for="event in selectedStandardEvents"
        :id="event.id"
        :name="event.name"
        :image-url="event.imageUrl"
        is-sponsored
      />
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
      :current-page="page"
      v-if="results > 20 && isEventsLoaded"
    />
    <AdvertisementBannerHorizontal />
  </div>
</template>

<script setup>
import AdvertisementBannerHorizontal from '../components/AdvertisementBannerHorizontal.vue'
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
import { useEventsStore } from '@/stores/useEventsStore'
import { storeToRefs } from 'pinia'
import getData from '@/helpers/getData'

const name = ref('')
const page = ref(1)
const sort = ref('')
const filter = ref('')
const lat = ref('')
const lng = ref('')
const events = ref([])
const results = ref(0)
const isEventsLoaded = ref(false)
const options = ref(new Set(['soonest', 'popularity']))

const eventsStore = useEventsStore()
const { selectedStandardEvents, selectedPremiumEvents } = storeToRefs(eventsStore)

getEvents()
getLocation()

async function getEvents() {
  isEventsLoaded.value = false

  const response = await getData(
    `${import.meta.env.VITE_API_URL}/events?page=${page.value}&sort-by=${sort.value}&filter=${
      filter.value
    }&name=${name.value}&lat=${lat.value}&lng=${lng.value}`
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

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      lat.value = location.coords.latitude
      lng.value = location.coords.longitude

      options.value.add('closest')
    },
    () => {
      options.value.delete('closest')
    }
  )
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
  page.value = 1
  sort.value = sortVal

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

  :deep(.advertisement-banner-horizontal) {
    margin: 50px 0;

    a {
      margin: 0 20px;

      @include media-sm {
        margin: 0 40px;
      }
    }
  }
}
</style>

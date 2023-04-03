<template>
  <div class="event-details">
    <div class="section">
      <div class="banner">
        <div class="name">
          {{ name }}
        </div>
        <Button
          filled
          :checked="isJoined"
          :radius="isJoined ? '25% / 50%' : '35% / 50%'"
          @click="handleJoin"
          >{{ isJoined ? 'Joined' : 'Join' }}</Button
        >
      </div>
    </div>
    <div class="section">
      <div class="banner">
        <div>
          <div class="label">start</div>
          <div class="date">{{ toDateTime(startDate) }} {{ toDateTime(startDate, true) }}</div>
        </div>
        <div v-if="endDate">
          <div class="label">end</div>
          <div class="date">{{ toDateTime(endDate) }} {{ toDateTime(endDate, true) }}</div>
        </div>
      </div>
    </div>
    <div class="img">
      <img :src="getImageUrl(imageUrl)" alt="image" />
    </div>
    <div class="section">
      <div class="description">
        {{ description }}
      </div>
      <div class="author">By: {{ author }}</div>
    </div>
    <div id="map"></div>
    <div class="section" v-if="maxParticipantsNumber">
      <div class="banner">
        <div class="label">max participants</div>
        <div class="label">{{ nFormatter(maxParticipantsNumber) }}</div>
      </div>
    </div>
    <div class="section" v-if="author === userStore.username">
      <div class="label">settings</div>
      <div class="settings">
        <Button
          filled
          radius="35% / 50%"
          @click="router.push({ name: 'editEvent', query: { id: eventId } })"
          >Edit</Button
        ><Button filled danger @click="handleDelete">Delete</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
import getImageUrl from '@/helpers/getImageUrl'
import toDateTime from '@/helpers/toDateTime'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import L from 'leaflet'
import 'leaflet-routing-machine'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import { onMounted, ref, computed, toRef } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import deleteData from '@/helpers/deleteData'
import postData from '@/helpers/postData'
import nFormatter from '@/helpers/nFormatter'

const props = defineProps({
  eventId: Number,
  description: String,
  name: String,
  author: String,
  maxParticipantsNumber: Number,
  startDate: Number,
  endDate: Number,
  participantsUsernames: Array,
  marker: {
    type: Array,
    default: [51.505, -0.09]
  },
  imageUrl: {
    type: String,
    default: '../assets/find-background-sm.jpg'
  }
})

const emits = defineEmits(['update'])

const userStore = useUserStore()
const router = useRouter()
const participants = toRef(props, 'participantsUsernames')
const map = ref(null)

const isJoined = computed(() => participants.value.includes(userStore.username))

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      initMap(location)
    },
    (error) => {
      initMap(false)
    }
  )
})

function handleDelete() {
  deleteData(`${import.meta.env.VITE_API_URL}/api/events/${props.eventId}`, true)
  router.push({ name: 'findEvents' })
}

async function handleJoin() {
  if (isJoined.value) {
    await deleteData(`${import.meta.env.VITE_API_URL}/api/user-events/${props.eventId}`, true)
  } else {
    await postData(`${import.meta.env.VITE_API_URL}/api/user-events`, { id: props.eventId })
  }
  emits('update')
}

function initMap(location) {
  const defaultView = location
    ? [location.coords.latitude, location.coords.longitude]
    : props.marker
  const waypoints = location
    ? [L.latLng(location.coords.latitude, location.coords.longitude), L.latLng(...props.marker)]
    : [L.latLng(...props.marker)]
  map.value = L.map('map').setView(defaultView, 13)
  L.tileLayer(
    `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${
      import.meta.env.VITE_GEOAPIFY_KEY
    }`,
    {
      maxZoom: 20,
      id: 'osm-bright'
    }
  ).addTo(map.value)
  L.Routing.control({
    waypoints,
    createMarker: function (i, start, n) {
      var marker = L.marker(start.latLng, {
        draggable: true,
        icon: L.icon({
          iconUrl: markerIconPng,
          iconAnchor: [15, 40]
        })
      })
      return marker
    }
  }).addTo(map.value)
}
</script>

<style lang="scss" scoped>
.event-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  color: $color-contrast;
  .section {
    padding: 10px;
    background-color: $color-secondary;
    border-radius: 7px;
    .banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .label {
      font-size: 12px;
    }
    .date {
      font-size: 12px;
    }
    .name {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 400;
    }
    .author {
      margin-top: 20px;
      text-align: end;
      font-size: 8px;
    }
    .description {
      font-weight: 300;
      text-align: justify;
    }
    .settings {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
  img {
    border-radius: 7px;
    width: 100%;
  }
  #map {
    color: black;
    border-radius: 7px;
    aspect-ratio: 2/1;
  }
}
@include media-sm {
  .event-details {
    #map {
      aspect-ratio: 3/1;
    }
  }
}
</style>

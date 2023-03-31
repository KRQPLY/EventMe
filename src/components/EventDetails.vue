<template>
  <div class="event-details">
    <div class="section">
      <div class="banner">
        <div class="name">
          {{ name }}
        </div>
        <Button filled>Join</Button>
      </div>
    </div>
    <div class="section">
      <div class="banner">
        <div class="date">{{ toDateTime(date) }}</div>
        <div class="date">{{ toDateTime(date, true) }}</div>
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
import { onMounted, ref } from 'vue'

const props = defineProps({
  description: String,
  name: String,
  author: String,
  date: Number,
  marker: {
    type: Array,
    default: [51.505, -0.09]
  },
  imageUrl: {
    type: String,
    default: '../assets/find-background-sm.jpg'
  }
})

const map = ref(null)

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

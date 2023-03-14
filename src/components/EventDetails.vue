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
      map.value = L.map('map').setView([location.coords.latitude, location.coords.longitude], 13)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(map.value)
      L.Routing.control({
        waypoints: [
          L.latLng(location.coords.latitude, location.coords.longitude),
          L.latLng(...props.marker)
        ],
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
    },
    (error) => {
      console.error(error)
    }
  )
})
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

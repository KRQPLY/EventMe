<template>
  <div class="event-details">
    <div class="section">
      <div class="banner">
        <div class="name">
          {{ name }}
        </div>
        <div class="participation">
          <Button
            filled
            radius="35% / 50%"
            @click="
              () => {
                isAdModalVisible = true
                toggleUserParticipation()
              }
            "
            v-if="!isJoined"
            >Join</Button
          >
          <Button filled checked @click="toggleUserParticipation" v-if="isJoined">Joined</Button>
          <Button filled radius="30% / 50%" @click="isInviteModalVisible = true" v-if="isJoined"
            >Invite</Button
          >
        </div>
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
    <div class="section">
      <div class="banner">
        <Button filled checked radius="15% / 50%" @click="isParticipantsModalVisible = true"
          >participants</Button
        >
        <div class="label">
          {{ nFormatter(participantsNumber)
          }}{{ maxParticipantsNumber ? ` / ${nFormatter(maxParticipantsNumber)}` : '' }}
        </div>
      </div>
    </div>
    <div class="section">
      <div class="comment" v-for="comment in commentsSorted">
        <div class="banner">
          <div class="label">{{ comment.author }}</div>
          <div class="date">
            {{ toDateTime(comment.date) }} {{ toDateTime(comment.date, true) }}
          </div>
        </div>
        <div>{{ comment.content }}</div>
      </div>
      <div class="banner banner--responsive">
        <FormField name="comment" type="text" theme-responsive @keyup.enter="addComment" />
        <Button filled radius="20% / 50%" @click="addComment">comment</Button>
      </div>
    </div>
    <div class="section" v-if="author === userStore.username">
      <div class="label">settings</div>
      <div class="settings">
        <Button
          filled
          radius="35% / 50%"
          @click="router.push({ name: 'editEvent', query: { id: eventId } })"
        >
          Edit
        </Button>
        <Button filled danger @click="isDeleteEventModalVisible = true">Delete</Button>
      </div>
    </div>
    <Modal :visible="isInviteModalVisible" @close="isInviteModalVisible = false">
      <template v-slot:header>Select a friend</template>
      <template v-slot:body>
        <UsersList
          :users="friendsNotParticipating"
          custom-button="Invite"
          @custom-click="inviteFriend"
        />
      </template>
    </Modal>
    <Modal :visible="isDeleteEventModalVisible" @close="isDeleteEventModalVisible = false">
      <template v-slot:header>Are you sure you want to delete that event?</template>
      <template v-slot:body>
        <div class="settings-buttons">
          <Button filled @click="isDeleteEventModalVisible = false">Cancel</Button>
          <Button filled danger @click="deleteEvent">Delete</Button>
        </div>
      </template>
    </Modal>
    <Modal :visible="isParticipantsModalVisible" @close="isParticipantsModalVisible = false">
      <template v-slot:header>Participants</template>
      <template v-slot:body>
        <div class="participants">
          <UsersList
            :users="invitedBy"
            custom-button="accept invite"
            @custom-click="toggleUserParticipation"
            v-if="invitedBy.length"
          />
          <UsersList :users="participantsNotInviting" v-if="participantsNotInviting.length" />
        </div>
      </template>
    </Modal>
    <AdvertisementModal :visibile="isAdModalVisible" @click="isAdModalVisible = false" />
  </div>
</template>

<script setup>
import AdvertisementModal from '@/components/AdvertisementModal.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import FormField from '@/components/FormField.vue'
import UsersList from '@/components/UsersList.vue'
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
import { useForm } from 'vee-validate'
import deleteData from '@/helpers/deleteData'
import postData from '@/helpers/postData'
import getData from '@/helpers/getData'
import nFormatter from '@/helpers/nFormatter'

const props = defineProps({
  eventId: Number,
  description: String,
  name: String,
  author: String,
  participantsNumber: Number,
  maxParticipantsNumber: Number,
  startDate: Number,
  endDate: Number,
  invitedBy: Array,
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
const invitedBy = toRef(props, 'invitedBy')
const participantsUsernames = toRef(props, 'participantsUsernames')
const isInviteModalVisible = ref(false)
const isDeleteEventModalVisible = ref(false)
const isParticipantsModalVisible = ref(false)
const isAdModalVisible = ref(false)
const friendsData = ref([])
const map = ref(null)
const comments = ref([])

const isJoined = computed(() => participantsUsernames.value.includes(userStore.username))
const commentsSorted = computed(() => comments.value.sort((a, b) => a.date - b.date))
const friendsNotParticipating = computed(() =>
  friendsData.value.filter((friend) => !participantsUsernames.value.includes(friend))
)
const participantsNotInviting = computed(() =>
  participantsUsernames.value.filter((participant) => !invitedBy.value.includes(participant))
)

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      initMap(location)
    },
    (error) => {
      initMap(false)
    }
  )
  getFriends()
  getComments()
})

const { values, setFieldValue } = useForm()

async function getFriends() {
  const response = await getData(`${import.meta.env.VITE_API_URL}/friends`, true)

  if (response) {
    friendsData.value = response
      .filter((friend) => friend.invitationReceived && friend.invitationSent)
      .map((friend) => friend.username)
  }
}

async function deleteEvent() {
  await deleteData(`${import.meta.env.VITE_API_URL}/events/${props.eventId}`, true)

  router.push({ name: 'findEvents' })
}

async function toggleUserParticipation() {
  if (isJoined.value) {
    await deleteData(`${import.meta.env.VITE_API_URL}/user-events/${props.eventId}`, true)
  } else {
    await postData(`${import.meta.env.VITE_API_URL}/user-events/${props.eventId}`)
  }
  emits('update')
}

async function inviteFriend(friendUsername) {
  await postData(`${import.meta.env.VITE_API_URL}/event-invite`, {
    username: friendUsername,
    id: props.eventId
  })

  friendsData.value.shift(friendUsername)
}

async function getComments() {
  const response = await getData(`${import.meta.env.VITE_API_URL}/comments/${props.eventId}`, true)

  if (response) {
    comments.value = response
  }
}

async function addComment() {
  await postData(`${import.meta.env.VITE_API_URL}/comments/${props.eventId}`, {
    content: values.comment
  })

  setFieldValue('comment')
  getComments()
}

function initMap(location) {
  const defaultView = props.marker
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

      &--responsive {
        flex-direction: column;
      }
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
    .participation {
      display: flex;
      gap: 10px;
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
    .comment {
      padding: 5px 0;
      border-bottom: 1px solid $color-main;
    }
    .settings {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
  .settings-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 15px;
  }
  .users-list {
    width: 240px;

    .participants {
      display: flex;
      flex-direction: column;
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
    .section {
      .banner {
        &--responsive {
          flex-direction: row;
        }
      }
    }
    .users-list {
      width: 300px;
    }
    #map {
      aspect-ratio: 3/1;
    }
  }
}
</style>

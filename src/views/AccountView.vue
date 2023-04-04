<template>
  <div class="account-container">
    <Hero type="account" />
    <FriendsContainer :friends-data="friendsData" @updated="getFriends" />
    <UserSettings />
  </div>
</template>

<script setup>
import Hero from '@/components/Hero.vue'
import FriendsContainer from '../components/FriendsContainer.vue'
import UserSettings from '../components/UserSettings.vue'
import { ref } from 'vue'
import getData from '@/helpers/getData'

const friendsData = ref([])

getFriends()

async function getFriends() {
  const response = await getData(`${import.meta.env.VITE_API_URL}/friends`, true)

  if (response) {
    friendsData.value = response
  }
}
</script>

<style lang="scss" scoped></style>

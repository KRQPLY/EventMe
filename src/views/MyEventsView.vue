<template>
  <div class="my-events-container">
    <Hero type="myEvents" />
    <CardsContainer>
      <ProjectCard v-for="i in 30" />
    </CardsContainer>
  </div>
</template>

<script setup>
import Hero from '@/components/Hero.vue'
import ProjectCard from '../components/ProjectCard.vue'
import CardsContainer from '@/components/CardsContainer.vue'
</script>

<style lang="scss" scoped></style>

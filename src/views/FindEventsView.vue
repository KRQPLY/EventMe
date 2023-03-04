<template>
  <div class="find-events-container">
    <Hero type="findEvents" />
    <Search />
    <CardsContainer>
      <ProjectCard v-for="i in 30" />
    </CardsContainer>
  </div>
</template>

<script setup>
import Search from '@/components/Search.vue'
import Hero from '@/components/Hero.vue'
import ProjectCard from '../components/ProjectCard.vue'
import CardsContainer from '@/components/CardsContainer.vue'
</script>

<style scoped lang="scss">
.find-events-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>

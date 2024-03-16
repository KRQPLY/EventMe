import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useEventsStore = defineStore(
  'event',
  () => {
    const standardEvents = ref([])
    const premiumEvents = ref([])

    const selectedStandardEvents = computed(() => getRandomEvents(standardEvents.value, 3))
    const selectedPremiumEvents = computed(() => getRandomEvents(premiumEvents.value, 3))

    function addToStandardEvents(event) {
      if (!standardEvents.value.some((item) => item.id === event.id)) {
        standardEvents.value.push(event)
      }

      const index = premiumEvents.value.findIndex((obj) => obj.id === event.id)

      if (index !== -1) {
        premiumEvents.value.splice(index, 1)
      }
    }

    function addToPremiumEvents(event) {
      if (!premiumEvents.value.some((item) => item.id === event.id)) {
        premiumEvents.value.push(event)
      }

      const index = standardEvents.value.findIndex((obj) => obj.id === event.id)

      if (index !== -1) {
        standardEvents.value.splice(index, 1)
      }
    }

    function getRandomEvents(array, numberOfItems) {
      if (array.length <= numberOfItems) {
        return array
      }

      const shuffledArray = array.sort(() => Math.random() - 0.5)

      return shuffledArray.slice(0, numberOfItems)
    }

    return {
      standardEvents,
      premiumEvents,
      selectedStandardEvents,
      selectedPremiumEvents,
      addToStandardEvents,
      addToPremiumEvents
    }
  },
  {
    persist: true
  }
)

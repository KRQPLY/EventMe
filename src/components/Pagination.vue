<template>
  <vue-awesome-paginate
    :total-items="results"
    :items-per-page="20"
    :max-pages-shown="5"
    :show-breakpoint-buttons="false"
    :hide-prev-next-when-ends="true"
    v-model="page"
    :on-click="onClickHandler"
  />
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  results: Number,
  currentPage: Number
})

const emits = defineEmits(['pageChange'])

const page = ref( props.currentPage ? props.currentPage : 1)

function onClickHandler(page){
  emits('pageChange', page)
}
</script>

<style lang="scss">
.pagination-container {
  display: flex;
  column-gap: 5px;
}
.paginate-buttons {
  height: 32px;
  width: 32px;
  border-radius: 20px;
  cursor: pointer;
  background-color: $color-secondary;
  border: 2px solid $color-secondary;
  color: $color-contrast;
}
.paginate-buttons:hover {
  opacity: 0.9;
}
.active-page {
  background-color: $color-accent;
  border: 1px solid $color-accent;
  color: white;
}
.active-page:hover {
  opacity: 0.9;
}

@include media-xs {
  .pagination-container {
    column-gap: 10px;
  }
  .paginate-buttons {
    height: 40px;
    width: 40px;
  }
}
</style>

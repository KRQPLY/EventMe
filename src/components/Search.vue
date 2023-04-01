<template>
  <div class="search">
    <input type="text" placeholder="Search" v-model="value" @keyup.enter="updateValue" />
    <Button @click="updateValue">
      <IconSearch />
    </Button>
  </div>
</template>

<script setup>
import IconSearch from './IconSearch.vue'
import Button from './Button.vue'
import { ref } from 'vue'

const emits = defineEmits(['search'])

const value = ref('')

const updateValue = () => {
  emits('search', value.value)
}
</script>

<style lang="scss" scoped>
.search {
  padding: 10px;
  width: fit-content;
  background: $color-secondary;
  display: flex;
  border-radius: 10% / 50%;

  input {
    font-size: 16px;
    background: $color-secondary;
    padding: 5px;
    width: 200px;
    border-radius: 0;
    border: none;
    outline: none;
    border-right: 2px solid #000;
    font-weight: 500;
    color: $color-accent;
    &:focus {
      outline: none;
      border: none;
      border-right: 2px solid $color-accent;
    }
  }
}

@include media-xs {
  .search {
    border-radius: 6% / 50%;
    input {
      width: 280px;
    }
  }
}
@include media-md {
  .search {
    input {
      padding: 10px;
      width: 350px;
      font-size: 20px;
    }
  }
}
@include media-hd {
  .search {
    input {
      width: 500px;
    }
  }
}
</style>

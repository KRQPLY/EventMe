<template>
  <div class="search">
    <input type="text" placeholder="Search" v-model="value" />
    <Button><Icon img="../assets/search.png" width="16px" /></Button>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'
import Button from './Button.vue'
import { ref } from 'vue'

const value = ref('')
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  top: -27px;
  padding: 10px;
  width: fit-content;
  background: #fff;
  display: flex;
  border-radius: 7px;

  input {
    padding: 5px;
    width: 200px;
    border: none;
    outline: none;
    border-right: 2px solid $color-silver;
    font-weight: 500;
    color: $color-accent;
    &:focus {
      outline: none;
      border-right: 2px solid $color-accent;
    }
  }
}

@include media-xs {
  .search {
    input {
      width: 280px;
    }
  }
}
@include media-md {
  .search {
    top: -32px;

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

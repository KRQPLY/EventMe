<template>
  <div class="search">
    <input
      type="text"
      placeholder="Search"
      :value="value"
      @input="updateValue"
      @keyup.enter="$emit('search')"
    />
    <Button @click="$emit('search')">
      <IconSearch />
    </Button>
  </div>
</template>

<script setup lang="ts">
import IconSearch from './IconSearch.vue'
import Button from './Button.vue'

defineProps({
  value: {
    type: String,
    default: '',
    required: true
  }
})
const emits = defineEmits(['update:value', 'search'])

const updateValue = (e: Event) => {
  emits('update:value', (e.target as HTMLInputElement).value)
}
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  top: -27px;
  padding: 10px;
  width: fit-content;
  background: $color-secondary;
  display: flex;
  border-radius: 7px;

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

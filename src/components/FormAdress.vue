<template>
  <div class="form-address">
    <div class="label">{{ label }}</div>
    <input v-model="address" type="text" @input="handleInput" />
    <div class="error-container">
      <div class="error-message">
        {{ errorMessage }}
      </div>
    </div>
    <div class="autocompletes-container">
      <div class="autocompletes">
        <div
          class="autocomplete"
          @click="
            handleAddressChange(autocomplete.properties.formatted, [
              autocomplete.properties.lat,
              autocomplete.properties.lon
            ])
          "
          v-for="autocomplete in autocompletes"
        >
          {{ autocomplete.properties.formatted }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRef, ref } from 'vue'
import { useField } from 'vee-validate'
import getData from '@/helpers/getData'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String
  }
})

const autocompletes = ref([])
const address = ref('')
const nameRef = toRef(props, 'name')
const { value, errorMessage } = useField(nameRef)

async function handleInput() {
  value.value = null
  if (!address.value) {
    autocompletes.value = []
    return
  }
  const response = await getData(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${address.value}&apiKey=${
      import.meta.env.VITE_GEOAPIFY_KEY
    }`
  )
  autocompletes.value = response.features
}

function handleAddressChange(addressFormatted, coords) {
  address.value = addressFormatted
  value.value = coords
  autocompletes.value = []
}
</script>

<stye lang="scss" scoped>
.form-address {
  .label {
    color: #fff;
  }

  input {
    font-size: 16px;
    width: 230px;
    padding: 0;
    color: #fff;
    background: none;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #fff;
    outline: none;
    &:focus {
      border-color: $color-accent;
      color: $color-accent;
    }
  }

  input {
    height: 40px;
  }

  .error-container {
    height: 10px;
  }

  .error-message {
    font-weight: 400;
    font-size: 10px;
    color: $color-danger;
  }

  .autocompletes-container {
    position: relative;

    .autocompletes {
      position: absolute;
      width: 100%;
      border-radius: 10px;
      background-color: $color-main;
      color: $color-contrast;
      font-weight: 300;

      .autocomplete {
        padding: 10px;
      }
    }
  }

  &:focus-within {
    .label {
      color: $color-accent;
    }
  }
}
@include media-xs {
  .form-address {
    input {
      width: 400px;
    }
    .error-container {
      height: 14px;
    }
    .error-message {
      font-size: 14px;
    }
  }
}
</stye>

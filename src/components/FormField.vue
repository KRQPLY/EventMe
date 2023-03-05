<template>
  <div class="form-field">
    <div class="label">{{ label }}</div>
    <input v-model.lazy="value" :type="type" v-if="type !== 'textarea'" />
    <textarea v-model.lazy="value" rows="3" v-else />
    <div class="error-container">
      <div class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  label: {
    type: String
  }
})

const nameRef = toRef(props, 'name')

const { value, errorMessage } = useField<string>(nameRef)
</script>

<stye lang="scss" scoped>
.form-field {
  margin-top: 20px;

  &:focus-within {
    .label {
      color: $color-accent;
    }
  }
  .label {
    color: #fff;
  }

  input,
  textarea {
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

  textarea {
    resize: none;
  }
  .error-container {
    height: 10px;
  }
  .error-message {
    font-weight: 400;
    font-size: 10px;
    color: rgb(230, 27, 27);
  }
}
@include media-xs {
  .form-field {
    input,
    textarea {
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

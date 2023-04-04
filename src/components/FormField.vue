<template>
  <div class="form-field" :class="{ 'theme-responsive': themeResponsive }">
    <div class="label">{{ label }}</div>
    <input v-model.lazy="value" :type="type" v-if="type !== 'textarea'" />
    <textarea v-model.lazy="value" rows="5" v-else />
    <div class="error-container">
      <div class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
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
  },
  themeResponsive: {
    type: Boolean,
    default: false
  }
})

const nameRef = toRef(props, 'name')

const { value, errorMessage } = useField(nameRef)
</script>

<stye lang="scss" scoped>
.form-field {
  .label {
    color: #fff;
  }

  input,
  textarea {
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
    color-scheme: dark;
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
    color: $color-danger;
  }

  &:focus-within {
    .label {
      color: $color-accent;
    }
  }

  &.theme-responsive {
    .label {
      color: $color-contrast;
    }

    input,
    textarea {
      color: $color-contrast;
      border-color: $color-contrast;

      &:focus {
        border-color: $color-accent;
        color: $color-accent;
      }
    }

    &:focus-within {
      .label {
        color: $color-accent;
      }
    }
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

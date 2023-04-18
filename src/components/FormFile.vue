<template>
  <div class="form-file">
    <label for="file-upload" class="label">{{ label }}</label>
    <label for="file-upload" class="custom-upload">
      <input id="file-upload" type="file" accept="image/*" @change="handleChange" />
      {{ value ? value.name : 'choose file' }}
      <IconUpload />
    </label>
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
import IconUpload from '@/components/IconUpload.vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: String
})

const nameRef = toRef(props, 'name')
const { value, errorMessage } = useField(nameRef)

function handleChange(e) {
  value.value = e.target.files[0]
}
</script>

<style lang="scss" scoped>
.form-file {
  .label {
    color: #fff;
  }

  .custom-upload {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    width: 230px;
    border-bottom: 1px solid #fff;
    cursor: pointer;
    font-weight: 300;
    overflow: hidden;
  }

  input[type='file'] {
    display: none;
  }

  .error-container {
    height: 10px;
  }

  .error-message {
    font-weight: 400;
    font-size: 10px;
    color: $color-danger;
  }
}
@include media-xs {
  .form-file {
    .custom-upload {
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
</style>

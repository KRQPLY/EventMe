<template>
  <div class="add-event-form">
    <h1 class="title">Add Event</h1>
    <FormField name="name" type="text" label="Name" />
    <Button @click="handleSubmit" filled>Add</Button>
  </div>
</template>

<script setup>
import FormField from './FormField.vue'
import Button from './Button.vue'
import { useUserStore } from '../stores/user'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

function handleSubmit() {
  console.log('hi')
}
</script>

<style lang="scss" scoped>
.add-event-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 200;
  background: rgba(0, 0, 0, 0.3);
  .title {
    font-weight: 200;
  }
}
</style>

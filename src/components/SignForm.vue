<template>
  <div class="sign-form">
    <h1 class="title">{{ signup ? 'Sign up' : 'Sign in' }}</h1>
    <FormField name="email" type="email" label="Email" />
    <FormField name="password" type="password" label="Password" />
    <FormField name="password" type="confirmPassword" label="Confirm password" v-if="signup" />
    <Button @click="handleSubmit" class="button" filled>
      {{ signup ? 'Sign up' : 'Sign in' }}
    </Button>
  </div>
</template>

<script setup>
import FormField from './FormField.vue'
import Button from './Button.vue'
import { useUserStore } from '../stores/user'

defineProps({
  signup: {
    type: Boolean,
    default: false
  }
})

const userStore = useUserStore()

// TODO
function handleSubmit() {
  userStore.signin()
}
</script>

<style lang="scss" scoped>
.sign-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 200;
  backdrop-filter: blur(20px);
  .title {
    font-weight: 200;
  }
  .button {
    margin-top: 40px;
  }
}
</style>

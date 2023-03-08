<template>
  <div class="sign-form" @keyup.enter="handleSubmit">
    <h1 class="title">{{ isSignup ? 'Sign up' : 'Sign in' }}</h1>
    <FormField name="email" type="email" label="Email" />
    <FormField name="password" type="password" label="Password" />
    <FormField name="confirmedPassword" type="password" label="Confirm password" v-if="isSignup" />
    <Button @click="handleSubmit" class="button" filled>
      {{ isSignup ? 'Sign up' : 'Sign in' }}
    </Button>
  </div>
</template>

<script setup>
import FormField from './FormField.vue'
import Button from './Button.vue'
import { useUserStore } from '../stores/user'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps({
  isSignup: {
    type: Boolean,
    default: false
  },
  redirect: {
    type: String,
    default: 'findEvents'
  },
  redirectId: Number
})

const userStore = useUserStore()

const schema = props.isSignup
  ? yup.object({
      email: yup.string().required('email is required').email('email is not valid'),
      password: yup.string().required('password is required').min(8)
    })
  : yup.object({
      email: yup.string().required('email is required').email('email is not valid'),
      password: yup.string().required('password is required')
    })

const { values, setFieldError, validate } = useForm({
  validationSchema: schema
})

async function signin() {
  const validation = await validate()
  if (!validation.valid) {
    return
  }
  const query = props.redirectId ? { id: props.redirectId } : {}
  await userStore.signin(values.email, values.password)
  userStore.redirect(props.redirect, query)
}

async function signup() {
  const validation = await validate()
  if (!validation.valid) {
    return
  }
  if (values.confirmedPassword !== values.password) {
    setFieldError('confirmedPassword', "passwords don't match")
    return
  }
  const query = props.redirectId ? { id: props.redirectId } : {}
  await userStore.signup(values.email, values.password, values.confirmedPassword)
  userStore.redirect(props.redirect, query)
}

function handleSubmit() {
  if (props.isSignup) {
    signup()
  } else {
    signin()
  }
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

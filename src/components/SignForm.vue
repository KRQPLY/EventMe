<template>
  <div class="sign-form" @keyup.enter="handleSubmit">
    <h1 class="title">{{ isSignup ? 'Sign up' : 'Sign in' }}</h1>
    <FormField name="email" type="email" label="Email" />
    <FormField name="username" type="text" label="Username" v-if="isSignup" />
    <FormField name="dateOfBirth" type="date" label="Birth date" v-if="isSignup" />
    <FormField name="password" type="password" label="Password" />
    <FormField name="confirmedPassword" type="password" label="Confirm password" v-if="isSignup" />
    <div class="button-section">
      <Button @click="handleSubmit" filled v-if="!isSubmitting">{{
        isSignup ? 'Sign up' : 'Sign in'
      }}</Button>
      <Spinner static v-else />
      <div class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import FormField from '@/components/FormField.vue'
import Button from '@/components/Button.vue'
import Spinner from '@/components/Spinner.vue'
import { useUserStore } from '../stores/user'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import toTimeDate from '@/helpers/toTimeDate'
import { ref } from 'vue'

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
const router = useRouter()
const isSubmitting = ref(false)
const error = ref('')
const date = new Date()

date.setFullYear(date.getFullYear() - 13)

const schema = props.isSignup
  ? yup.object({
      email: yup.string().required('please enter your email').email('email is not valid'),
      username: yup.string().required('please enter your username'),
      dateOfBirth: yup
        .date()
        .typeError('please enter a valid date')
        .required('please enter your birth date')
        .max(date, 'you must be 13 or older'),
      password: yup.string().required('please enter your password').min(8)
    })
  : yup.object({
      email: yup.string().required('please enter your email').email('email is not valid'),
      password: yup.string().required('please enter your password')
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
  const data = await userStore.signin(values.email, values.password)

  if (!data) {
    router.push({ name: props.redirect, query })
  } else {
    error.value = data.error
  }
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
  const data = await userStore.signup(
    values.email,
    values.username,
    toTimeDate(values.dateOfBirth),
    values.password
  )

  if (!data) {
    router.push({ name: props.redirect, query })
  } else {
    error.value = data.error
  }
}

async function handleSubmit() {
  isSubmitting.value = true
  error.value = ''

  if (props.isSignup) {
    await signup()
  } else {
    await signin()
  }
  isSubmitting.value = false
}
</script>

<style lang="scss" scoped>
.sign-form {
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
  .button-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .error {
      margin-top: 5px;
      height: 18px;
      font-weight: 400;
      font-size: 10px;
      color: $color-danger;
    }
  }
}

@include media-xs {
  .sign-form {
    .button-section {
      .error {
        height: 21px;
        font-size: 14px;
      }
    }
  }
}
</style>

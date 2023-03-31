<template>
  <div class="create-event-form" @keyup.enter="handleSubmit">
    <h1 class="title">{{ eventId ? 'Edit Event' : 'Create Event' }}</h1>
    <FormField name="name" type="text" label="Name" />
    <FormField name="category" type="text" label="Category" />
    <FormFile name="image" label="Upload image" />
    <FormAdress name="marker" label="Address" />
    <FormField name="startDate" type="date" label="Start date" />
    <FormField name="endDate" type="date" :label="`End date${eventId ? '' : ' (optional)'}`" />
    <FormField
      name="maxParticipantsNumber"
      type="number"
      :label="`Max Participants${eventId ? '' : ' (optional)'}`"
    />
    <FormField name="description" type="textarea" label="Description" />
    <Button @click="handleSubmit" filled>{{ eventId ? 'Save' : 'Create' }}</Button>
  </div>
</template>

<script setup>
import FormField from '@/components/FormField.vue'
import FormAdress from '@/components/FormAdress.vue'
import FormFile from '@/components/FormFile.vue'
import Button from '@/components/Button.vue'
import uploadImage from '@/helpers/uploadImage'
import postData from '@/helpers/postData'
import putData from '@/helpers/putData'
import toTimeDate from '@/helpers/toTimeDate'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps({
  eventId: Number
})

const schema = props.eventId
  ? yup.object({
      name: yup.string(),
      category: yup.string(),
      marker: yup.array(),
      startDate: yup
        .date()
        .nullable()
        .transform((curr, orig) => (orig === '' ? null : curr))
        .typeError('please enter a valid end date'),
      endDate: yup
        .date()
        .nullable()
        .transform((curr, orig) => (orig === '' ? null : curr))
        .typeError('please enter a valid end date'),
      maxParticipantsNumber: yup
        .number()
        .nullable()
        .transform((curr, orig) => (orig === '' ? null : curr))
        .typeError('please enter a valid participants number'),
      description: yup.string()
    })
  : yup.object({
      name: yup.string().required('please enter event name'),
      category: yup.string().required('please enter event category'),
      marker: yup.array().required('please choose a direct address'),
      startDate: yup
        .date()
        .typeError('please enter a valid start date')
        .required('please enter start date'),
      endDate: yup
        .date()
        .nullable()
        .transform((curr, orig) => (orig === '' ? null : curr))
        .typeError('please enter a valid end date'),
      maxParticipantsNumber: yup
        .number()
        .nullable()
        .transform((curr, orig) => (orig === '' ? null : curr))
        .typeError('please enter a valid participants number'),
      description: yup.string().required('please provide a description')
    })

const { values, setFieldError, validate } = useForm({
  validationSchema: schema
})

async function handleSubmit() {
  const validation = await validate()
  if (!values.image) {
    setFieldError('image', 'please upload an image')
    return
  }
  if (!validation.valid) {
    return
  }

  const imageUrl = await uploadImage(values.image)
  if (!imageUrl) {
    setFieldError('image', 'error while uploading the image')
    return
  }

  const data = (({ image, startDate, endDate, ...rest }) => {
    return {
      ...rest,
      startDate: toTimeDate(startDate),
      endDate: endDate ? toTimeDate(endDate) : undefined,
      imageUrl
    }
  })(values)

  if (props.eventId) {
    await putData(`${import.meta.env.VITE_API_URL}/events`, { ...data, eventId: props.eventId })
  } else {
    await postData(`${import.meta.env.VITE_API_URL}/events`, data)
  }
}
</script>

<style lang="scss" scoped>
.create-event-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 200;
  background-color: rgba(0, 0, 0, 0.5);
  .title {
    font-weight: 200;
  }
}
</style>

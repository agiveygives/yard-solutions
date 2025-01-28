<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { isValidPhoneNumber, parsePhoneNumberFromString as parsePhoneNumber } from 'libphonenumber-js'

const schema = object({
  firstName: string().required('Required'),
  lastName: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  phoneNumber: string()
    .required('Required')
    .test('is-phone-number', 'Invalid phone number', (value) => {
      if (!value) return false
      return isValidPhoneNumber('+1'.concat(value))
    })
    .transform((value) => {
      if (!value) return value
      const phoneNumber = parsePhoneNumber(value, {
        defaultCountry: 'US',
        defaultCallingCode: '1'
      })
      console.log(phoneNumber?.formatNational())
      return phoneNumber ? phoneNumber.formatNational() : value
    }),
  addressLine1: string().required('Required'),
  addressLine2: string(),
  city: string().required('Required'),
  state: string().required('Required'),
  postalCode: string().length(5).required('Required'),
  jobType: string().required('Required'),
  description: string(),
  preferredJobDate: string().datetime().required('Required'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  phoneNumber: undefined,
  addressLine1: undefined,
  addressLine2: undefined,
  city: undefined,
  state: undefined,
  postalCode: undefined,
  jobType: undefined,
  description: undefined,
  preferredJobDate: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <div class="input-row">
      <UFormGroup label="First Name" name="firstName">
        <UInput v-model="state.firstName" />
      </UFormGroup>

      <UFormGroup label="Last Name" name="lastName">
        <UInput v-model="state.lastName" />
      </UFormGroup>
    </div>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Phone Number" name="phoneNumber">
      <UInput v-model="state.phoneNumber" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>

<style scoped>
.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>

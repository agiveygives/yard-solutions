<script setup lang="ts">
import { object, string, date, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { isValidPhoneNumber, parsePhoneNumberFromString as parsePhoneNumber } from 'libphonenumber-js'
import type { Database } from '~/types/database.types.ts';

const props = defineProps<{
  onSubmitCallback: () => void;
}>();

type Quote = Database['public']['Tables']['quotes']['Insert'];

const { $supabase } = useNuxtApp();

const form = useTemplateRef('form');
const formSteps = [
  { title: 'Contact Information' , fields: ['firstName', 'lastName', 'email', 'phoneNumber'] },
  { title: 'Address' , fields: ['addressLine1', 'addressLine2', 'city', 'state', 'postalCode'] },
  { title: 'Job Details' , fields: ['jobType', 'preferredJobDate', 'description'] },
];
const formStep = ref(0);

const stepIncluded = (field: string | string[]) => {
  const step = formSteps[formStep.value]

  const fields = Array.isArray(field) ? field : [field];

  return fields.every(f => step.fields.includes(f));
}

const jobTypes = [
  { label: 'Lawn Care', value: 'lawn-care' },
  { label: 'Landscaping', value: 'landscaping' },
  { label: 'Snow Removal', value: 'snow-removal' },
  { label: 'Leaf Removal', value: 'leaf-removal' },
]

const states = [
  {
    label: 'MO', value: 'MO',
  },
  {
    label: 'KS', value: 'KS',
  }
]

const formatPhoneNumber = (value: string): string => {
  if (!value) return value
  const phoneNumber = parsePhoneNumber(value, {
    defaultCountry: 'US',
    defaultCallingCode: '1'
  })
  return phoneNumber ? phoneNumber.formatNational() : value
}

const imagePreviews = ref<string[]>([]);
const handleFileChange = (files: FileList) => {
  if (!files) return;

  imagePreviews.value = [];
  Array.from(files).forEach((file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target) return;
        imagePreviews.value.push(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  });
};

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
    .transform(formatPhoneNumber),
  addressLine1: string().required('Required'),
  addressLine2: string(),
  city: string().required('Required'),
  state: string().required('Required'),
  postalCode: string().matches(/^\d{5}$/, 'Invalid postal code').required('Required'),
  jobType: string().required('Required'),
  description: string().max(1000, 'Description must be less than 1000 characters'),
  preferredJobDate: date().required('Required'),
})

type Schema = InferType<typeof schema>

const state = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  jobType: jobTypes[0].value,
  description: '',
  preferredJobDate: '',
})

const formatPhoneNumberInputOnChange = () => {
  state.phoneNumber = formatPhoneNumber(state.phoneNumber)
}

async function onNext() {
  try {
    await form.value?.validate(formSteps[formStep.value].fields);
    formStep.value++;
  } catch {
    // do nothing
  }
}

async function onBack() {
  try {
    await form.value?.clear();
    formStep.value--;
  } catch {
    // do nothing
  }
}


async function createQuote() {
  const quoteData: Quote = {
    address_line1: state.addressLine1,
    address_line2: state.addressLine2,
    city: state.city,
    state: state.state,
    email: state.email,
    family_name: state.lastName,
    given_name: state.firstName,
    job_type: state.jobType,
    phone_number: state.phoneNumber,
    postal_code: state.postalCode,
    preferred_job_date: state.preferredJobDate,
    description: state.description,
  }

  const { data, error } = await $supabase
    .from('quotes')
    .insert([quoteData]);

  if (error) {
    console.error('Error inserting data:', error.message);
  } else {
    console.log('Quote added:', data);
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // upload photos to s3

  await createQuote();

  // Create photo records in the database

  console.log(event.data);

  if (props.onSubmitCallback) {
    props.onSubmitCallback();
  }
}
</script>

<template>
  <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <h3>{{ formSteps[formStep].title }}</h3>

    <div v-if="stepIncluded(['firstName', 'lastName'])" class="input-row">
      <UFormGroup label="First Name" name="firstName">
        <UInput v-model="state.firstName" />
      </UFormGroup>

      <UFormGroup label="Last Name" name="lastName">
        <UInput v-model="state.lastName" />
      </UFormGroup>
    </div>

    <UFormGroup v-if="stepIncluded('email')" label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup v-if="stepIncluded('phoneNumber')" label="Phone Number" name="phoneNumber">
      <UInput v-model="state.phoneNumber" inputmode="numeric" @change="formatPhoneNumberInputOnChange" />
    </UFormGroup>

    <UFormGroup v-if="stepIncluded('addressLine1')" label="Line 1" name="addressLine1">
      <UInput v-model="state.addressLine1" />
    </UFormGroup>

    <UFormGroup v-if="stepIncluded('addressLine2')" label="Line 2" name="addressLine2">
      <UInput v-model="state.addressLine2" />
    </UFormGroup>

    <div v-if="stepIncluded(['city', 'state', 'postalCode'])" class="input-row">
      <UFormGroup label="City" name="city">
        <UInput v-model="state.city"/>
      </UFormGroup>

      <UFormGroup label="State" name="state" class="state">
        <USelect v-model="state.state" :options="states" />
      </UFormGroup>

      <UFormGroup label="Postal Code" name="postalCode" class="state">
        <UInput v-model="state.postalCode" inputmode="numeric" />
      </UFormGroup>
    </div>

    <div v-if="stepIncluded(['jobType', 'preferredJobDate'])" class="input-row">
      <UFormGroup label="Job Type" name="jobType">
        <USelect v-model="state.jobType" :options="jobTypes" />
      </UFormGroup>

      <UFormGroup label="Preferred Job Date" name="preferredJobDate">
        <UInput v-model="state.preferredJobDate" type="date" />
      </UFormGroup>
    </div>

    <UFormGroup v-if="stepIncluded('description')" label="Description" name="description">
      <UTextarea v-model="state.description" resize />
    </UFormGroup>

    <UFormGroup v-if="stepIncluded('description')" label="Images" name="images">
      <UInput type="file" accept=".jpg, .jpeg, .png" multiple @change="handleFileChange" />
      <UCard v-if="imagePreviews.length" class="mt-4">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <img v-for="(preview, index) in imagePreviews" :key="index" :src="preview">
        </div>
      </UCard>
    </UFormGroup>

    <UButton v-if="formStep > 0" @click="onBack">
      Back
    </UButton>
    <UButton v-if="formStep >= 0 && formStep < formSteps.length - 1" class="float-right" @click="onNext">
      Next
    </UButton>
    <UButton v-if="formStep === formSteps.length - 1" class="float-right"  type="submit">
      Submit
    </UButton>
  </UForm>
</template>

<style scoped>
.input-row {
  display: flex;
  gap: 1rem;
}

.input-row > * {
  flex: 1;
}

.state {
  flex: 0.5 !important;
}
</style>

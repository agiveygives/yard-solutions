<script setup lang="ts">
import { object, string, date, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { isValidPhoneNumber, parsePhoneNumberFromString as parsePhoneNumber } from 'libphonenumber-js'
import Compressor from 'compressorjs'

import type { Database } from '~/types/database.types.ts';

const props = defineProps<{
  onSubmitCallback: () => void;
}>();

const toast = useToast();

type Quote = Database['public']['Tables']['quotes']['Insert'];

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

const imageFiles = ref<File[]>([]);
const imagePreviews = ref<string[]>([]);
const handleFileChange = (files: FileList) => {
  if (!files) return;

  imagePreviews.value = [];
  imageFiles.value = [];
  Array.from(files).forEach((file) => {
    if (file.type.startsWith('image/')) {
      imageFiles.value.push(file);
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

const formState = reactive({
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
const state = reactive<{ submitting: boolean, error: string | null }>({
  submitting: false,
  error: null,
})

const formatPhoneNumberInputOnChange = () => {
  formState.phoneNumber = formatPhoneNumber(formState.phoneNumber)
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

async function createQuote(): Promise<{ success: boolean, data: Quote | null }> {
  const quoteData: Quote = {
    address_line1: formState.addressLine1,
    address_line2: formState.addressLine2,
    city: formState.city,
    state: formState.state,
    email: formState.email,
    family_name: formState.lastName,
    given_name: formState.firstName,
    job_type: formState.jobType,
    phone_number: formState.phoneNumber,
    postal_code: formState.postalCode,
    preferred_job_date: formState.preferredJobDate,
    description: formState.description,
  }

  try {
    const response = await fetch('/api/quotes', {
      method: 'POST',
      body: JSON.stringify(quoteData)
    })

    if (!response.ok) {
      throw new Error('Failed to create quote')
    }

    const { data } = await response.json()

    return { success: true, data }
  } catch (error) {
    console.error('Error creating quote:', error)
    return { success: false, data: null }
  }
}

async function uploadImages(quoteId: string): Promise<boolean> {
  // Netlify server functions allow a max request size of 1MB
  const MAX_FORM_DATA_SIZE = 1 * 1024 * 1024; // 1MB

  if (imageFiles.value.length === 0) return true;

  toast.add({
    title: `Uploading ${imageFiles.value.length} image${imageFiles.value.length > 1 ? 's' : ''}...`,
    color: 'info',
    icon: 'i-solar-upload-bold'
  })


  // Compress and prepare the images
  const compressedImages = await Promise.all(
    imageFiles.value.map((file) =>
      new Promise<File>((resolve, reject) => {
        new Compressor(file, {
          quality: 0.6,
          maxWidth: 800,
          maxHeight: 800,
          success(result) {
            let compressedFile: File;
            if(result instanceof Blob) {
              compressedFile = new File([result], file.name, {
                type: result.type,
                lastModified: Date.now()
              });
            } else {
              compressedFile = result;
            }

            resolve(compressedFile);
          },
          error(err) {
            reject(err);
          }
        });
      })
    )
  );

  const sendImageBatch = async (batch: File[]): Promise<boolean> => {
    const formData = new FormData();
    batch.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(`/api/quotes/${quoteId}/images`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload images');
      }

      return true;
    } catch (error) {
      console.error('Error uploading images:', error);
      return false;
    }
  };

  let batch: File[] = [];
  let totalSize = 0;

  for (let i = 0; i < compressedImages.length; i++) {
    const file = compressedImages[i];
    totalSize += file.size;

    if (totalSize > MAX_FORM_DATA_SIZE) {
      const success = await sendImageBatch(batch);
      if (!success) {
        return false;
      }

      batch = [file];
      totalSize = file.size;
    } else {
      batch.push(file);
    }
  }

  if (batch.length > 0) {
    const success = await sendImageBatch(batch);
    if (!success) {
      return false;
    }
  }

  return true;
}

async function onSubmit(_event: FormSubmitEvent<Schema>) {
  state.submitting = true;
  state.error = null;

  try {
    const { success, data } = await createQuote();

    if (success && data?.id) {
      toast.add({
        title: "Successfully submitted your quote request!",
        color: 'success',
        icon: 'i-solar-check-circle-bold'
      })

      // Upload images if any were selected
      if (imageFiles.value.length > 0) {
        uploadImages(data.id)
          .then((response) => {
            if(response) {
              toast.add({
                title: "Successfully uploaded quote images!",
                color: 'success',
                icon: 'i-solar-check-circle-bold'
              })
            } else {
              toast.add({
                title: "Failed to upload quote images.",
                description: "We're on it! In the meantime, please reply to our email with your pictures.",
                color: 'error',
                icon: 'i-solar-folder-error-bold'
              })
            }
          })
          .catch(() => {
            toast.add({
              title: "Failed to upload quote images.",
              description: "We're on it! In the meantime, please reply to our email with your pictures.",
              color: 'error',
              icon: 'i-solar-folder-error-bold'
            })
          })
      }

      if (props.onSubmitCallback) {
        props.onSubmitCallback();
      }
    } else {
      state.error = 'Failed to create quote';
    }
  } catch (error) {
    state.error = error instanceof Error ? error.message : 'An unexpected error occurred';
  } finally {
    state.submitting = false;
  }
}
</script>

<template>
  <UForm ref="form" :schema="schema" :state="formState" class="space-y-4" @submit="onSubmit">
    <h3>{{ formSteps[formStep].title }}</h3>

    <div v-if="stepIncluded(['firstName', 'lastName'])" class="input-row">
      <UFormGroup label="First Name" name="firstName">
        <UInput v-model="formState.firstName" />
      </UFormGroup>

      <UFormGroup label="Last Name" name="lastName">
        <UInput v-model="formState.lastName" />
      </UFormGroup>
    </div>

    <UFormGroup v-if="stepIncluded('email')" label="Email" name="email">
      <UInput v-model="formState.email" />
    </UFormGroup>

    <UFormGroup v-if="stepIncluded('phoneNumber')" label="Phone Number" name="phoneNumber">
      <UInput v-model="formState.phoneNumber" inputmode="numeric" @change="formatPhoneNumberInputOnChange" />
    </UFormGroup>

    <UFormGroup v-if="stepIncluded('addressLine1')" label="Line 1" name="addressLine1">
      <UInput v-model="formState.addressLine1" />
    </UFormGroup>

    <UFormGroup v-if="stepIncluded('addressLine2')" label="Line 2" name="addressLine2">
      <UInput v-model="formState.addressLine2" />
    </UFormGroup>

    <div v-if="stepIncluded(['city', 'state', 'postalCode'])" class="input-row">
      <UFormGroup label="City" name="city">
        <UInput v-model="formState.city"/>
      </UFormGroup>

      <UFormGroup label="State" name="state" class="state">
        <USelect v-model="formState.state" :options="states" />
      </UFormGroup>

      <UFormGroup label="Postal Code" name="postalCode" class="state">
        <UInput v-model="formState.postalCode" inputmode="numeric" />
      </UFormGroup>
    </div>

    <div v-if="stepIncluded(['jobType', 'preferredJobDate'])" class="input-row">
      <UFormGroup label="Job Type" name="jobType">
        <USelect v-model="formState.jobType" :options="jobTypes" />
      </UFormGroup>

      <UFormGroup label="Preferred Job Date" name="preferredJobDate">
        <UInput v-model="formState.preferredJobDate" type="date" />
      </UFormGroup>
    </div>

    <UFormGroup v-if="stepIncluded('description')" label="Description" name="description">
      <UTextarea v-model="formState.description" resize />
    </UFormGroup>

    <UFormGroup v-if="stepIncluded('description')" label="Images" name="images">
      <UInput type="file" accept=".jpg, .jpeg, .png" multiple @change="handleFileChange" />
      <UCard v-if="imagePreviews.length" class="mt-4">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <img v-for="(preview, index) in imagePreviews" :key="index" :src="preview">
        </div>
      </UCard>
    </UFormGroup>

    <UButton v-if="formStep > 0" :disabled="state.submitting" @click="onBack">
      Back
    </UButton>
    <UButton v-if="formStep >= 0 && formStep < formSteps.length - 1" class="float-right" @click="onNext">
      Next
    </UButton>
    <UButton v-if="formStep === formSteps.length - 1" class="float-right" type="submit" :loading="state.submitting">
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

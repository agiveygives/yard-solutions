<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="error" class="text-center py-8 flex justify-center gap-4">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mb-4 flex-shrink-1" />
      <div class="flex-grow-1">
        <h2 class="text-2xl font-semibold text-red-500 mb-2">{{ error }}</h2>
        <p class="text-gray-600">Are you sure this is yours?</p>
      </div>
    </div>

    <div v-if="!validated">
      <UForm ref="form" :schema="schema" :state="formState" class="space-y-4" @submit="validateQuote">
        <h1 class="text-2xl font-bold mb-1 flex justify-center">Entry the email associated to the quote</h1>
        <div class="flex flex-direction-horizontal gap-4 items-end justify-center">
          <UFormGroup label="Email" name="email" class="flex-grow-1">
            <UInput v-model="formState.email" />
          </UFormGroup>
          <UFormGroup>
            <UButton class="float-right" type="submit" :loading="validating">
              Validate
            </UButton>
          </UFormGroup>
      </div>
      </UForm>
    </div>

    <div v-if="validated">
      <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin" />
      </div>

      <div v-else-if="quote" class="max-w-3xl mx-auto">
        <div class="bg-gray-900 rounded-lg shadow-lg p-6 mb-6">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h1 class="text-2xl font-bold mb-1">
                Quote for {{ quote.given_name }} {{ quote.family_name }}
              </h1>
              <p>Job Type: {{ formatJobType(quote.job_type) }}</p>
            </div>
            <UBadge :color="getStatusColor(quote)" size="lg">
              {{ getStatusText(quote) }}
            </UBadge>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 class="text-lg font-semibold mb-3">Contact Information</h2>
              <div class="space-y-2">
                <p><span class="font-medium">Email:</span> {{ quote.email }}</p>
                <p><span class="font-medium">Phone:</span> {{ quote.phone_number }}</p>
              </div>
            </div>

            <div>
              <h2 class="text-lg font-semibold mb-3">Address</h2>
              <div class="space-y-2">
                <p>{{ quote.address_line1 }}</p>
                <p v-if="quote.address_line2">{{ quote.address_line2 }}</p>
                <p>{{ quote.city }}, {{ quote.state }} {{ quote.postal_code }}</p>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <h2 class="text-lg font-semibold mb-3">Job Details</h2>
            <div class="space-y-2">
              <p><span class="font-medium">Preferred Date:</span> {{ formatDate(quote.preferred_job_date) }}</p>
              <p v-if="quote.description"><span class="font-medium">Description:</span> {{ quote.description }}</p>
              <p v-if="quote.job_notes"><span class="font-medium">Notes:</span> {{ quote.job_notes }}</p>
              <p v-if="quote.quote_amount"><span class="font-medium">Quote Amount:</span> ${{ quote.quote_amount.toFixed(2) }}</p>
            </div>
          </div>

          <UCard v-if="quoteImages" class="mt-6">
            <div v-if="Array.isArray(quoteImages)" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <img v-for="(preview, index) in quoteImages" :key="index" :src="preview">
            </div>
            <p v-if="!Array.isArray(quoteImages)">${{ quoteImages }}</p>
          </UCard>

          <div class="mt-6 text-sm text-gray-400">
            <p>Created: {{ formatDate(quote.created_at) }}</p>
            <p v-if="quote.updated_at">Last Updated: {{ formatDate(quote.updated_at) }}</p>
            <p v-if="quote.expiration_date">Expires: {{ formatDate(quote.expiration_date) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import type { Database } from '~/types/database.types'

type Quote = Database['public']['Tables']['quotes']['Row']

const route = useRoute()
const quote = ref<Quote | null>(null)
const quoteImages = ref<string[] | string | null>(null)
const validated = ref(false)
const validating = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)

const formState = reactive({ email: '' });

const schema = object({ email: string().email('Invalid email').required('Required') })

const jobTypes = {
  'lawn-care': 'Lawn Care',
  'landscaping': 'Landscaping',
  'snow-removal': 'Snow Removal',
  'leaf-removal': 'Leaf Removal'
}

function formatJobType(type: string): string {
  return jobTypes[type as keyof typeof jobTypes] || type
}

function formatDate(date: string | null): string {
  if (!date) return 'Not specified'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getStatusColor(quote: Quote): 'red' | 'yellow' | 'green' {
  if (quote.expiration_date && new Date(quote.expiration_date) < new Date()) {
    return 'red'
  }
  if (quote.quote_amount) {
    return 'green'
  }
  return 'yellow'
}

function getStatusText(quote: Quote): string {
  if (quote.expiration_date && new Date(quote.expiration_date) < new Date()) {
    return 'Expired'
  }
  if (quote.quote_amount) {
    return 'Quoted'
  }
  return 'Pending'
}

async function fetchQuote() {
  try {
    loading.value = true
    error.value = null

    const response = await fetch(`/api/quotes/${route.params.id}`)
    const result = await response.json()
    const imageResponse = await fetch(`/api/quotes/${route.params.id}/images`)
    const imageResult = await imageResponse.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch quote')
    }

    quote.value = result.data

    if (!imageResponse.ok) {
      quoteImages.value = "Oops! We hit a snag getting your quote images"
    } else {
      quoteImages.value = imageResult.data
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An unexpected error occurred'
    console.error('Error fetching quote:', e)
  } finally {
    loading.value = false
  }
}

async function validateQuote() {
  const email = formState.email

  try {
    validating.value = true
    error.value = null

    const response = await fetch(`/api/quotes/${route.params.id}/validate`, {
      method: 'POST',
      body: JSON.stringify({ email })
    })
    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch quote')
    }

    if (result.data) {
      validated.value = true
      await fetchQuote()
    } else {
      error.value = "We could not validate the quote."
    }
  } catch (e) {
    error.value = "We could not validate the quote."
    console.error('Error validating quote:', e)
  } finally {
    validating.value = false
  }
}
</script>
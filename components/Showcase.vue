<template>
  <UCarousel
    ref="carouselRef"
    v-slot="{ item }"
    :items="items"
    :ui="{ item: 'basis-full' }"
    class="carousel overflow-hidden"
    indicators
  >
    <img class="carousel-img w-full" :src="item" :alt="`Image: ${item}`" draggable="false">
  </UCarousel>
</template>

<script setup lang="ts">
  const items = [
    'https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/showcase/1.jpg',
    'https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/showcase/2.jpg',
    'https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/showcase/3.jpg',
    'https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/showcase/4.jpg',
    'https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/showcase/5.jpg',
    'https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/showcase/6.jpg',
  ]

  const carouselRef = ref()

  onMounted(() => {
    setInterval(() => {
      if (!carouselRef.value) return

      if (carouselRef.value.page === carouselRef.value.pages) {
        return carouselRef.value.select(0)
      }

      carouselRef.value.next()
    }, 3000)
  })
</script>

<style>
.carousel {
  height: calc(100vh - 116px);
}

.carousel-img {
  object-fit: cover;
  display: block;
  width: 100%;
  max-width: 100vw;
  height: 100vh;
}
</style>

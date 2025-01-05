<template>
  <NCarousel
    direction="horizontal"
    dot-type="line"
    dot-placement="bottom"
    class="carousel"
    autoplay
  >
    <NCarouselItem v-for="image in items" :key="image">
      <img class="carousel-img" :src="image" :alt="`Image: ${image}`">
    </NCarouselItem>
  </NCarousel>
</template>

<script setup lang="ts">
  const items = [
    '/images/gallery/showcase/9.jpg',
    '/images/gallery/showcase/11.jpg',
    '/images/gallery/showcase/17.jpg',
    '/images/gallery/showcase/19.jpg',
    '/images/gallery/showcase/20.jpg',
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
  margin: 0 auto;
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  max-height: calc(100vh - 116px);
}

.carousel-img {
  object-fit: cover;
  display: block;
  width: 100%;
  max-width: 100vw;
  height: 100%;
  max-height: 100vh !important;
}
</style>

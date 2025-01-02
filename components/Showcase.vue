<template>
  <NCarousel
    direction="horizontal"
    dot-type="line"
    dot-placement="bottom"
    class="carousel"
    autoplay
  >
    <NCarouselItem v-for="image in images" :key="image">
      <img class="carousel-img" :src="image" :alt="`Image: ${image}`">
    </NCarouselItem>
  </NCarousel>
</template>

<script>
export default {
  data() {
    return {
      images: [
        '/images/gallery/showcase/9.jpg',
        '/images/gallery/showcase/11.jpg',
        '/images/gallery/showcase/17.jpg',
        '/images/gallery/showcase/19.jpg',
        '/images/gallery/showcase/20.jpg',
      ],
    };
  },
};
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

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const images = ref([]);

    onMounted(async () => {
      images.value = [
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/1/after/image1.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/1/after/image2.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/2/after/image13.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/2/after/image3.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/3/after/image4.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/3/after/image5.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/3/after/image6.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/3/after/image7.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/3/after/image8.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/4/after/image9.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/5/after/image10.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/5/after/image11.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/5/after/image12.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/5/after/image14.jpg",
      ];
    });

    return { images };
  },
};
</script>

<template>
  <div class="p-4">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <img v-for="(img, index) in images" :key="index" :src="img" alt="Gallery image" class="rounded-lg shadow-md">
    </div>
  </div>
</template>

<style scoped>
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
</style>

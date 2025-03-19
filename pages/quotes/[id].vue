<template>
  <div class="container">
    {{quote_id}}
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)

const quote_id = route.params.id
</script>
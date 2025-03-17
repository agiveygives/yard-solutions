<template>
  <nav>
    <div class="grid-container">
      <div>
        <NuxtLink to="/" class="logo-link">
          <img src="/images/banner-logo.png" alt="Yard Solutions LLC. logo">
        </NuxtLink>
      </div>
      <div class="nav-links">
        <!-- <NuxtLink to="/about">About</NuxtLink> -->
        <NuxtLink to="/gallery" class="link">
          <span class="link--top gallery--top">Gallery</span>
          <span class="link--bottom gallery--bottom">Gallery</span>
        </NuxtLink>
        <UButton class="link" variant="link" @click="openQuoteModal">
          <span class="link--top request-quote--top">Request a Quote</span>
          <span class="link--bottom request-quote--bottom">Request a Quote</span>
        </UButton>
      </div>
      <div>
        <div class="contact">
          <a href="tel:816-588-3819" class="telephone-contact">
            <Icon name="solar:phone-bold" class="phone-icon" />
            (816) 588-3819
          </a>
        </div>
      </div>
    </div>

    <UModal
      v-model="isQuoteOpen"
      title="Request a Quote"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full'
      }"
      :fullscreen="isMobile"
      @close="closeQuoteModal"
    >
      <div class="py-4 px-6">
        <div class="flex justify-between items-center pb-4">
          <h2>Request a Quote</h2>
          <UButton label="Close" variant="outline" :ui="{ rounded: 'rounded-full' }" @click="closeQuoteModal">
            <Icon name="uiw:close" />
          </UButton>
        </div>
        <main>
          <QuoteForm @on-submit-callback="closeQuoteModal" />
        </main>
      </div>
    </UModal>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 600);

const router = useRouter();
const route = useRoute();

const isQuoteOpen = ref(false)

// Watch for changes in the query param
watch(
  () => route.query.quote,
  (value) => {
    isQuoteOpen.value = value === 'true'
  },
  { immediate: true }
)

const openQuoteModal = () => {
  router.replace({ query: { ...route.query, quote: 'true' } })
}

const closeQuoteModal = () => {
  const query = { ...route.query }
  delete query.quote
  router.replace({ query })
}
</script>

<style>
@media only screen and (max-width: 600px) {
  [id^="headlessui-dialog-panel-v-"] {
    min-height: 100vh;
    height: auto;
  }
}
</style>

<style scoped>
nav {
  background-image: url("/images/background-sky.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 8px 16px;
}

img {
  max-height: 100px;
  cursor: pointer;
  pointer-events: none;
  user-select: none;
  object-fit: scale-down;
  display: inline-flex;
}

.logo-link {
  display: inline-flex;
  height: 100%;
}

.telephone-contact {
  display: flex;
  gap: 5px;
  align-items: top;
  justify-content: end;
  color: var(--ys-green);
  font-size: 24px;
  text-decoration: none !important;
}

.phone-icon {
  height: unset;
}

.grid-container {
  width: 100%;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  column-gap: 0px;
  row-gap: 0px;
}

.nav-links {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 16px;
}

@media only screen and (max-width: 600px) {
  .grid-container {
    grid-template-columns: minmax(0px, 1fr) !important;
    gap: 5px !important;
    justify-items: center
  }

  nav {
    max-height: unset;
  }
}

.link {
  position: relative;
  display: inline-block;
  padding: 0;
  line-height: 1em;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  color: var(--ys-white);
}

.link--top {
  position: absolute;
  color: inherit;
  top: 0;
  display: inline-block;
  clip-path: polygon(0% 66%, 0% 0%, 100% 0%, 100% 40%);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s, color 0.5s ease 0.22s;
}

.link--top:after {
  content: "";
  position: absolute;
  top: 36%;
  left: 0;
  width: 100%;
  height: 4%;
  background: var(--ys-white);
  transform: rotateZ(-2.2deg) scaleX(0%);
  transform-origin: right top;
  transition: transform 0.2s ease 0.22s;
}

.link--bottom {
  display: inline-block;
  clip-path: polygon(0% 65%, 100% 40%, 100% 110%, 0% 110%);
  text-decoration: underline;
  color: inherit;
  transition: color 0.5s ease 0.22s, background-position 0.2s ease 0.22s;
  text-decoration: none;
  background-size: 200% 8%;
  background-position: left bottom;
  background-repeat: no-repeat;
  /* background-image: linear-gradient(to right, var(--ys-green) 50%, transparent 50%); */
}

/*Can't use this type of underscore for multiple lines of text :(
Good for menu buttons though, this would use a transform animation instead of a background position animation, better performance :)*/
.link--bottom:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8%;
  background: var(--ys-green);
  transform-origin: left bottom;
  transition: all 0.2s ease;
}

.link:hover .link--bottom:before {
  transform: scaleY(100%);
  height: 100%;
  background: var(--ys-white);
  z-index: -1;
}

.link--bottom:after {
  content: "";
  position: absolute;

  top: 40%;
  left: 0;
  width: 100%;
  height: 4%;
  background: var(--ys-green);
  transform: rotateZ(-2deg) scaleX(0%);
  transform-origin: right top;
  transition: transform 0.2s ease 0.22s;
}

.link:hover .link--top {
  color: var(--ys-white);
  transform: translateY(-0.5em) rotateZ(-3deg);
  transition: transform 0.5s cubic-bezier(.12,.8,.57,1.00) 0.42s, color 0.5s ease 0.22s;
}

.link:hover .link--bottom {
  color: var(--ys-green);
  background-position: 100% bottom;
  transition: color 0.5s ease 0.2s, background-position 0.2s ease;
}

.link:hover .link--top:after {
  top: 62%;
  transform-origin: left top;
}

.link:hover .link--bottom:after {
  top: 65%;
  transform-origin: left top;
}

.link:hover .request-quote--top:after {
  transform: rotateZ(-1.8deg) scaleX(100%);
}

.link:hover .request-quote--bottom:after {
  transform: rotateZ(-2deg) scaleX(100%);
}

.link:hover .gallery--top:after {
  transform: rotateZ(-4.2deg) scaleX(100%);
}

.link:hover .gallery--bottom:after {
  transform: rotateZ(-4.6deg) scaleX(100%);
}
</style>

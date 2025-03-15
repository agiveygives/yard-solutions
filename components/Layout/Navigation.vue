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
        <NuxtLink to="/gallery" class="nav-link">Gallery</NuxtLink>
      </div>
      <div>
        <div>
          <a href="tel:816-588-3819" class="telephone-contact">
            <Icon name="solar:phone-bold" class="phone-icon" />
            (816) 588-3819
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

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
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.nav-link {
  text-decoration: none;
  position: relative;
  z-index: 1;
  padding: 0px 3px;
  font-weight: 400;
  font-size: 20px;
}

.nav-link::before {
  content: '';
  background-color: var(--ys-green);
  position: absolute;
  left: 0;
  bottom: 3px;
  width: 100%;
  height: 8px;
  z-index: -1;
}

.nav-link:hover::before {
  bottom: 0;
  height: 100%;
}

.nav-link::before {
  content: '';
  background-color: var(--ys-green);
  position: absolute;
  left: 0;
  bottom: 3px;
  width: 100%;
  height: 8px;
  z-index: -1;
  transition: all .3s ease-in-out;
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
</style>

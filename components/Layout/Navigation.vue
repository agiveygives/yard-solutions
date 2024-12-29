<template>
  <nav>
    <NGrid :cols="3">
      <NGridItem>
        <NuxtLink to="/">
          <NImage
            src="/images/banner-logo.png"
            alt="Yard Solutions LLC. logo"
            object-fit="scale-down"
          />
        </NuxtLink>
      </NGridItem>
      <NGridItem>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/gallery">Gallery</NuxtLink>
      </NGridItem>
      <NGridItem>
        <div>
          <a href="tel:816-588-3819" class="telephone-contact">
            <Icon name="solar:phone-bold" class="phone-icon" />
            (816) 588-3819
          </a>
        </div>
      </NGridItem>
    </NGrid>
  </nav>
</template>

<style>
nav {
  background-image: url("/images/background-sky.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  max-height: 100px;
  padding: 8px;
}

img {
  max-height: 100px;
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
</style>

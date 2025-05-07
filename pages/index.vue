<template>
  <div>
    <div>
      <Showcase />

      <div class="tagline">
        <h2 class="uppercase">"You bet your <span class="green">grass</span> we'll cut it!"</h2>
        <h2>Locally owned and operated in Lee's Summit, MO.<br>Proudly serving the Kansas City metro area!</h2>
        <p class="uppercase"><i><strong>Licensed & Insured</strong></i></p>
      </div>

      <div class="grid-container">
        <div class="card-grid-item">
          <UCard class="card about">
            <template #header>
              <h1 class="text-3xl">About Us</h1>
            </template>

            <p class="text-lg">
              Yard Solutions LLC is a locally-owned and operated lawn care business serving the Kansas City metro area. We are dedicated to providing quality lawn care services at an affordable price.
            </p>
          </UCard>
        </div>

        <div>
          <div />
        </div>

        <div>
          <div />
        </div>

        <div class="card-grid-item">
          <UCard class="card services text-lg">
            <template #header>
              <h1 class="text-3xl">Services</h1>
            </template>

            <p class="pb-1.5">Yard Solutions LLC offers a variety of services to meet your lawn care needs.</p>
            <ul>
              <li class="li-item pb-1.5">
                <img class="icon-img" src="/images/icons/lawnmower.png" alt="Lawn mower icon">
                Lawn Care
              </li>
              <li class="li-item pb-1.5">
                <img class="icon-img" src="/images/icons/leaf-fall.png" alt="Falling leaves icon">
                Leaf Removal
              </li>
              <li class="li-item pb-1.5">
                <img class="icon-img" src="/images/icons/bushes.png" alt="Bushes icon">
                Shrub Trimming
              </li>
              <li class="li-item pb-1.5">
                <img class="icon-img" src="/images/icons/planning.png" alt="Landscaping icon">
                Landscaping
              </li>
              <li class="li-item pb-1.5">
                <img class="icon-img" src="/images/icons/season.png" alt="Seasons icon">
                Spring & Fall Clean-Up
              </li>
              <li class="li-item pb-1.5">
                <img class="icon-img" src="/images/icons/sprout.png" alt="Sprouting plant icon">
                And more!
              </li>
            </ul>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.tagline {
  position: absolute;
  top: 170px;
  width: 40vw;
  max-width: 950px;
  height: calc(100vh - 215px);
  pointer-events: none;
  display: grid;
  place-items: center;
  background-color: rgba(255, 255, 255, 0.45);
  border-radius: 3px;
  padding: 16px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: black;
}

.uppercase {
  text-transform: uppercase;
}

.grid-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 0px;
  row-gap: 0px;
}

.card-grid-item {
  grid-column: span 2 / span 2;
}

@media only screen and (max-width: 600px) {
  .tagline {
    width: 100vw;
    border-radius: 0px;
    height: calc(100vh - 340px);
    top: 250px;
  }


.card-grid-item {
  grid-column: span 3 / span 3;
}
}

.green {
  color: green
}

.card {
  background-color: rgba(235, 235, 235, 0.45);
  padding: 16px;
  margin: 16px;
  border-radius: 24px;
}

.li-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon-img {
  height: 40px;
}
</style>

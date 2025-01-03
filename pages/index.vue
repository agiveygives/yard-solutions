<template>
  <div>
    <div>
      <Showcase />

      <div class="tagline">
        <h2 class="uppercase">"You bet your <span class="green">grass</span> we'll cut it!"</h2>
        <h2>Locally owned and operated in Lee's Summit, MO.<br>Proudly serving the Kansas City metro area!</h2>
        <p class="uppercase"><i><strong>Licensed & Insured</strong></i></p>
      </div>

      <NGrid :cols="3">
        <NGridItem :span="2">
          <div class="card about">
            <h1>About Us</h1>
            <p>Yard Solutions LLC. is a locally-owned and operated lawn care business serving the Kansas City metro area. We are dedicated to providing quality lawn care services at an affordable price.</p>
          </div>
        </NGridItem>

        <NGridItem>
          <div />
        </NGridItem>

        <NGridItem>
          <div />
        </NGridItem>

        <NGridItem :span="2">
          <div class="card services">
            <h1>Services</h1>
            <p>Yard Solutions LLC. offers a variety of services to meet your lawn care needs.</p>
            <ul>
              <li>Lawn Mowing</li>
              <li>Leaf Removal</li>
              <li>Shrub Trimming</li>
              <li>Landscaping</li>
              <li>Spring & Fall Clean-Up</li>
              <li>And more!</li>
            </ul>
          </div>
        </NGridItem>
      </NGrid>
    </div>
  </div>
</template>

<style>
.tagline {
  display: grid;
  place-items: center;
  background-color: rgba(255, 255, 255, 0.45);
  position: absolute;
  top: 170px;
  border-radius: 3px;
  height: calc(100vh - 215px);
  width: 40vw;
  max-width: 950px;
  padding: 16px;
  text-align: center;
}

.uppercase {
  text-transform: uppercase;
}

@media only screen and (max-width: 600px) {
  .tagline {
    width: 100vw;
    border-radius: 0px;
    height: calc(100vh - 340px);
    top: 250px;
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
</style>

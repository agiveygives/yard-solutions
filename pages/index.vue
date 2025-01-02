<template>
  <div>
    <div>
      <Showcase />

      <div class="tagline">
        <h2>"You bet your <span class="green">grass</span> we'll cut it!"</h2>
        <p><i><strong>Licensed & Insured</strong></i></p>
      </div>

      <div class="card about">
        <h1>About Us</h1>
        <p>Yard Solutions LLC. is a locally-owned and operated lawn care business serving the Kansas City metro area. We are dedicated to providing quality lawn care services at an affordable price.</p>
      </div>

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
    </div>
  </div>
</template>

<style>
.tagline {
  display: grid;
  place-items: center;
  background-color: rgba(255, 255, 255, 0.45);
  position: absolute;
  top: 50vh;
  right: 24px;
  padding: 8px;
  border-radius: 24px;

  text-transform: uppercase;
}

.green {
  color: green
}

.card {
  background-color: rgba(235, 235, 235, 0.45);
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
}
</style>

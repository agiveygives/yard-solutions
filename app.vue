<template>
  <UApp :toaster="{ position: 'bottom-center' }">
    <div id="app">
      <UNotifications />
      <header>
        <LayoutNavigation />
      </header>
      <main>
          <NuxtPage />
      </main>
      <footer>
        <p>Made with ❤️ by Andrew Givens</p>
        <br>
        <ULink to="/privacy_policy.html" target="_blank">Privacy Policy</ULink>
      </footer>
    </div>
  </UApp>
</template>

<style>
/* Global styles */
:root {
  --ys-blue: #017fb4;
  --ys-green: #0e9d2d;
  --ys-white: #fdfbff;
}

#app {
  font-family: Inter;
  font-weight: 300;
  line-height: 1.5;
  overflow-x: hidden;
  width: 100%;
  min-height: 100vh;

  display: grid;
  grid:
    "header" auto
    "main" 1fr
    "footer" auto / 1fr;
}

header {
  grid-area: header;
  box-shadow: 0px 10px 5px 0px rgba(0,0,0,0.50);
  z-index: 1;
}

main {
  grid-area: main;
}

footer {
  grid-area: footer;
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
}
</style>

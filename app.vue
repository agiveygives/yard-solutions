<template>
  <div id="app">
    <header>
      <LayoutNavigation />
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <p>Made with ❤️ by Andrew Givens</p>
    </footer>
  </div>
</template>

<style>
/* Global styles */
:root {
  --ys-blue: #017fb4;
  --ys-green: #00b007;
}

#app {
  font-family: Inter;
  font-weight: 300;
  line-height: 1.5;
  overflow-x: hidden;
  width: 100%;

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

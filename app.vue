<template>
  <div id="app">
    <header>
      <LayoutNavigation />
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>
      <p>&copy; 2024 My Nuxt App</p>
    </footer>
  </div>
</template>

<style>
/* Global styles */
:root {
  --ys-blue: #017fb4;
  --ys-green: #00b007;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}
main {
  padding: 2rem;
}
footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
}
</style>

<template>
  <div id="app">
    <nav
      class="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img src="./assets/logo.png" />
        </router-link>
      </div>
    </nav>
    <h1 class="title is-1"></h1>
    <main class="container is-fluid">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import './styles';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
</style>

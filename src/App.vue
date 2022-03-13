<template>
  <div id="app" style="background-color: #FEF9EF !important;">
    <nav class=" navbar-light bg-light" style="background-color: #FFCB77!important;">
  <div class="container">
    <h1 class="text-center py-4" style="color: #fff;">Plain Old Sudoku</h1>
  </div>
</nav>
    <router-view/>
    <div style="height:100px;"></div>
    <footer style="background-color:#a9a9a9" class="py-5 text-center">
      <span class="text-center"><a href="#" style="color:white; text-align:center;">Github</a></span>
    </footer>

  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #FEF9EF !important;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.navbar-light.bg-light {
  
}



@import './assets/bootstrap.min.css'

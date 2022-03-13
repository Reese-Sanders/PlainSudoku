import Vue from 'vue'
import App from './App.vue'
import router from './router'
import sudokuGames from './sudoku.js'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false
console.log(sudokuGames);

let data = {
  boards: sudokuGames,
  currentBoard: 3
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')

import "bootstrap/dist/js/bootstrap.js"

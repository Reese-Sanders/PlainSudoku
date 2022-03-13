<template>
  <div class="container">
    <h2></h2>
    <div class="sud-container">
    <button type="button" class="btn btn-primary-1 my-3" v-on:click="getRandomBoard">Get New Board</button>
    </div>
    <boardComp :unsolvedBoard="getUnsolvedBoard" :solvedBoard="getSolvedBoard"/>
  </div>
  
</template>

<script>
import boardComp from '../components/board.vue';


export default {
  name: 'HomeView',
  components: {
    boardComp
  },
  computed: {
    getUnsolvedBoard: function() {
      let unsolved = this.parseBoard(this.$root.$data.boards[this.$root.$data.currentBoard].Unsolved1);
      return unsolved;
    },
    getSolvedBoard: function() {
      let solved = this.parseBoard(this.$root.$data.boards[this.$root.$data.currentBoard].Solved1);
      return solved;
    }
  },
  methods: {
    getRandomBoard: function() {
      this.$root.$data.currentBoard = Math.floor(Math.random()* this.$root.$data.boards.length);
      console.log(this.$root.$data.currentBoard)
      this.$forceUpdate();
    },
    getEmptyArray: function() {
      let array = [];
      for (let i = 0; i < 9; i++) {
        let array2 = [];
        for (let j = 0; j < 9; j++) {
          array2.push({
            value: 0,
            isDone: false
          });
        } 
        array.push(array2);
      }
      return array;
    },
    parseBoard: function(string) {
      let index = 0;
      let array = this.getEmptyArray();
      //console.log(array);
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          array[i][j].value = parseInt(string.charAt(index));
          if (array[i][j].value != 0) {
            array[i][j].isDone = true;
          }
          index++;
        }
      }
      return array;
    },
  },
  beforeMount() {
      this.getRandomBoard();
    }
}
</script>

<style scoped>
.btn-primary-1 {
  background-color: #227C9D !important;
  color: white !important;
}

.sud-container {
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}
</style>

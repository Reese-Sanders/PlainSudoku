<template>
  <div id="sudoku-board" ref="theGame">
    <div class="sud-container">
      <p class="text-end"><em>Mistakes: {{getMistakes}}</em></p>
    </div>
    <div class="d-flex justify-content-center">
      <table :key="this.$root.$data.currentBoard" ref="table">
        <tr v-for="(row, index) in unsolvedBoard" :key="'row:' + index" >
          <td v-for="(collumns, index1) in row" :key="'col' + index1" :id="makeID(index,index1)" @click="e => e.target.classList.toggle('td-active')" v-html="displayValue(index, index1)">
          </td>
        </tr>
      </table>
    </div>
    <div class="d-flex justify-content-center">
      <div class="d-flex flex-wrap justify-content-around sud-container">
        <button v-for="(button, index) in buttons" type="button" v-bind:class="[buttonClassArray]" v-on:click="addNumber(index)" :key="index">{{button.varName}}</button>
        <!-- <button type="button" v-bind:class="[buttonClassArray, {active: buttons[0]}]" v-on:click="setTrue(0)">1</button>
        <button type="button" class="btn btn-primary" v-bind:class="{active: buttons[1]}">2</button>
        <button type="button" class="btn btn-primary" v-bind:class="{active: buttons[2]}">3</button>
        <button type="button" class="btn btn-primary" v-bind:class="{active: buttons[3]}">4</button>
        <button type="button" class="btn btn-primary" v-bind:class="{active: buttons[4]}">5</button>
        <button type="button" class="btn btn-primary" v-bind:class="{active: buttons[5]}">6</button>
        <button type="button" class="btn btn-primary" v-bind:class="{active: buttons[6]}">7</button>
        <button type="button" class="btn btn-primary" v-bind:class="{active: buttons[7]}">8</button>
        <button type="button" class="btn btn-primary" v-bind:class="{active: buttons[8]}">9</button>
        <button type="button" class="" v-bind:class="{active: buttons[9]}">Undo</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boardComp",
  data() {
    return {
      buttonClassArray: ['btn', 'btn-primary-1', 'm-1'],
      buttons: [
        {active: false,
        varName: "1"},
        {active: false,
        varName: "2"},
        {active: false,
        varName: "3"},
        {active: false,
        varName: "4"},
        {active: false,
        varName: "5"},
        {active: false,
        varName: "6"},
        {active: false,
        varName: "7"},
        {active: false,
        varName: "8"},
        {active: false,
        varName: "9"},
        {active: false,
        varName: "Undo"},
      ],
      isFinished: false,
      mistakes: 0
    }
  }, 
  props: {
    unsolvedBoard: Array,
    solvedBoard: Array
  },
  computed: {
    getMistakes() {
      return this.mistakes;
    }
  },
  methods: {
    show: function() {
      console.log(this.unsolvedBoard);
    },
    makeID: function(i, j) {
      return `${i}${j}`
    },
    undoGuess: function() {

    },
    switchBool: function(index) {
      if (index == 9) {
        this.undoGuess();
      }
      else if (this.buttons[index].active == false) {
        this.buttons[index].active = true;
      }
      this.buttons[index].active = false;
    },
    displayValue: function(i, j) {
      if (this.unsolvedBoard[i][j].isDone == true) {
        return this.unsolvedBoard[i][j].value;
      } else {
        return " "
      }
    },
    addNumber: function(num) {
      num++
      
      //console.log(this.$refs.table.getElementsByClassName('td-active'));
      let toAdds = this.$refs.table.getElementsByClassName('td-active');
      //console.log(toAdds.length);
      for (let i = toAdds.length-1; i > -1; i--) {
        let orig = this.mistakes;
        //console.log(i);
        var fullIndex = toAdds[i].id;
        console.log(fullIndex);
        let index1 = parseInt(fullIndex[0]);
        let index2 = parseInt(fullIndex[1]);
        let valObj = this.unsolvedBoard[index1][index2];
        let corrValObj = this.solvedBoard[index1][index2];
        
        if (valObj.isDone == true) {
          toAdds[i].classList.remove('td-active');
          toAdds[i].classList.add("correct-guess");
          continue;
        }
        if (num == 10) {
          toAdds[i].innerHTML = ""
          toAdds[i].classList.remove("incorrect-guess");
        } else {
          toAdds[i].innerHTML = num;
          if (corrValObj.value === num) {
            valObj.value = num;
            valObj.isDone = true;
            this.checkIfFinish();
            toAdds[i].classList.remove("incorrect-guess");
          } else {
            orig++;
            toAdds[i].classList.add("incorrect-guess")
          }
        }
        toAdds[i].classList.remove('td-active');
        if (orig != this.mistakes) {
          this.mistakes++;
        }
      }
    },
    checkIfFinish: function () {
      this.isFinished = true;
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (!this.unsolvedBoard[i][j].isDone) this.isFinished = false;
        }
      }
      if (this.isFinished) {
        this.$refs.theGame.innerHTML += '<h2 class="text-center">Congratulations! You\'re one smart cookie!</h2>';
      }
    }
  }
}
</script>

<style>
table, th, td {
  border: 1px solid !important;
}

table {
  border: 3px solid !important;
  font-size:2em;
  cursor: default;
}

td {
  width: 50px;
  height: 50px;
  text-align: center;
}
td:nth-child(3n) {
  border-right: 3px solid !important;
}

tr:nth-child(3n) {
  border-bottom: 3px solid !important;
}

.td-active {
  background-color:#FFCB77 !important;
}

.incorrect-guess {
  color: #FE6D73;
}

.sud-container {
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}

.btn-primary-1 {
  background-color: #227C9D !important;
  color: white !important;
}

.correct-guess {
  color:rgba(0, 0, 0, 0.342)
}

</style>

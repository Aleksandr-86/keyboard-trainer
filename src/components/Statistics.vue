<script setup>
import store from '/src/services/store.js'
import { rnd } from '/src/services/helpers.js'
import { msToMinutes } from '/src/services/helpers.js'

let numCorrect = 0
let numWrong = 0
let numChars = 0

function calcStat() {
  store.data.statArr.forEach((element) => {
    if (element === '1') {
      numCorrect++
      numChars++
    } else if (element === '2') {
      numWrong++
      numChars++
    }
  })
}
calcStat()

// forming the string
let tempStr = ''
if (numChars >= 11 && numChars <= 14) {
  tempStr = `Всего набрано <b>${numChars}</b> знаков, из них:`
} else if (numChars % 10 === 1) {
  tempStr = `Всего набран <b>${numChars}</b> знак:`
} else if (numChars % 10 >= 2 && numChars % 10 <= 4) {
  tempStr = `Всего набрано <b>${numChars}</b> знака, из них:`
} else if (numChars % 10 === 0 || (numChars % 10 >= 5 && numChars % 10 <= 9)) {
  tempStr = `Всего набрано <b>${numChars}</b> знаков, из них:`
}

const strCorrectPercent = `(${rnd((numCorrect * 100) / numChars)}%)`
const strWrongPercent = `(${rnd((numWrong * 100) / numChars)}%)`
</script>

<template>
  <div class="stat-base">
    <h3>Результат</h3>
    <button class="stat-close">+</button>

    <div class="stat-first-row">Время набора:</div>
    <div class="stat-second-row">время</div>

    <div class="stat-first-row">Cкорость набора, зн/мин:</div>
    <div class="stat-second-row">скорость</div>

    <div class="stat-first-row" v-html="tempStr"></div>
    <div class="stat-second-row"></div>

    <div class="stat-first-row">- правильных</div>
    <div class="stat-second-row">
      <div>{{ numCorrect }}</div>
      <div class="num-correct">{{ strCorrectPercent }}</div>
    </div>

    <div class="stat-first-row">- ошибочных</div>
    <div class="stat-second-row">
      <div>{{ numWrong }}</div>
      <div class="num-wrong">{{ strWrongPercent }}</div>
    </div>

    <div>
      <div class="stat-first-row">Знаков подряд без ошибки:</div>
      <div class="stat-second-row">{{ store.data.withoutMistake }}</div>
    </div>
  </div>
</template>

<style>
.stat-base {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72vh;
  height: auto;

  font-size: 3vh;

  background-color: rgb(215, 215, 215);
  padding: 2vh;
  border-radius: 1vh;
  box-shadow: 0 1vh 3vh rgba(0, 0, 0, 0.3);
  z-index: 10;

  overflow: hidden;
  transition: visibility 300ms, opacity 300ms;
}

h3 {
  margin-top: -1.3vh;
  margin-bottom: 1vh;
  text-align: center;
}

.stat-close {
  display: inline-block;
  font-size: 5vh;
  border: none;
  background: none;
  user-select: none;
  position: absolute;
  z-index: 1;
  top: -1vh;
  right: 0.4vh;
  cursor: pointer;
  transform: rotate(45deg);
  color: black;
}

.stat-close:hover {
  transform: rotate(45deg) scale(1.1);
  color: darkviolet;
  transition: all 300ms ease-in-out;
}

.num-total,
.num-correct,
.num-wrong,
.num-max {
  display: inline-grid;
  margin-left: 1vh;
}

.num-correct {
  color: rgb(0, 160, 40);
}

.num-wrong {
  color: rgb(205, 50, 50);
}

.stat-first-row,
.stat-second-row {
  display: inline-block;
  vertical-align: top;
  white-space: normal;
  /* background: #fff2e1; */
}

.stat-first-row {
  width: 67%;
  text-align: left;
  margin-right: 1%;
}

.stat-second-row {
  display: inline-flex;
  justify-content: center;
  width: 32%;
  text-align: center;
}
</style>

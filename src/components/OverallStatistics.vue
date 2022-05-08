<script setup>
import { onUnmounted } from 'vue'
import store from '../services/store.js'
import { rnd } from '../services/helpers.js'
import { msToMinutes } from '../services/helpers.js'
import { computed } from '@vue/reactivity'

const numCorrect = store.data.numCorrect
const numWrong = store.data.numWrong
const numTotal = numCorrect + numWrong

// forming the temp string
let tempStr = ''
if (numTotal >= 11 && numTotal <= 14) {
  tempStr = `Всего набрано <b>${numTotal}</b> знаков, в том числе:`
} else if (numTotal % 10 === 1) {
  tempStr = `Всего набран <b>${numTotal}</b> знак, в том числе:`
} else if (numTotal % 10 >= 2 && numTotal % 10 <= 4) {
  tempStr = `Всего набрано <b>${numTotal}</b> знака, в том числе:`
} else if (numTotal % 10 === 0 || (numTotal % 10 >= 5 && numTotal % 10 <= 9)) {
  tempStr = `Всего набрано <b>${numTotal}</b> знаков, в том числе:`
}

const strCorrectPercent = `(${rnd((numCorrect * 100) / numTotal, 2)}%)`
const strWrongPercent = `(${rnd((numWrong * 100) / numTotal, 2)}%)`
const charPerSecond = rnd((numTotal * 60) / (store.data.elapsedTime / 1000))

const isSnippet = typeof store.data.currentBook === 'object'
const book = store.data.currentBook

onUnmounted(() => {
  store.state.bTimer = false
  store.data.tempWithoutMistake = 0
  store.data.withoutMistake = 0

  store.data.elapsedTime = 0
  store.data.elapsedTimeStr = '00:00.00'

  store.data.numCorrect = 0
  store.data.numWrong = 0

  store.data.currentBook = 0
})
</script>

<template>
  <div class="stat-container">
    <h4 v-if="isSnippet">Результат набора отрывка из книги:</h4>
    <h4 v-else>Результат набора текста из буфера обмена</h4>

    <h4 v-if="isSnippet" class="stat-violet">«{{ book.title }}»</h4>
    <h4 v-if="isSnippet" class="stat-violet">{{ book.author }}</h4>
    <label @click.left="store.setFalse('overallStatistics')" class="stat-close">
      +
    </label>
    <!-- <div class="stat-first-row" v-if="isSnippet">Автор: {{}}</div>
    <div class="stat-second-row" v-if="isSnippet">
      store.data.currentBook.name
    </div> -->

    <div class="stat-first-row">Время набора:</div>
    <div class="stat-time">
      {{ store.data.elapsedTimeStr.split('.')[0] }}
    </div>
    <span class="stat-ms">.{{ store.data.elapsedTimeStr.split('.')[1] }}</span>

    <div class="stat-first-row">Cкорость набора, зн/мин:</div>
    <div class="stat-second-row">{{ charPerSecond }}</div>

    <div class="stat-line" v-html="tempStr"></div>

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

    <div class="stat-flex">
      <div class="first-column">
        Максимальное количество знаков подряд без ошибки:
      </div>
      <div class="second-column">{{ store.data.withoutMistake }}</div>
    </div>
  </div>
  <div
    @click.left="store.setFalse('overallStatistics')"
    v-if="store.state.overallStatistics"
    class="overlay"></div>
</template>

<style>
.stat-line {
  float: left;
}

.stat-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: aquamarine;
}

.first-column {
  background-color: pink;
  text-align: left;
  width: 67%;
}

.second-column {
  background-color: hsl(34, 78%, 71%);
  font-weight: bold;
  width: 32%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.2vh);
  z-index: 5;

  /* transition: visibility 300ms, opacity 300ms; */
}

.stat-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 72vh; */
  width: 72vh;
  height: auto;

  font-size: 3vh;

  background-color: rgb(215, 215, 215);
  padding: 2vh;
  border-radius: 1vh;
  /* box-shadow: 0 1vh 3vh rgba(0, 0, 0, 0.3); */
  box-shadow: 0 0 10vh 1vh rgba(0, 0, 0, 0.5);
  z-index: 10;

  overflow: hidden;
  /* transition: visibility 300ms, opacity 300ms; */
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

h4 {
  margin-top: -1.3vh;
  margin-bottom: 1vh;
  text-align: center;
}

.stat-violet {
  /* color: hsl(282, 100%, 23%); */
  color: hsl(282, 100%, 25%);
}

.num-total,
.num-correct,
.num-wrong,
.num-max {
  /* display: inline-grid; */
  margin-left: 1vh;
}

.num-correct {
  /* color: hsl(135, 100%, 30%); */
  color: hsl(135, 100%, 30%);
}

.num-wrong {
  color: hsl(0, 100%, 35%);
}

.stat-first-row {
  float: left;
  width: 67%;
  text-align: left;
  margin-right: 1%;
  background-color: aqua;
}

.stat-second-row {
  display: flex;
  justify-content: center;
  width: 32%;
  font-weight: bold;
  background-color: antiquewhite;
}

.stat-time {
  display: inline-flex;
  font-weight: bold;
}

.stat-ms {
  position: fixed;
  color: hsl(240, 80%, 30%);
  /* color: hsla(0, 0%, 0%, 0.4); */
  font-weight: bold;
}
</style>

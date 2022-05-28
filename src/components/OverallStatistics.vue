<script setup>
import { onMounted, onUnmounted } from 'vue'
import store from '../services/store.js'
import { rnd } from '../services/helpers.js'
import { computed } from '@vue/reactivity'

// forming the temp string
const tempStr = computed(() => {
  const numTotal = store.data.numCorrect + store.data.numWrong

  if (numTotal >= 11 && numTotal <= 14) {
    return `Всего набрано <b>${numTotal}</b> знаков, из них:`
  } else if (numTotal % 10 === 1) {
    return `Всего набран <b>${numTotal}</b> знак, из них:`
  } else if (numTotal % 10 >= 2 && numTotal % 10 <= 4) {
    return `Всего набрано <b>${numTotal}</b> знака, из них:`
  } else if (
    numTotal % 10 === 0 ||
    (numTotal % 10 >= 5 && numTotal % 10 <= 9)
  ) {
    return `Всего набрано <b>${numTotal}</b> знаков, из них:`
  }
})

const strCorrectPercent = computed(
  () =>
    `(${rnd(
      (store.data.numCorrect * 100) /
        (store.data.numCorrect + store.data.numWrong),
      2
    )}%)`
)
const strWrongPercent = computed(
  () =>
    `(${rnd(
      (store.data.numWrong * 100) /
        (store.data.numCorrect + store.data.numWrong),
      2
    )}%)`
)
const charPerSecond = computed(() =>
  rnd(
    ((store.data.numCorrect + store.data.numWrong) * 60) /
      (store.data.elapsedTime / 1000)
  )
)

const isSnippet = typeof store.data.currentBook === 'object'
const book = store.data.currentBook

const titleColor = computed(() => store.storage.overallStatistics.title)
const msColor = computed(() => store.storage.overallStatistics.ms)
const correctColor = computed(() => store.storage.overallStatistics.correct)
const wrongColor = computed(() => store.storage.overallStatistics.wrong)

function keyDown(e) {
  if (e.key === 'Tab') {
    e.preventDefault()
  } else if (e.key === 'Enter') {
    store.state.overallStatistics = false
    document.body.querySelector(store.data.focusElement).focus()
  }
}

onMounted(() => {
  const statArr = store.data.statArr

  for (let i = 0; i < statArr.length; i++) {
    const element = statArr[i]
    if (element === '1') {
      store.data.numCorrect++
    } else if (element === '2') {
      store.data.numWrong++
    }
  }

  statistics.focus()
})

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

// const withoutMistake = store.data.numWrong === 0
</script>

<template>
  <div class="stat-container" id="statistics" tabindex="1" @keydown="keyDown">
    <h4 v-if="isSnippet">Результат набора отрывка из книги:</h4>
    <h4 v-else>Результат набора текста из буфера обмена</h4>

    <h4 v-if="isSnippet" class="stat-violet">«{{ book.title }}»</h4>
    <h4 v-if="isSnippet" class="stat-violet">{{ book.author }}</h4>

    <div class="stat-first-column">Время набора:</div>
    <div class="stat-time">
      {{ store.data.elapsedTimeStr.split('.')[0] }}
    </div>
    <span class="stat-ms">.{{ store.data.elapsedTimeStr.split('.')[1] }}</span>

    <div class="stat-first-column">Cкорость набора, зн/мин:</div>
    <div class="stat-second-column">{{ charPerSecond }}</div>

    <div
      v-if="store.data.numWrong === 0"
      class="stat-line"
      v-html="tempStr.split(',')[0] + ' без единой ошибки.'"></div>
    <div v-else>
      <div class="stat-row-last">
        <div class="stat-first-column" v-html="tempStr"></div>
      </div>

      <div class="stat-first-column">- правильных</div>
      <div class="stat-second-column">
        <div>{{ store.data.numCorrect }}</div>
        <div class="stat-green">{{ strCorrectPercent }}</div>
      </div>

      <div class="stat-first-column">- ошибочных</div>
      <div class="stat-second-column">
        <div>{{ store.data.numWrong }}</div>
        <div class="stat-red">{{ strWrongPercent }}</div>
      </div>

      <div class="stat-row-last">
        <div class="stat-first-column">
          Максимальное количество знаков подряд без ошибки:
        </div>
        <div class="stat-second-column">{{ store.data.withoutMistake }}</div>
      </div>
    </div>
  </div>
  <div
    @click.left="store.setFalse('overallStatistics')"
    v-if="store.state.overallStatistics"
    class="stat-overlay"></div>
</template>

<style scoped>
.stat-overlay {
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
  width: 72vh;
  height: auto;

  font-size: 3vh;

  background-color: rgb(215, 215, 215);
  padding: 2vh;
  border-radius: 1vh;
  /* box-shadow: 0 1vh 3vh rgba(0, 0, 0, 0.3); */
  box-shadow: 0 0 10vh 1vh rgba(0, 0, 0, 0.5);
  z-index: 10;
  user-select: none;
  overflow: hidden;
  outline: none;
  /* transition: visibility 300ms, opacity 300ms; */
}

h4 {
  margin-top: -1.3vh;
  margin-bottom: 1vh;
  text-align: center;
  overflow-wrap: break-word;
}

.stat-violet {
  /* color: hsl(282, 100%, 23%); */
  color: v-bind(titleColor);
}

.stat-green {
  /* color: hsl(135, 100%, 30%); */
  color: v-bind(correctColor);
  margin-left: 1vh;
}

.stat-red {
  color: v-bind(wrongColor);
  margin-left: 1vh;
}

.stat-first-column {
  float: left;
  width: 67%;
  text-align: left;
  margin-right: 1%;
}

.stat-second-column {
  display: flex;
  justify-content: center;
  width: 32%;
  font-weight: bold;
}

.stat-time {
  display: inline-flex;
  font-weight: bold;
}

.stat-ms {
  position: fixed;
  color: v-bind(msColor);
  font-weight: bold;
}

.stat-line {
  float: left;
}

.stat-row-last {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
</style>

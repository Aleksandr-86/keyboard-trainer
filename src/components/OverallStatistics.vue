<script setup>
import { onMounted, onUnmounted } from 'vue'
import { rnd } from '../services/helpers.js'
import { computed } from '@vue/reactivity'
import { data } from '../store/data.js'
import { state } from '../store/state.js'
import { storage } from '../store/storage.js'

// forming the temp string
const tempStr = computed(() => {
  const numTotal = data.numCorrect + data.numWrong + data.numRevised

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
      ((data.numCorrect + data.numRevised) * 100) /
        (data.numCorrect + data.numWrong + data.numRevised),
      2
    )}%)`
)

const strWrongPercent = computed(
  () =>
    `(${rnd(
      (data.numWrong * 100) /
        (data.numCorrect + data.numWrong + data.numRevised),
      2
    )}%)`
)

const charPerSecond = computed(() =>
  rnd(
    ((data.numCorrect + data.numWrong - data.numRevised) * 60) /
      (data.elapsedTime / 1000)
  )
)

const isSnippet = typeof data.currentBook === 'object'
const book = data.currentBook

const titleColor = computed(() => storage.overallStatistics.title)
const msColor = computed(() => storage.overallStatistics.ms)
const correctColor = computed(() => storage.overallStatistics.correct)
const wrongColor = computed(() => storage.overallStatistics.wrong)

function keyDown(e) {
  if (e.key === 'Tab') {
    e.preventDefault()
  } else if (e.key === 'Enter') {
    state.overallStatistics = false
    document.body.querySelector(data.focusElement).focus()
  }
}

const textSize = computed(() => {
  let size = 0
  for (let i = 0; i < data.fragmentArr.length; i++) {
    const char = data.fragmentArr[i]
    if (char === 'end') break
    if (char === 'skip') continue
    size++
  }
  return size
})

onMounted(() => {
  // const statArr = data.statArr

  // for (let i = 0; i < statArr.length; i++) {
  //   const element = statArr[i]
  //   if (element === '1') {
  //     data.numCorrect++
  //   } else if (element === '2') {
  //     data.numWrong++
  //   }
  // }

  statistics.focus()
})

onUnmounted(() => {
  state.bTimer = false
  data.tempWithoutMistake = 0
  data.withoutMistake = 0

  data.elapsedTime = 0
  data.elapsedTimeStr = '00:00.00'

  data.numCorrect = 0
  data.numWrong = 0

  data.currentBook = 0
})
</script>

<template>
  <div class="stat-container" id="statistics" tabindex="1" @keydown="keyDown">
    <h4 v-if="isSnippet">Результат набора отрывка из книги:</h4>
    <h4 v-else>Результат набора текста из буфера обмена</h4>

    <h4 v-if="isSnippet" class="stat-violet">«{{ book.title }}»</h4>
    <h4 v-if="isSnippet" class="stat-violet">{{ book.author }}</h4>

    <div class="stat-line"></div>

    <div class="stat-first-column">Время набора:</div>
    <div class="stat-second-column">
      <div>{{ data.elapsedTimeStr.split('.')[0] }}</div>
      <div class="stat-ms">.{{ data.elapsedTimeStr.split('.')[1] }}</div>
    </div>

    <div class="stat-first-column">Cкорость набора, зн/мин:</div>
    <div class="stat-second-column">{{ charPerSecond }}</div>

    <div class="stat-line"></div>

    <div
      v-if="data.numWrong === 0"
      class="stat-float-left"
      v-html="tempStr.split(',')[0] + ' без единой ошибки.'"></div>
    <div v-else>
      <div class="stat-first-column">Объём текста, зн:</div>
      <div class="stat-second-column">{{ textSize }}</div>

      <div class="stat-row-last">
        <div class="stat-first-column" v-html="tempStr"></div>
      </div>

      <div
        v-if="data.numCorrect !== 0 && data.numRevised !== 0"
        class="stat-first-column">
        - правильных и исправленных
      </div>
      <div
        v-else-if="data.numCorrect !== 0 && data.numRevised === 0"
        class="stat-first-column">
        - правильных
      </div>
      <div v-else class="stat-first-column">- исправленных</div>
      <div class="stat-second-column">
        <div>{{ data.numCorrect + data.numRevised }}</div>
        <div class="stat-green">{{ strCorrectPercent }}</div>
      </div>

      <div class="stat-first-column">- ошибочных</div>
      <div class="stat-second-column">
        <div>{{ data.numWrong }}</div>
        <div class="stat-red">{{ strWrongPercent }}</div>
      </div>

      <div class="stat-line"></div>

      <div class="stat-row-last">
        <div class="stat-first-column">
          Максимальное количество знаков подряд без ошибки:
        </div>
        <div class="stat-second-column">{{ data.withoutMistake }}</div>
      </div>
    </div>
  </div>
  <div
    @click.left="state.overallStatistics = false"
    v-if="state.overallStatistics"
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

.stat-line {
  border-bottom: 0.1vh solid black;
  margin-top: 0.5vh;
  width: 100%;
}

.stat-violet {
  color: v-bind(titleColor);
}

.stat-green {
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
  color: v-bind(msColor);
  font-weight: bold;
}

.stat-float-left {
  float: left;
}

.stat-row-last {
  display: flex;
  align-items: flex-end;
  width: 100%;
}
</style>

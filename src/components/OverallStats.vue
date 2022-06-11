<script setup>
import { onMounted, onUnmounted } from 'vue'
import { rnd } from '../services/helpers.js'
import { computed } from '@vue/reactivity'
import { data } from '../store/data.js'
import { state } from '../store/state.js'
import { storage } from '../store/storage.js'

const strCorrectPercent = computed(
  () =>
    `(${rnd((data.numCorrect * 100) / (data.numCorrect + data.numErrors), 2)}%)`
)

const strErrorsPercent = computed(
  () =>
    `(${rnd((data.numErrors * 100) / (data.numCorrect + data.numErrors), 2)}%)`
)

const finalCharPerMin = computed(() =>
  rnd((data.numDialed * 60) / (data.elapsedTime / 1000))
)

const isSnippet = typeof data.currentBook === 'object'

const book = data.currentBook

const titleColor = computed(() => storage.overallStats.title)
const msColor = computed(() => storage.overallStats.ms)
const correctColor = computed(() => storage.overallStats.correct)
const wrongColor = computed(() => storage.overallStats.wrong)

function keyDown(e) {
  if (e.key === 'Tab') {
    e.preventDefault()
  } else if (e.key === 'Enter') {
    state.overallStats = false
    document.body.querySelector(data.classSelector).focus()
  }
}

onMounted(() =>
  document.body.querySelector('.overall-stats__container').focus()
)

onUnmounted(() => {
  state.bTimer = false
  data.tempErrorFree = 0
  data.ErrorFree = 0

  data.elapsedTime = 0
  data.elapsedTimeStr = '00:00.00'

  data.numDialed = 0
  data.numCorrect = 0
  data.numErrors = 0

  data.currentBook = 0
})
</script>

<template>
  <div>
    <div class="overall-stats__container" tabindex="1" @keydown="keyDown">
      <h4 v-if="isSnippet">Результат набора отрывка из книги:</h4>
      <h4 v-else>Результат набора текста из буфера обмена</h4>

      <h4 v-if="isSnippet" class="overall-stats__title">«{{ book.title }}»</h4>
      <h4 v-if="isSnippet" class="overall-stats__title">{{ book.author }}</h4>

      <div class="overall-stats__line"></div>

      <div class="overall-stats__first-column">Время набора:</div>
      <div class="overall-stats__second-column">
        <div>{{ data.elapsedTimeStr.split('.')[0] }}</div>
        <div class="overall-stats__milliseconds">
          .{{ data.elapsedTimeStr.split('.')[1] }}
        </div>
      </div>

      <div class="overall-stats__first-column">Количество знаков отрывка:</div>
      <div class="overall-stats__second-column">{{ data.numDialed }}</div>

      <div class="overall-stats__first-column">Cкорость набора, зн/мин:</div>
      <div class="overall-stats__second-column">{{ finalCharPerMin }}</div>

      <div v-if="data.numErrors !== 0" class="overall-stats__line"></div>

      <template
        v-if="
          (data.numCorrect !== 0 && data.numCorrect !== data.numDialed) ||
          data.numErrors !== 0
        ">
        <div class="overall-stats__last-row">
          <div class="overall-stats__first-column">Количество:</div>
          <div class="overall-stats__second-column"></div>
        </div>

        <template v-if="data.numCorrect !== 0">
          <div class="overall-stats__first-column">
            - правильно введённых знаков:
          </div>
          <div class="overall-stats__second-column">
            <div>{{ data.numCorrect }}</div>
            <div class="overall-stats__correct-percent">
              {{ strCorrectPercent }}
            </div>
          </div>
        </template>

        <template v-if="data.numErrors !== 0">
          <div class="overall-stats__first-column">- ошибок:</div>
          <div class="overall-stats__second-column">
            <div>{{ data.numErrors }}</div>
            <div class="overall-stats__wrong-percent">
              {{ strErrorsPercent }}
            </div>
          </div>
        </template>

        <div class="overall-stats__line"></div>

        <div class="overall-stats__last-row">
          <div class="overall-stats__first-column">
            Максимальное количество знаков подряд без ошибки:
          </div>
          <div class="overall-stats__second-column">{{ data.ErrorFree }}</div>
        </div>
      </template>

      <div v-else>
        <div class="overall-stats__line"></div>
        <div class="overall-stats__last-row">
          Отрывок набран без единой ошибки 🎉
        </div>
      </div>
    </div>

    <div
      @click.left="state.overallStats = false"
      v-if="state.overallStats"
      class="overall-stats__overlay"></div>
  </div>
</template>

<style>
.overall-stats__overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.2vh);
}

.overall-stats__container {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  width: 72vh;
  height: auto;
  padding: 2vh;
  font-size: 3vh;
  background-color: rgb(215, 215, 215);
  border-radius: 1vh;
  box-shadow: 0 0 10vh 1vh rgba(0, 0, 0, 0.5);
  overflow: hidden;
  outline: none;
  user-select: none;
}

h4 {
  margin-top: -1.3vh;
  margin-bottom: 1vh;
  text-align: center;
  overflow-wrap: break-word;
}

.overall-stats__line {
  width: 100%;
  margin-top: 0.5vh;
  border-bottom: 0.1vh solid black;
}

.overall-stats__title {
  color: v-bind(titleColor);
}

.overall-stats__correct-percent {
  margin-left: 1vh;
  color: v-bind(correctColor);
}

.overall-stats__wrong-percent {
  margin-left: 1vh;
  color: v-bind(wrongColor);
}

.overall-stats__first-column {
  float: left;
  width: 67%;
  margin-right: 1%;
  text-align: left;
}

.overall-stats__second-column {
  display: flex;
  justify-content: center;
  width: 32%;
  font-weight: bold;
}

.stat-time {
  display: inline-flex;
  font-weight: bold;
}

.overall-stats__milliseconds {
  font-weight: bold;
  color: v-bind(msColor);
}

.stat-float-left {
  float: left;
}

.overall-stats__last-row {
  display: flex;
  align-items: flex-end;
  width: 100%;
}
</style>

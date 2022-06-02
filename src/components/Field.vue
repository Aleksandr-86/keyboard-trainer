<script setup>
import { onMounted, onUnmounted, reactive, computed } from 'vue'
import { data, recordingStatistics, moveCaret } from '/src/services/data.js'
import { charTest, msToMinutes, isAuxiliaryKeys } from '../services/helpers.js'
import CurrentStatistics from './CurrentStatistics.vue'
import Keyboard from './Keyboard.vue'
import { state } from '../services/state.js'
// import storage from '/src/services/storage.js'
import { storage } from '/src/services/storage.js'

const events = reactive({
  keyDn: Object,
  keyUp: Object,
  keyValue: {},
  capsLock: false
})

//  stats
const statArr = computed(() => data.statArr)
const indexArr = computed(() => data.indexArr)
const firstIndex = computed(() => data.firstIndex)

// colors
const fieldBackground = computed(() => storage.field.background)
const charBackground = computed(() => storage.field.charBackground)
const charColor = computed(() => storage.field.charColor)
const charCorrectColor = computed(() => storage.field.charCorrectColor)
const charWrongColor = computed(() => storage.field.charWrongColor)
const charSpecialColor = computed(() => storage.field.charSpecialColor)
const caretBackground = computed(() => storage.field.caretBackground)

// shadows
const charCorrectShadow = computed(() => {
  if (storage.shadow.charCorrect) {
    return 'drop-shadow(3px 2px 2px)'
  } else {
    return 'none'
  }
})

const charWrongShadow = computed(() => {
  if (storage.shadow.charWrong) {
    return 'drop-shadow(3px 2px 2px)'
  } else {
    return 'none'
  }
})

const charSpecialShadow = computed(() => {
  if (storage.shadow.charSpecial) {
    return 'drop-shadow(3px 2px 2px)'
  } else {
    return 'none'
  }
})

// chars for field
const charsArr = computed(() =>
  data.fragmentArr.slice(data.firstIndex, data.firstIndex + 200)
)

function soundPath() {
  return new URL('/src/sounds/type.mp3', import.meta.url).href
}

// event listener
const eListener = function (e) {
  if (state.settings) return

  events.keyDn = e
  const code = e.code
  events.keyValue = e.key

  if (data.indexArr === 0 && code === 'Enter') {
    return
  } else if (data.indexArr !== 0 && code === 'Enter') {
    data.timerStop = performance.now()
    state.work = false
    state.overallStatistics = true
    return
  }

  if (isAuxiliaryKeys(code)) {
    e.preventDefault()
    return
  }

  // audio.pause()
  // audio.currentTime = 0
  // console.warn(new URL('/src/sounds/type.mp3', import.meta.url).href)

  if (storage.main.speaker) {
    const audio = new Audio()
    // audio.src = '/src/sounds/type.mp3'
    // audio.src = 'http://localhost:3000/src/sounds/type.mp3'
    // audio.src = new URL('/src/sounds/type.mp3', import.meta.url).href
    audio.src = soundPath()
    audio.volume = storage.main.volume
    audio.play()
  }

  // timer on
  if (!state.bTimer) {
    state.bTimer = true
    data.timerStart = performance.now()

    // creating and updating reactive elapsed time variables
    data.stopwatch = setInterval(() => {
      data.elapsedTime = performance.now() - data.timerStart
      data.elapsedTimeStr = msToMinutes(data.elapsedTime)
      let charPerMin = Math.floor(
        ((data.numCorrect + data.numWrong) * 60) /
          (Math.floor(data.elapsedTime) / 1000)
      )
        .toString()
        .padStart(3, '0')
      if (charPerMin > 999) charPerMin = 999
      data.charPerMin = charPerMin
    }, 10)
  }

  recordingStatistics(e)
  moveCaret(code)
}

onMounted(() => {
  document.body.addEventListener('keydown', eListener)
})

onUnmounted(() => {
  document.body.removeEventListener('keydown', eListener)
  clearInterval(data.stopwatch)
  data.charPerMin = 0
})
</script>

<template>
  <CurrentStatistics v-if="storage.visibility.currentStatistics" />
  <div class="field">
    <div
      v-for="(char, index) in charsArr"
      :key="index"
      class="char"
      :class="[
        { 'char-caret': index === indexArr % 200 },
        {
          'char-special-active':
            char !== 'skip' &&
            statArr[index + firstIndex] === '0' &&
            index < indexArr % 200
        },
        { 'char-special-inactive': charTest(char) },
        {
          'char-correct': statArr[index + firstIndex] === '1' && char !== ' '
        },
        {
          'char-wrong': statArr[index + firstIndex] === '2'
        }
      ]">
      <div v-if="char === 'skip'">&nbsp;</div>
      <div v-else-if="char === 'end'">&nbsp;</div>
      <div v-else>{{ char }}</div>
    </div>
  </div>

  <Keyboard
    v-if="storage.visibility.keyboard"
    :event-keydown="events.keyDn"
    :target-char="data.fragmentArr[data.indexArr]"
    :lang="data.keyboardLayout" />
</template>

<style scoped>
@keyframes hideCursor {
  0%,
  99% {
    cursor: default;
  }
  100% {
    cursor: none;
  }
}

.field {
  width: 1440px;
  height: 380px;
  margin: 5px auto 50px;
  outline: none;
  background-color: v-bind(fieldBackground);
  filter: blur(0px);
  user-select: none;
}

.field:hover {
  cursor: none;
  animation: hideCursor 2500ms;
}

.char {
  float: left;
  width: 36px;
  height: 76px;
  font-family: 'Consolas', monospace;
  font-size: 65px;
  background: v-bind(charBackground);
  color: v-bind(charColor);
}

.char-caret {
  position: relative;
  z-index: -1;
}

.char-caret:after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 5px;
  background: v-bind(caretBackground);
}

.char-correct {
  color: v-bind(charCorrectColor);
  filter: v-bind(charCorrectShadow);
}

.char-wrong {
  color: v-bind(charWrongColor);
  filter: v-bind(charWrongShadow);
}

.char-special-inactive {
  color: v-bind(charSpecialColor);
}

.char-special-active {
  color: v-bind(charSpecialColor);
  filter: v-bind(charSpecialShadow);
}
</style>

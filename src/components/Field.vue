<script setup>
import { reactive, computed, onUnmounted, onMounted } from 'vue'
import store from '/src/services/store.js'
import { charTest, msToMinutes, isAuxiliaryKeys } from '../services/helpers.js'
import CurrentStatistics from './CurrentStatistics.vue'
import Keyboard from './Keyboard.vue'

const events = reactive({
  keyDn: Object,
  keyUp: Object,
  keyValue: {},
  capsLock: false
})

/** stats */
const statArr = computed(() => store.data.statArr)
const indexArr = computed(() => store.data.indexArr)
const firstIndex = computed(() => store.data.firstIndex)

/** colors */
const fieldBackground = computed(() => store.storage.field.background)
const charBackground = computed(() => store.storage.field.charBackground)
const charColor = computed(() => store.storage.field.charColor)
const charCorrectColor = computed(() => store.storage.field.charCorrectColor)
const charWrongColor = computed(() => store.storage.field.charWrongColor)
const charNeutralColor = computed(() => store.storage.field.charNeutralColor)
const caretBackground = computed(() => store.storage.field.caretBackground)
const caretColor = computed(() => store.storage.field.caretColor)

/** shadows */
const charCorrectShadow = computed(() => {
  if (store.storage.shadow.charCorrect) {
    return 'drop-shadow(3px 2px 2px)'
  } else {
    return 'none'
  }
})

const charWrongShadow = computed(() => {
  if (store.storage.shadow.charWrong) {
    return 'drop-shadow(3px 2px 2px)'
  } else {
    return 'none'
  }
})

// chars for field
const charsArr = computed(() =>
  store.data.fragmentArr.slice(
    store.data.firstIndex,
    store.data.firstIndex + 200
  )
)

// event listener
const eListener = function (e) {
  events.keyDn = e
  const code = e.code
  events.keyValue = e.key
  if (isAuxiliaryKeys(code)) return

  // audio.pause()
  // audio.currentTime = 0

  // const audio = new Audio()
  // audio.src = '/src/sounds/type.mp3'
  // audio.volume = 0.1
  // audio.play()

  events.capsLock = e.getModifierState && e.getModifierState('CapsLock')
  // console.log(events.capsLock)

  // timer on
  if (!store.state.bTimer) {
    store.state.bTimer = true
    store.data.timerStart = performance.now()

    // creating and updating reactive elapsed time variables
    store.data.stopwatch = setInterval(() => {
      store.data.elapsedTime = performance.now() - store.data.timerStart
      store.data.elapsedTimeStr = msToMinutes(store.data.elapsedTime)
      let charPerMin = Math.floor(
        ((store.data.numCorrect + store.data.numWrong) * 60) /
          (Math.floor(store.data.elapsedTime) / 1000)
      )
        .toString()
        .padStart(3, '0')
      if (charPerMin > 999) charPerMin = 999
      store.data.charPerMin = charPerMin
    }, 10)
  }

  store.recordingStatistics(e)
  store.moveCaret('')
}

onMounted(() => {
  document.body.addEventListener('keydown', eListener)
})

onUnmounted(() => {
  document.body.removeEventListener('keydown', eListener)
  clearInterval(store.data.stopwatch)
  store.data.charPerMin = 0
})
</script>

<template>
  <CurrentStatistics />
  <div class="field">
    <div
      v-for="(char, index) in charsArr"
      :key="index"
      class="char"
      :class="[
        { 'char-caret': index === indexArr % 200 },
        {
          'char-neutral-active':
            char !== 'skip' &&
            statArr[index + firstIndex] === '0' &&
            index < indexArr % 200
        },
        { 'char-neutral-inactive': charTest(char) },
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
    v-if="!store.storage.keyboard && store.state.work"
    :event-keydown="events.keyDn"
    :target-char="store.data.fragmentArr[store.data.indexArr]"
    :lang="store.data.keyboardLayout" />
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
  backdrop-filter: blur(200px);
  background-color: v-bind(fieldBackground);
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
  color: v-bind(caretColor);
  filter: drop-shadow(3px 2px 2px);
}

.char-correct {
  color: v-bind(charCorrectColor);
  /* filter: drop-shadow(3px 2px 2px) brightness(95%); */
  filter: v-bind(charCorrectShadow);
}

.char-wrong {
  color: v-bind(charWrongColor);
  filter: v-bind(charWrongShadow);
}

.char-neutral-inactive {
  color: v-bind(charNeutralColor);
}

.char-neutral-active {
  color: v-bind(charNeutralColor);
  filter: drop-shadow(3px 2px 2px);
}
</style>

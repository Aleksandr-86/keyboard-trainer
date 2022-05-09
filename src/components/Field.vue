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

const statArr = computed(() => store.data.statArr)
const indexArr = computed(() => store.data.indexArr)
const firstIndex = computed(() => store.data.firstIndex)

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
      store.data.charPerMin = Math.floor(
        ((store.data.numCorrect + store.data.numWrong) * 60) /
          (Math.floor(store.data.elapsedTime) / 1000)
      )
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
      <div v-if="char === 'skip'">&nbsp</div>
      <div v-else-if="char === 'end'">&nbsp</div>
      <div v-else>{{ char }}</div>
    </div>
  </div>

  <Keyboard
    v-if="!store.storage.keyboard && store.state.work"
    :event-keydown="events.keyDn"
    :target-char="store.data.fragmentArr[store.data.indexArr]"
    :lang="store.data.keyboardLayout" />
</template>

<style>
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
  user-select: none;
}

.field:hover {
  cursor: none;
  animation: hideCursor 2500ms;
}

.line {
  width: inherit;
  height: 76px;
}

.char {
  float: left;
  width: 36px;
  height: 76px;
  font-family: 'Consolas', monospace;
  font-size: 65px;
  background: rgba(50, 50, 50, 0.75);
  color: rgb(165, 165, 165);
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
  background: rgba(50, 50, 50, 0.75);
  filter: drop-shadow(3px 2px 2px yellowgreen) brightness(230%);
}

.char-correct {
  color: rgb(40, 190, 100);
  filter: drop-shadow(3px 2px 2px) brightness(95%);
}

.char-wrong {
  color: rgb(255, 50, 50);
  filter: drop-shadow(3px 2px 2px) brightness(95%);
}

.char-neutral-inactive {
  color: rgb(100, 100, 180);
}

.char-neutral-active {
  color: rgb(100, 100, 180);
  filter: drop-shadow(3px 2px 2px) brightness(95%);
}
</style>

<script setup>
import { onMounted, onUnmounted, reactive, computed } from 'vue'
import {
  charTest,
  msToMinutes,
  isAuxiliaryKeys,
  playAudio
} from '../services/helpers.js'
import CurrentStats from './CurrentStats.vue'
import Keyboard from './Keyboard.vue'
import clickSound from '/src/assets/sounds/click-sound.mp3'
import { data, recordingStatistics, moveCaret } from '../store/data.js'
import { state } from '../store/state.js'
import { storage } from '../store/storage.js'

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
const charRevisedColor = computed(() => storage.field.charRevisedColor)
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

const charRevisedShadow = computed(() => {
  if (storage.shadow.charRevised) {
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

// event listener
const eListener = function (e) {
  if (state.settings) return

  events.keyDn = e
  events.keyValue = e.key
  const code = e.code

  if (
    (data.indexArr === 0 && code === 'Enter') ||
    (data.indexArr === 0 && code === 'Backspace')
  ) {
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

  if (!state.bTimer) {
    // timer on
    state.bTimer = true
    data.timerStart = performance.now()

    // creating and updating reactive elapsed time variables
    data.stopwatch = setInterval(() => {
      data.elapsedTime = performance.now() - data.timerStart
      data.elapsedTimeStr = msToMinutes(data.elapsedTime)
      let charPerMin = Math.floor(
        (data.numDialed * 60) / (Math.floor(data.elapsedTime) / 1000)
      )
        .toString()
        .padStart(3, '0')
      if (charPerMin > 999) charPerMin = 999
      data.charPerMin = charPerMin
    }, 10)
  }

  recordingStatistics(e)

  if (code === 'Backspace' && data.indexArr > 0) {
    data.remainingChars++
    moveCaret('back')
    if ('23'.includes(data.statArr[data.indexArr]) && data.tempErrorFree > 0) {
      data.tempErrorFree--
    }
  } else {
    if (storage.main.speaker) playAudio(clickSound, storage.main.volume)

    data.remainingChars--
    moveCaret()
  }
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
  <CurrentStats v-if="storage.visibility.currentStatistics" />
  <div class="field">
    <div
      v-for="(char, index) in charsArr"
      :key="index"
      class="char"
      :class="[
        { char_display_caret: index === indexArr % 200 },
        {
          char_display_correct:
            statArr[index + firstIndex] === '2' &&
            char !== ' ' &&
            index < indexArr % 200
        },
        {
          char_display_revised:
            statArr[index + firstIndex] === '3' && index < indexArr % 200
        },
        {
          char_display_wrong:
            statArr[index + firstIndex] === '4' && index < indexArr % 200
        },
        { 'char_display_special-inactive': charTest(char) },
        {
          'char_display_special-active':
            char !== 'skip' &&
            statArr[index + firstIndex] === '0' &&
            index < indexArr % 200
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

<style>
.field {
  width: 1440px;
  height: 380px;
  margin: 5px auto 50px;
  background-color: v-bind(fieldBackground);
  filter: blur(0px);
  outline: none;
  user-select: none;
}

.char {
  float: left;
  width: 36px;
  height: 76px;
  font-family: 'Consolas', monospace;
  font-size: 65px;
  color: v-bind(charColor);
  background: v-bind(charBackground);
}

.char_display_caret {
  position: relative;
  z-index: -1;
}

.char_display_caret:after {
  position: absolute;
  right: 0;
  bottom: 0;
  content: '';
  width: 36px;
  height: 5px;
  background: v-bind(caretBackground);
}

.char_display_correct {
  color: v-bind(charCorrectColor);
  filter: v-bind(charCorrectShadow);
}

.char_display_revised {
  color: v-bind(charRevisedColor);
  filter: v-bind(charRevisedShadow);
}

.char_display_wrong {
  color: v-bind(charWrongColor);
  filter: v-bind(charWrongShadow);
}

.char_display_special-inactive {
  color: v-bind(charSpecialColor);
}

.char_display_special-active {
  color: v-bind(charSpecialColor);
  filter: v-bind(charSpecialShadow);
}
</style>

import { reactive, computed } from 'vue'
import { charTest } from '/src/services/helpers.js'

const state = reactive({
  work: false,
  pointers: true,
  keyboard: true,
  settings: false,
  bTimer: false,
  statistics: false
})

const data = reactive({
  fragmentArr: Object,
  statArr: Object,
  firstIndex: Number,
  indexArr: Number,

  timerStart: Number,
  timerStop: Number,
  stopwatch: Object,
  elapsedTime: 0,
  elapsedTimeStr: '00:00.00',

  typingMeter: Object,
  charPerMin: 0,

  numCorrect: 0,
  numWrong: 0,

  tempWithoutMistake: 0,
  withoutMistake: 0
})

const recordingStat = function (e) {
  if (e.key === data.fragmentArr[data.indexArr]) {
    data.statArr[data.indexArr] = '1' // if char is correct
    data.tempWithoutMistake++
    if (data.withoutMistake < data.tempWithoutMistake) {
      data.withoutMistake = data.tempWithoutMistake
    }
    data.numCorrect++
  } else if (e.key !== data.fragmentArr[data.indexArr]) {
    data.statArr[data.indexArr] = '2' // if char is wrong
    // counting amount without mistake
    if (data.withoutMistake < data.tempWithoutMistake) {
      data.withoutMistake = data.tempWithoutMistake
    }
    data.tempWithoutMistake = 0
    data.numWrong++
  }
}

const changeState = function (propertyName) {
  state[propertyName] = !state[propertyName]
}

const setTrue = function (propertyName) {
  state[propertyName] = true
}

const setFalse = function (propertyName) {
  state[propertyName] = false
}

const loadFragment = function (str) {
  data.fragmentArr = str.split('')
  // creating and filling the empty statistic array
  data.statArr = new Array(data.fragmentArr.length).fill('0')
  data.firstIndex = 0
  data.indexArr = -1
}

// loading next set of chars
const loadNextChars = function () {
  if (data.firstIndex + 200 >= data.fragmentArr.length) return
  data.firstIndex += 200
}

/* moving caret (visually), moving over the inappropriate chars,
   stopping timer, changing work state, enable statistics menu */
const moveCaret = function () {
  data.indexArr++

  // checking inappropriate chars and skipping those
  let currentChar = data.fragmentArr[data.indexArr]
  while (charTest(currentChar)) {
    if (
      data.fragmentArr[data.indexArr + 1] === ' ' &&
      data.fragmentArr[data.indexArr - 1] === ' '
    )
      data.indexArr++

    // data.fragmentArr[state.indexArr + state.firstIndex- 1]
    data.indexArr++

    currentChar = data.fragmentArr[data.indexArr]
  }

  if (data.indexArr >= data.fragmentArr.length) {
    // shouting down the field
    data.timerStop = performance.now()
    state.work = false
    state.statistics = true
    return
  } else if (data.indexArr >= 200 + data.firstIndex) {
    loadNextChars()
  }
}

export default {
  state,
  data,
  recordingStat,
  changeState,
  setTrue,
  setFalse,
  loadFragment,
  loadNextChars,
  moveCaret
}

import { reactive, computed } from 'vue'
import { charTest } from '/src/services/helpers.js'

const state = reactive({
  work: false,
  pointers: true,
  keyboard: true,
  settings: false,
  overlay: false,
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
  withoutMistake: 0
})

let withoutMistake = 0

const recordingStat = function (e) {
  if (e.key === data.fragmentArr[data.indexArr]) {
    data.statArr[data.indexArr] = '1' // if char is correct
    withoutMistake++
  } else if (e.key !== data.fragmentArr[data.indexArr]) {
    data.statArr[data.indexArr] = '2' // if char is wrong
    // counting amount without mistake
    if (data.withoutMistake < withoutMistake) {
      data.withoutMistake = withoutMistake
    }
    withoutMistake = 0
  }
}

const changeState = function (propertyName) {
  state[propertyName] = !state[propertyName]
}

const setTrue = function (propertyName) {
  state[propertyName] = true
}

const loadFragment = function (str) {
  data.fragmentArr = str.split('')
  // creating and filling the empty statistic array
  data.statArr = new Array(data.fragmentArr.length).fill('0')
  data.firstIndex = 0
  data.indexArr = -1
}

const loadNextChars = function () {
  if (data.firstIndex + 200 >= data.fragmentArr.length) return
  data.firstIndex += 200
}

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
    state.overlay = true
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
  loadFragment,
  loadNextChars,
  moveCaret
}

import { reactive, computed } from 'vue'
import { charTest, arrPreparer } from '/src/services/helpers.js'

const state = reactive({
  work: false,
  settings: false,
  bTimer: false,
  overallStatistics: false,
  checkbox: false
})

const storage = reactive({
  letterCase: false,
  pointers: true,
  keyboard: true,
  inapLang: true
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
  charPerMin: 0,

  numCorrect: 0,
  numWrong: 0,

  tempWithoutMistake: 0,
  withoutMistake: 0
})

const recordingStatistics = function (e) {
  let key = e.key
  let char = data.fragmentArr[data.indexArr]

  // settings: ignore letter case
  if (storage.letterCase) {
    key = key.toLowerCase()
    char = char.toLowerCase()
  }

  if (key === char) {
    data.statArr[data.indexArr] = '1' // if the char is correct
    data.tempWithoutMistake++
    if (data.withoutMistake < data.tempWithoutMistake) {
      data.withoutMistake = data.tempWithoutMistake
    }
    data.numCorrect++
  } else if (key !== char) {
    data.statArr[data.indexArr] = '2' // if the char is wrong
    // counting the number of letters without mistake
    if (data.withoutMistake < data.tempWithoutMistake) {
      data.withoutMistake = data.tempWithoutMistake
    }
    data.tempWithoutMistake = 0
    data.numWrong++
  }
}

const toggleState = function (propertyName) {
  state[propertyName] = !state[propertyName]
}

const setTrue = function (propertyName) {
  state[propertyName] = true
}

const setFalse = function (propertyName) {
  state[propertyName] = false
}

const loadFragment = function (str) {
  // console.log(str)
  data.fragmentArr = arrPreparer(str)
  // console.log(data.fragmentArr)

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

  // checking special sign for skipping
  while (currentChar === 'skip') {
    data.indexArr++
    currentChar = data.fragmentArr[data.indexArr]
  }

  // checking inappropriate sign
  while (charTest(currentChar)) {
    if (
      data.fragmentArr[data.indexArr + 1] === ' ' &&
      data.fragmentArr[data.indexArr - 1] === ' '
    ) {
      data.indexArr++
    }

    data.indexArr++
    currentChar = data.fragmentArr[data.indexArr]
  }

  if (
    data.indexArr >= data.fragmentArr.length ||
    data.fragmentArr[data.indexArr] === 'end'
  ) {
    // shutting down the field
    data.timerStop = performance.now()
    state.work = false
    state.overallStatistics = true
    return
  } else if (data.indexArr >= 200 + data.firstIndex) {
    loadNextChars()
  }
}

const toggleStorage = function (propertyName) {
  storage[propertyName] = !storage[propertyName]
  localStorage[propertyName] = storage[propertyName]
}

export default {
  state,
  data,
  storage,
  recordingStatistics,
  toggleState,
  setTrue,
  setFalse,
  loadFragment,
  loadNextChars,
  moveCaret,
  toggleStorage
}

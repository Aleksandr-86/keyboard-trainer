import { reactive } from 'vue'
import {
  charTest,
  arrPreparer,
  randomNum,
  strPrepWithNewLines,
  strPrepWithoutNewLines,
  getSomeSentences
} from '/src/services/helpers.js'

import bookList from '/src/services/book-list.js'
import { arrBackgrounds } from '/src/services/background-list.js'

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
  inapLang: true,
  background: arrBackgrounds[5],
  langOfSnippets: 'russian'
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
  withoutMistake: 0,

  currentBook: 0
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
  console.log(storage.langOfSnippets)
}

const setTrue = function (propertyName) {
  state[propertyName] = true
}

const setFalse = function (propertyName) {
  state[propertyName] = false
}

const loadFragment = function (str, amount = 0) {
  if (amount === 0) {
    // case: buffer
    data.fragmentArr = arrPreparer(strPrepWithNewLines(str))
  } else {
    // case: snippets from the books
    str = strPrepWithoutNewLines(str)
    data.fragmentArr = arrPreparer(getSomeSentences(str, amount))
  }

  // creating and filling the empty statistic array
  data.statArr = new Array(data.fragmentArr.length).fill('0')
  data.firstIndex = 0
  data.indexArr = -1

  clearStat()
  setTrue('work')
  moveCaret()
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
  while (charTest(currentChar) || currentChar === 'skip') {
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

const clearStat = function () {
  state.bTimer = false
  clearInterval(data.stopwatch)
  data.elapsedTime = 0
  data.elapsedTimeStr = '00:00.00'
  data.charPerMin = 0

  data.numCorrect = 0
  data.numWrong = 0

  data.tempWithoutMistake = 0
  data.withoutMistake = 0
}

const randomSnippet = function (lang, amount) {
  let arrOfBooks
  if (lang === 'russian') {
    arrOfBooks = bookList.arrOfRusBooks
    storage.langOfSnippets = 'russian' // underline the corresponding link in the nav menu
  } else {
    arrOfBooks = bookList.arrOfEngBooks
    storage.langOfSnippets = 'english' // underline the corresponding link in the nav menu
  }

  const obj = arrOfBooks[randomNum(0, 4)] // choosing a random book
  data.currentBook = obj
  const filePath = `/src/books/${lang}/${obj.name}.txt`

  var httpRequest = new XMLHttpRequest()
  httpRequest.onload = function () {
    // When the request is loaded
    loadFragment(httpRequest.responseText, amount) // We're calling our method
  }
  httpRequest.open('GET', filePath)
  httpRequest.send()
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
  toggleStorage,
  clearStat,
  randomSnippet
}

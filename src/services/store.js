import { reactive } from 'vue'
import {
  charTest,
  keyboardLayoutTest,
  arrPreparer,
  randomNum,
  strPrepWithNewLines,
  strPrepWithoutNewLines,
  getSomeSentences
} from '/src/services/helpers.js'
import bookList from '/src/services/book-list.js'

const state = reactive({
  work: false,
  settings: false,
  bTimer: false,
  overallStatistics: false,
  checkbox: false
})

const storage = reactive({
  background: 0,
  letterCase: false,
  pointers: false,
  keyboard: false,
  langOfSnippets: 'russian'
})

const data = reactive({
  fragmentArr: Object,
  indexArr: Number,
  firstIndex: Number,
  statArr: Object,

  timerStart: Number,
  timerStop: Number,
  stopwatch: Object,
  elapsedTime: 0,
  elapsedTimeStr: '00:00.00',
  charPerMin: '000',

  numCorrect: 0,
  numWrong: 0,

  tempWithoutMistake: 0,
  withoutMistake: 0,
  remainingChars: 0,

  currentBook: 0,
  keyboardLayout: 'russian',
  backgroundPreview: 0
})

const colors = reactive({
  pointers: ['hsla(300, 60%, 40%, 1)', 'hsla(120, 80%, 33%, 1)']
})

const recordingStatistics = function (e) {
  let key = e.key
  let char = data.fragmentArr[data.indexArr]

  // settings: ignore letter case
  if (storage.letterCase) {
    key = key.toLowerCase()
    char = char.toLowerCase()
  }

  data.remainingChars--
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
    data.numWrong++
    data.tempWithoutMistake = 0
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

const loadFragment = function (str, amount = 0) {
  if (amount === 0) {
    // case: buffer
    data.fragmentArr = arrPreparer(strPrepWithNewLines(str))
  } else {
    // case: snippets from the books
    str = strPrepWithoutNewLines(str)
    data.fragmentArr = arrPreparer(getSomeSentences(str, amount))
  }

  let tempLength = 0
  let tempIncorrect = 0
  for (let i = 0; i < data.fragmentArr.length; i++) {
    tempLength++
    const char = data.fragmentArr[i]
    if (char === 'end') break
    if (charTest(char) || char === 'skip') tempIncorrect++
  }
  data.remainingChars = tempLength - tempIncorrect - 1

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

  data.keyboardLayout = keyboardLayoutTest(
    data.fragmentArr[data.indexArr],
    data.keyboardLayout
  )
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
  data.charPerMin = '000'

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
    localStorage.langOfSnippets = 'russian'
  } else {
    arrOfBooks = bookList.arrOfEngBooks
    storage.langOfSnippets = 'english' // underline the corresponding link in the nav menu
    localStorage.langOfSnippets = 'english'
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
  colors,
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

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
  blur: { field: 200 },
  field: {
    background: 'hsla(0, 0%, 0%, 0)',
    charBackground: 'hsla(0, 0%, 20%, 0.75)',
    caretBackground: 'hsla(280, 85%, 70%, 0.65)',
    charColor: 'hsla(0, 0%, 65%, 1)',
    charCorrectColor: 'hsla(144, 65%, 45%, 1)',
    charWrongColor: 'hsla(0, 100%, 60%, 1)',
    charSpecialColor: 'hsl(180, 100%, 45%, 0.75)'
  },
  keyboard: {
    background: 'hsla(0, 0%, 15%, 1)',
    keyBackground: 'hsla(0, 0%, 0%, 1)',
    keyColor: 'hsla(0, 0%, 70%, 1)',
    shift: 'hsla(300, 80%, 40%, 1)',
    pinky: 'hsla(300, 60%, 40%, 1)',
    ring: 'hsla(60, 80%, 35%, 1)',
    middle: 'hsla(120, 80%, 33%, 1)',
    lIndex: 'hsla(180, 100%, 35%, 1)',
    thumbs: 'hsla(0, 0%, 70%, 1)',
    rIndex: 'hsla(0, 75%, 50%, 1)',
    underline: true
  },
  main: {
    background: 0,
    langOfSnippets: 'russian',
    letterCase: true,
    speaker: false,
    volume: 0.2
  },
  shadow: {
    charCorrect: true,
    charWrong: true,
    charSpecial: true
  },
  visibility: { currentStatistics: true, keyboard: true }
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

const recordingStatistics = function (e) {
  let key = e.key
  let char = data.fragmentArr[data.indexArr]

  if (!storage.main.letterCase) {
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

const changeStorage = function (property) {
  localStorage[property] = JSON.stringify(storage[property])
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
  let arrOfBooks = []

  if (lang === 'russian') {
    arrOfBooks = bookList.arrOfRusBooks
    storage.main.langOfSnippets = 'russian' // underline the corresponding link in the nav menu
  } else {
    arrOfBooks = bookList.arrOfEngBooks
    storage.main.langOfSnippets = 'english' // underline the corresponding link in the nav menu
  }
  localStorage.main = JSON.stringify(storage.main)

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
  changeStorage,
  clearStat,
  randomSnippet
}

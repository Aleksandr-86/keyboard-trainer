import { reactive } from 'vue'
import {
  charTest,
  keyboardLayoutTest,
  arrPreparer,
  randomNum,
  strPrepWithNewLines,
  strPrepWithoutNewLines,
  getSomeSentences,
  playAudio
} from '@/services/helpers.js'
import bookList from '@/services/book-list.js'
import ringSound from '@/assets/sounds/ring.mp3'
import { state } from '@/store/state.js'
import { storage } from '@/store/storage.js'

export const data = reactive({
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

  numDialed: 0,
  numCorrect: 0,
  numErrors: 0,

  tempErrorFree: 0,
  ErrorFree: 0,
  remainingChars: 0,

  currentBook: 0,
  classSelector: String,
  keyboardLayout: 'russian',
  backgroundPreview: 0
})

export const recordingStatistics = function (e) {
  let key = e.key
  let char = data.fragmentArr[data.indexArr]

  if (!storage.main.letterCase) {
    key = key.toLowerCase()
    char = char.toLowerCase()
  }

  if (e.code === 'Backspace' && data.indexArr !== 0) {
    return
  } else if (key === char) {
    if (data.statArr[data.indexArr] === '0') {
      data.statArr[data.indexArr] = '2' // the char is correct
      data.numDialed++
    } else if (data.statArr[data.indexArr] === '4') {
      data.statArr[data.indexArr] = '3' // the revised char is correct
    }

    data.numCorrect++
    data.tempErrorFree++

    if (data.ErrorFree < data.tempErrorFree) {
      data.ErrorFree = data.tempErrorFree
    }
  } else if (key !== char) {
    if (data.statArr[data.indexArr] === '0') data.numDialed++
    data.statArr[data.indexArr] = '4' // the char is wrong

    // counting the number of letters without mistake
    if (data.ErrorFree < data.tempErrorFree) {
      data.ErrorFree = data.tempErrorFree
    }

    data.numErrors++
    data.tempErrorFree = 0
  }
}

export const loadFragment = function (str, amount = 0) {
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
  state.work = true
  moveCaret()
}

// loading next set of chars
export const loadNextChars = function () {
  if (data.firstIndex + 200 >= data.fragmentArr.length) return
  data.firstIndex += 200
}

/* moving caret (visually), moving over the inappropriate chars,
   stopping timer, changing work state, enable statistics menu */
export const moveCaret = function (direction = 'forward') {
  if (direction === 'forward') {
    data.indexArr++
  } else if (direction === 'back') {
    data.indexArr--
  }

  // checking inappropriate chars and skipping those
  let currentChar = data.fragmentArr[data.indexArr]

  // checking inappropriate sign
  while (charTest(currentChar) || currentChar === 'skip') {
    if (
      data.fragmentArr[data.indexArr + 1] === ' ' &&
      data.fragmentArr[data.indexArr - 1] === ' '
    ) {
      if (direction === 'forward') {
        data.indexArr++
      } else if (direction === 'back') {
        data.indexArr--
      }
    }

    if (direction === 'forward') {
      data.indexArr++
    } else if (direction === 'back') {
      data.indexArr--
    }
    currentChar = data.fragmentArr[data.indexArr]
  }

  if (
    data.indexArr >= data.fragmentArr.length ||
    data.fragmentArr[data.indexArr] === 'end'
  ) {
    // shutting down the field
    if (storage.main.speaker && storage.main.ring)
      playAudio(ringSound, storage.main.volume)
    data.timerStop = performance.now()
    state.work = false
    state.overallStats = true
    return
  } else if (data.indexArr >= 200 + data.firstIndex) {
    loadNextChars()
  }

  data.keyboardLayout = keyboardLayoutTest(
    data.fragmentArr[data.indexArr],
    data.keyboardLayout
  )
}

export const clearStat = function () {
  state.bTimer = false
  clearInterval(data.stopwatch)
  data.elapsedTime = 0
  data.elapsedTimeStr = '00:00.00'
  data.charPerMin = '000'

  data.numDialed = 0
  data.numCorrect = 0
  data.numErrors = 0

  data.tempErrorFree = 0
  data.ErrorFree = 0
}

export const randomSnippet = function (lang, amount) {
  state.preloader = true
  data.classSelector = '.navigation-bar__snippet-link'
  let arrOfBooks = []

  if (lang === 'russian') {
    arrOfBooks = bookList.arrOfRusBooks
    data.keyboardLayout = 'russian'
    storage.main.langOfSnippets = 'russian' // underline the corresponding link in the nav menu
  } else {
    arrOfBooks = bookList.arrOfEngBooks
    data.keyboardLayout = 'english'
    storage.main.langOfSnippets = 'english' // underline the corresponding link in the nav menu
  }
  localStorage.main = JSON.stringify(storage.main)

  const obj = arrOfBooks[randomNum(0, arrOfBooks.length - 1)] // choosing a random book
  data.currentBook = obj

  function getUrl(name) {
    return new URL(`/src/assets/books/${lang}/${name}.txt`, import.meta.url)
      .href
  }

  const filePath = getUrl(obj.name)

  const httpRequest = new XMLHttpRequest()
  httpRequest.onload = function () {
    // When the request is loaded
    loadFragment(httpRequest.responseText, amount) // We're calling our method
  }
  httpRequest.open('GET', filePath)
  httpRequest.send()
}

import { reactive, computed } from 'vue'
import { charTest } from '/src/services/helpers.js'

const state = reactive({
  work: false,
  pointers: true,
  keyboard: true,
  settings: false,
  fragmentArr: Object,
  indexArr: Number,
  caretPosition: Number
})

// accounting of typing
const data = reactive({
  statArr: Object
})

const recordingStat = function (e) {
  if (e.key === state.fragmentArr[state.caretPosition + state.indexArr]) {
    data.statArr[state.caretPosition + state.indexArr] = '1' // if char is correct
  } else if (
    e.key !== state.fragmentArr[state.caretPosition + state.indexArr]
  ) {
    data.statArr[state.caretPosition + state.indexArr] = '2' // if char is wrong
  }
}

const changeState = function (propertyName) {
  state[propertyName] = !state[propertyName]
}

const setTrue = function (propertyName) {
  state[propertyName] = true
}

const loadFragment = function (str) {
  state.fragmentArr = str.split('')
  // creating and filling the empty statistic array
  data.statArr = new Array(state.fragmentArr.length).fill('0')
  state.indexArr = 0
  state.caretPosition = -1
}

const loadNextChars = function () {
  if (state.indexArr + 200 >= state.fragmentArr.length) return
  state.indexArr += 200
  state.caretPosition = -1
  moveCaret()
}

const moveCaret = function () {
  state.caretPosition++

  // checking inappropriate chars and skipping those
  let currentChar = state.fragmentArr[state.caretPosition + state.indexArr]
  while (charTest(currentChar)) {
    let nextChar = state.fragmentArr[state.caretPosition + state.indexArr + 1]
    let previousChar =
      state.fragmentArr[state.caretPosition + state.indexArr - 1]
    if (previousChar === ' ' && nextChar === ' ') state.caretPosition++

    state.fragmentArr[state.caretPosition + state.indexArr - 1]
    state.caretPosition++

    currentChar = state.fragmentArr[state.caretPosition + state.indexArr]
  }

  if (
    state.indexArr + 200 >= state.fragmentArr.length &&
    state.caretPosition >= 200
  ) {
    // shouting down the field
    state.work = false
    return
  } else if (state.caretPosition >= 200) {
    state.caretPosition = 0
    loadNextChars()
  }
}

// const event = reactive({
//   keyDown: {},
//   keyUp: {}
// })

// const setEvent = function (propertyName, obj) {
//   event[propertyName] = computed(() => obj)
// }

export default {
  state,
  data,
  recordingStat,
  changeState,
  setTrue,
  loadFragment,
  loadNextChars,
  moveCaret
  // event,
  // setEvent
}

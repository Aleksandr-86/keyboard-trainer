import { reactive, computed } from 'vue'
import { charTest } from '/src/services/helpers.js'

const state = reactive({
  work: false,
  pointers: true,
  keyboard: true,
  settings: false
})

const data = reactive({
  fragmentArr: Object,
  statArr: Object,
  firstIndex: Number,
  indexArr: Number
})

const recordingStat = function (e) {
  if (e.key === data.fragmentArr[data.indexArr]) {
    data.statArr[data.indexArr] = '1' // if char is correct
  } else if (e.key !== data.fragmentArr[data.indexArr]) {
    data.statArr[data.indexArr] = '2' // if char is wrong
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
  // data.indexArr= -1
  // moveCaret()
}

const moveCaret = function () {
  data.indexArr++

  // checking inappropriate chars and skipping those
  let currentChar = data.fragmentArr[data.indexArr]
  while (charTest(currentChar)) {
    let nextChar = data.fragmentArr[data.indexArr + 1]
    let previousChar = data.fragmentArr[data.indexArr - 1]
    if (previousChar === ' ' && nextChar === ' ') data.indexArr++

    // data.fragmentArr[state.indexArr + state.firstIndex- 1]
    data.indexArr++

    currentChar = data.fragmentArr[data.indexArr]
  }

  if (
    // state.firstIndex+ 200 >= data.fragmentArr.length &&
    // state.indexArr >= 200
    data.indexArr >= data.fragmentArr.length
  ) {
    // shouting down the field
    state.work = false
    return
  } else if (data.indexArr >= 200 + data.firstIndex) {
    // state.indexArr = 0
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

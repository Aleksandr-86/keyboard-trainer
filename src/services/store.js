import { reactive, computed } from 'vue'
import { charTest } from '/src/services/helpers.js'

const state = reactive({
  work: false,
  pointers: true,
  keyboard: true,
  settings: false,
  fragmentArr: Object,
  indexArr: 0,
  caretPosition: 0
})

const changeState = function (propertyName) {
  state[propertyName] = !state[propertyName]
}

const setTrue = function (propertyName) {
  state[propertyName] = true
}

const loadFragment = function (str) {
  state.indexArr = 0
  state.caretPosition = 0
  state.fragmentArr = str.split('')
}

const increaseIndex = function () {
  if (state.indexArr + 200 >= state.fragmentArr.length) return
  state.indexArr += 200
}

const moveCaret = function () {
  state.caretPosition += 1
  console.log(state.fragmentArr[state.caretPosition + state.indexArr])

  if (
    state.indexArr + 200 >= state.fragmentArr.length &&
    state.caretPosition >= 200
  ) {
    state.work = false
    return
  } else if (state.caretPosition >= 200) {
    state.caretPosition = 0
    increaseIndex()
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
  changeState,
  setTrue,
  loadFragment,
  increaseIndex,
  moveCaret
  // event,
  // setEvent
}

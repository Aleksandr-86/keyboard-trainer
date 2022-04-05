import { reactive, computed } from 'vue'

const state = reactive({
  work: false,
  pointers: true,
  keyboard: true,
  settings: false,
  fragment: String,
  arrIndex: 0,
  caretPosition: 0
})

const changeState = function (propertyName) {
  state[propertyName] = !state[propertyName]
}

const setTrue = function (propertyName) {
  state[propertyName] = true
}

const loadFragment = function (str) {
  state.arrIndex = 0
  state.caretPosition = 0
  state.fragment = str
}

const increaseIndex = function () {
  if (state.arrIndex + 200 >= state.fragment.length) return
  state.arrIndex += 200
}

const moveCaret = function () {
  if (
    state.arrIndex + 200 >= state.fragment.length &&
    state.caretPosition >= 199
  ) {
    state.work = false
    return
  } else if (state.caretPosition >= 199) {
    state.caretPosition = -1
    increaseIndex()
  }
  state.caretPosition += 1
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

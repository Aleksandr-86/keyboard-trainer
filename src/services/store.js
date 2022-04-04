import { reactive, computed } from 'vue'

const state = reactive({
  work: false,
  pointers: true,
  keyboard: true,
  settings: false,
  fragment: String,
  arrIndex: 0
})

const changeState = function (propertyName) {
  state[propertyName] = !state[propertyName]
}

const setTrue = function (propertyName) {
  state[propertyName] = true
}

const increaseIndex = function () {
  if (state.arrIndex + 200 >= state.fragment.length) return
  state.arrIndex += 200
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
  increaseIndex
  // event,
  // setEvent
}

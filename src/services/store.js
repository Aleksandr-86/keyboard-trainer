import { reactive, computed } from 'vue'

const state = reactive({
  work: false,
  pointers: true,
  keyboard: true,
  settings: false,
  fragment: String,
  token: 0
})

const changeState = function (propertyName) {
  state[propertyName] = !state[propertyName]
}

const setTrue = function (propertyName) {
  state[propertyName] = true
}

const updateToken = function () {
  state.token = state.token + 1
  console.log(state.token)
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
  updateToken
  // event,
  // setEvent
}

import { reactive, computed } from 'vue'

const state = reactive({
  work: false,
  pointers: true,
  keyboard: true,
  settings: false
})

const changeState = function (propertyName) {
  state[propertyName] = !state[propertyName]
}

const setTrue = function (propertyName) {
  state[propertyName] = true
}

const event = reactive({
  keyDown: {},
  keyUp: {}
})

const setEvent = function (propertyName, obj) {
  event[propertyName] = computed(() => obj)
}

export default {
  state,
  changeState,
  setTrue,
  event,
  setEvent
}

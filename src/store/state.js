import { reactive } from 'vue'

export const state = reactive({
  work: false,
  settings: false,
  bTimer: false,
  overallStatistics: false
})

// const toggle = function (prop) {
//   state[prop] = !state[prop]
// }

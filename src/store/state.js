import { reactive } from 'vue'

export const state = reactive({
  work: false,
  settings: false,
  bTimer: false,
  overallStats: false,
  loader: false
})

// const toggle = function (prop) {
//   state[prop] = !state[prop]
// }

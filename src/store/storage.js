import { reactive } from 'vue'

export const storage = reactive({
  currentStatistics: {
    colors: 'hsla(144, 65%, 47%, 1)'
  },
  field: {
    background: 'hsla(0, 0%, 60%, 1)',
    charBackground: 'hsla(0, 0%, 0%, 0.65)',
    caretBackground: 'hsla(280, 85%, 70%, 0.65)',
    charColor: 'hsla(0, 0%, 67%, 1)',
    charCorrectColor: 'hsla(144, 65%, 47%, 1)',
    charWrongColor: 'hsla(0, 100%, 60%, 1)',
    charRevisedColor: 'hsla(90, 65%, 50%, 1)',
    charSpecialColor: 'hsl(180, 100%, 50%, 0.75)'
  },
  keyboard: {
    background: 'hsla(0, 0%, 15%, 1)',
    keyBackground: 'hsla(0, 0%, 0%, 1)',
    keyColor: 'hsla(0, 0%, 70%, 1)',
    shift: 'hsla(300, 80%, 40%, 1)',
    pinky: 'hsla(300, 60%, 40%, 1)',
    ring: 'hsla(60, 80%, 35%, 1)',
    middle: 'hsla(120, 80%, 33%, 1)',
    lIndex: 'hsla(180, 100%, 35%, 1)',
    thumbs: 'hsla(0, 0%, 70%, 1)',
    rIndex: 'hsla(0, 75%, 50%, 1)',
    underline: true
  },
  main: {
    background: 0,
    langOfSnippets: 'russian',
    minSnippetLength: 160,
    letterCase: true,
    speaker: true,
    ring: true,
    volume: 0.2
  },
  overallStatistics: {
    title: 'hsla(282, 100%, 25%, 1)',
    ms: 'hsla(240, 60%, 40%, 1)',
    correct: 'hsla(135, 100%, 27%, 1)',
    wrong: 'hsla(0, 100%, 30%, 1)'
  },
  shadow: {
    charCorrect: false,
    charWrong: true,
    charRevised: false,
    charSpecial: true
  },
  visibility: { currentStatistics: true, keyboard: true }
})

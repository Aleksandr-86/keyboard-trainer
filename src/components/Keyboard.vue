<script setup>
import { computed } from '@vue/reactivity'
import { jcuken } from '../services/keyboardLayouts.js'
import { qwerty } from '../services/keyboardLayouts.js'
import { isUpCase } from '../services/helpers.js'
import { data } from '../store/data'
import { storage } from '../store/storage.js'

const props = defineProps({
  eventKeydown: {
    type: [Function, Object],
    required: true
  },
  char: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    required: true,
    default: 'russian'
  }
})

const keyboardLayout = computed(() => {
  if (props.lang === 'russian') {
    return jcuken
  } else if (props.lang === 'english') {
    return qwerty
  }
})

const lShift = computed(() => {
  const rChars = keyboardLayout.value[1].chars
  const rSigns = keyboardLayout.value[1].signs
  const char = data.fragmentArr[data.indexArr]

  if (
    (rChars.includes(char.toLowerCase()) && isUpCase(char)) ||
    rSigns.includes(char)
  ) {
    return true
  } else {
    return false
  }
})

const rShift = computed(() => {
  const lChars = keyboardLayout.value[0].chars
  const lSigns = keyboardLayout.value[0].signs
  let char = data.fragmentArr[data.indexArr]

  if (
    (lChars.includes(char.toLowerCase()) && isUpCase(char)) ||
    lSigns.includes(char)
  ) {
    return true
  } else {
    return false
  }
})

const keyboardBackground = computed(() => storage.keyboard.background)
const keyBackground = computed(() => storage.keyboard.keyBackground)
const keyColor = computed(() => storage.keyboard.keyColor)

const shiftColor = computed(() => storage.keyboard.shift)
const pinkyFingers = computed(() => storage.keyboard.pinky)
const ringFingers = computed(() => storage.keyboard.ring)
const middleFingers = computed(() => storage.keyboard.middle)
const lIndexFinger = computed(() => storage.keyboard.lIndex)
const thumbs = computed(() => storage.keyboard.thumbs)
const rIndexFinger = computed(() => storage.keyboard.rIndex)

const keyUnderline = computed(() => {
  if (storage.keyboard.underline) {
    return 'underline'
  } else {
    return 'none'
  }
})

const boardColor = computed(() => {
  let char = data.fragmentArr[data.indexArr]
  char = char.toLowerCase()

  const pinkyRegex = new RegExp(keyboardLayout.value[2].pinky)
  if (pinkyRegex.test(char)) return pinkyFingers.value
  const ringRegex = new RegExp(keyboardLayout.value[3].ring)
  if (ringRegex.test(char)) return ringFingers.value
  const middleRegex = new RegExp(keyboardLayout.value[4].middle)
  if (middleRegex.test(char)) return middleFingers.value
  const lIndexRegex = new RegExp(keyboardLayout.value[5].lIndex)
  if (lIndexRegex.test(char)) return lIndexFinger.value
  const rIndexRegex = new RegExp(keyboardLayout.value[6].rIndex)
  if (rIndexRegex.test(char)) return rIndexFinger.value

  if (/ /.test(char)) return thumbs.value
})
</script>

<template>
  <div class="keyboard">
    <div
      v-for="(obj, index) in keyboardLayout.slice(7)"
      :key="index"
      :class="[
        {
          button_type_single: obj.value.length === 1 || obj.value.length > 2
        },
        { button_type_double: obj.value.length === 2 },
        { [`button_code_${obj.code.toLocaleLowerCase()}`]: true },
        {
          button_marked_shift:
            (obj.code === 'ShiftLeft' && lShift) ||
            (obj.code === 'ShiftRight' && rShift)
        },
        {
          button_marked_border:
            obj.value === char.toLowerCase() ||
            (obj.value.length === 2 && obj.value.includes(char.toLowerCase()))
        }
      ]">
      <div
        v-if="obj.value.length === 1 || obj.value.length > 2"
        :class="[
          {
            button_marked_color: obj.value === char.toLowerCase()
          }
        ]">
        {{ obj.value }}
      </div>

      <div
        v-if="obj.value.length === 2"
        :class="[{ button_marked_color: obj.value[0] === char }]">
        {{ obj.value[0] }}
      </div>

      <div
        v-if="obj.value.length === 2"
        :class="[{ button_marked_color: obj.value[1] === char }]">
        {{ obj.value[1] }}
      </div>
    </div>
  </div>
</template>

<style>
.keyboard {
  width: 971px;
  height: 328px;
  margin: 0 auto;
  background: v-bind(keyboardBackground);
  border-radius: 15px;
  user-select: none;
}

.button_type_single,
.button_type_double {
  float: left;
  width: 62px;
  height: 62px;
  margin-top: 3px;
  margin-right: 3px;
  font-size: 23px;
  font-family: 'Consolas', monospace;
  color: v-bind(keyColor);
  background: v-bind(keyBackground);
  border-radius: 15px;
  text-align: center;
  text-transform: capitalize;
}

.button_type_single > div {
  position: relative;
  top: 16px;
  height: 28px;
}

.button_type_double > div {
  height: 30px;
}

.button_type_double > div:first-child {
  margin-top: 1px;
}

.button_type_double > div:last-child {
  margin-bottom: 1px;
}

.button_marked_color {
  color: v-bind(boardColor);
}

.button_marked_border {
  box-shadow: inset 0 0 0 3px v-bind(boardColor);
}

.button_marked_shift {
  color: v-bind(shiftColor);
  box-shadow: inset 0 0 0 3px v-bind(shiftColor);
}

.button_code_keyf,
.button_code_keyj {
  text-decoration: v-bind(keyUnderline);
}

.button_code_backquote,
.button_code_tab,
.button_code_capslock,
.button_code_shiftleft,
.button_code_controlleft {
  margin-left: 3px;
}

.button_code_backspace {
  width: 120px;
}

.button_code_tab {
  width: 91px;
}

.button_code_backslash {
  width: 91px;
}

.button_code_capslock {
  width: 109px;
}

.button_code_enter {
  width: 138px;
}

.button_code_shiftleft {
  width: 141px;
}

.button_code_shiftright {
  width: 171px;
}

.button_code_controlleft,
.button_code_controlright,
.button_code_metaleft,
.button_code_altleft,
.button_code_altright,
.button_code_metaright,
.button_code_contextmenu {
  width: 77px;
}

.button_code_space {
  width: 405px;
}
</style>

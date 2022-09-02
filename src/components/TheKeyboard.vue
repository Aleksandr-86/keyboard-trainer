<script setup>
import { computed } from '@vue/reactivity'
import { data } from '@/store/data'
import { storage } from '@/store/storage.js'
import { jcuken } from '@/services/keyboard-layouts.js'
import { qwerty } from '@/services/keyboard-layouts.js'
import { isUpCase } from '@/services/helpers.js'

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
  if (keyboardLayout.value[2].pinky.includes(char)) return pinkyFingers.value
  if (keyboardLayout.value[3].ring.includes(char)) return ringFingers.value
  if (keyboardLayout.value[4].middle.includes(char)) return middleFingers.value
  if (keyboardLayout.value[5].lIndex.includes(char)) return lIndexFinger.value
  if (keyboardLayout.value[6].rIndex.includes(char)) return rIndexFinger.value
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

<style lang="scss">
.keyboard {
  width: 971px;
  height: 328px;
  margin: 0 auto;
  background: v-bind(keyboardBackground);
  border-radius: 15px;
  user-select: none;
}

.button_type {
  &_single,
  &_double {
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

  &_single > div {
    position: relative;
    top: 16px;
    height: 28px;
  }

  &_double > div {
    height: 30px;
  }

  &_double > div:first-child {
    margin-top: 1px;
  }

  &_double > div:last-child {
    margin-bottom: 1px;
  }
}

.button_marked {
  &_color {
    color: v-bind(boardColor);
  }

  &_border {
    box-shadow: inset 0 0 0 3px v-bind(boardColor);
  }

  &_shift {
    color: v-bind(shiftColor);
    box-shadow: inset 0 0 0 3px v-bind(shiftColor);
  }
}

.button_code {
  &_keyf,
  &_keyj {
    text-decoration: v-bind(keyUnderline);
  }

  &_backquote,
  &_tab,
  &_capslock,
  &_shiftleft,
  &_controlleft {
    margin-left: 3px;
  }

  &_backspace {
    width: 120px;
  }

  &_tab {
    width: 91px;
  }

  &_backslash {
    width: 91px;
  }

  &_capslock {
    width: 109px;
  }

  &_enter {
    width: 138px;
  }

  &_shiftleft {
    width: 141px;
  }

  &_shiftright {
    width: 171px;
  }

  &_controlleft,
  &_controlright,
  &_metaleft,
  &_altleft,
  &_altright,
  &_metaright,
  &_contextmenu {
    width: 77px;
  }

  &_space {
    width: 405px;
  }
}
</style>

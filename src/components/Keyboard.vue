<script setup>
import { computed } from '@vue/reactivity'
import { data } from '../services/data'
import { isUpCase } from '../services/helpers.js'
import { storage } from '/src/services/storage.js'

const props = defineProps({
  eventKeydown: {},
  targetChar: String,
  lang: String
})

const keyboardArr = [
  {
    side: 'left',
    chars: ['ёйфяцычувскамепи', 'qazwsxedcrfvtgb'],
    signs: ['!"№;%:', '~!@#$%^']
  },
  {
    side: 'right',
    chars: ['нртгоьшлбщдюзжхэъ', 'yhnujmikolp'],
    signs: ['?*()_+,/', '&*()_+{}|:"<>?']
  },
  { code: 'Backquote', value: ['ё', '~`'] },
  { code: 'Digit1', value: ['!1', '!1'] },
  { code: 'Digit2', value: ['"2', '@2'] },
  { code: 'Digit3', value: ['№3', '#3'] },
  { code: 'Digit4', value: [';4', '$4'] },
  { code: 'Digit5', value: ['%5', '%5'] },
  { code: 'Digit6', value: [':6', '^6'] },
  { code: 'Digit7', value: ['?7', '&7'] },
  { code: 'Digit8', value: ['*8', '*8'] },
  { code: 'Digit9', value: ['(9', '(9'] },
  { code: 'Digit', value: [')0', ')0'] },
  { code: 'Minus', value: ['_-', '_-'] },
  { code: 'Equal', value: ['+=', '+='] },
  { code: 'Backspace', value: ['backspace', 'backspace'] },

  { code: 'Tab', value: ['tab', 'tab'] },
  { code: 'KeyQ', value: ['й', 'q'] },
  { code: 'KeyW', value: ['ц', 'w'] },
  { code: 'KeyE', value: ['у', 'e'] },
  { code: 'KeyR', value: ['к', 'r'] },
  { code: 'KeyT', value: ['е', 't'] },
  { code: 'KeyY', value: ['н', 'y'] },
  { code: 'KeyU', value: ['г', 'u'] },
  { code: 'KeyI', value: ['ш', 'i'] },
  { code: 'KeyO', value: ['щ', 'o'] },
  { code: 'KeyP', value: ['з', 'p'] },
  { code: 'BracketLeft', value: ['х', '{['] },
  { code: 'BracketRight', value: ['ъ', '}]'] },
  { code: 'Backslash', value: ['/\\', '|\\'] },

  { code: 'CapsLock', value: ['caps', 'caps'] },
  { code: 'KeyA', value: ['ф', 'a'] },
  { code: 'KeyS', value: ['ы', 's'] },
  { code: 'KeyD', value: ['в', 'd'] },
  { code: 'KeyF', value: ['а', 'f'] },
  { code: 'KeyG', value: ['п', 'g'] },
  { code: 'KeyH', value: ['р', 'h'] },
  { code: 'KeyJ', value: ['о', 'j'] },
  { code: 'KeyK', value: ['л', 'k'] },
  { code: 'KeyL', value: ['д', 'l'] },
  { code: 'Semicolon', value: ['ж', ':;'] },
  { code: 'Quote', value: ['э', `"'`] },
  { code: 'Enter', value: ['enter', 'enter'] },

  { code: 'ShiftLeft', value: ['shift', 'shift'] },
  { code: 'KeyZ', value: ['я', 'z'] },
  { code: 'KeyX', value: ['ч', 'x'] },
  { code: 'KeyC', value: ['с', 'c'] },
  { code: 'KeyV', value: ['м', 'v'] },
  { code: 'KeyB', value: ['и', 'b'] },
  { code: 'KeyN', value: ['т', 'n'] },
  { code: 'KeyM', value: ['ь', 'm'] },
  { code: 'Comma', value: ['б', '<,'] },
  { code: 'Period', value: ['ю', '>.'] },
  { code: 'Slash', value: [',.', '?/'] },
  { code: 'ShiftRight', value: ['shift', 'shift'] },

  { code: 'ControlLeft', value: ['ctrl', 'ctrl'] },
  { code: 'MetaLeft', value: ['win', 'win'] },
  { code: 'AltLeft', value: ['alt', 'alt'] },
  { code: 'Space', value: [' ', ' '] },
  { code: 'AltRight', value: ['alt', 'alt'] },
  { code: 'MetaRight', value: ['win', 'win'] },
  { code: 'ContextMenu', value: ['menu', 'menu'] },
  { code: 'ControlRight', value: ['ctrl', 'ctrl'] }
]

const langIndex = computed(() => {
  if (props.lang === 'russian') {
    return 0
  } else if (props.lang === 'english') {
    return 1
  }
})

const lShift = computed(() => {
  const rChars = keyboardArr[1].chars[langIndex.value]
  const rSigns = keyboardArr[1].signs[langIndex.value]
  let targetChar = data.fragmentArr[data.indexArr]

  if (
    (rChars.includes(targetChar.toLowerCase()) && isUpCase(targetChar)) ||
    rSigns.includes(targetChar)
  ) {
    return true
  } else {
    return false
  }
})

const rShift = computed(() => {
  const lChars = keyboardArr[0].chars[langIndex.value]
  const lSigns = keyboardArr[0].signs[langIndex.value]
  let targetChar = data.fragmentArr[data.indexArr]

  if (
    (lChars.includes(targetChar.toLowerCase()) && isUpCase(targetChar)) ||
    lSigns.includes(targetChar)
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
  let targetChar = data.fragmentArr[data.indexArr]

  targetChar = targetChar.toLowerCase()
  if (props.lang === 'russian') {
    if (/[ё1!йфя0)зж.,\-_хэ=+ъ\\/]/.test(targetChar)) {
      return pinkyFingers.value
    } else if (/[2"цыч9(щдю]/.test(targetChar)) {
      return ringFingers.value
    } else if (/[3№увс8*шлб]/.test(targetChar)) {
      return middleFingers.value
    } else if (/[4;кам5%епи6:]/.test(targetChar)) {
      return lIndexFinger.value
    } else if (/[7?нртгоь]/.test(targetChar)) {
      return rIndexFinger.value
    }
  } else if (props.lang === 'english') {
    if (/[`~1!qaz0)p;:/?\-_\[{'"=+\]}\\|]/.test(targetChar)) {
      return pinkyFingers.value
    } else if (/[2@wsx9(ol.>]/.test(targetChar)) {
      return ringFingers.value
    } else if (/[3#edc8*ik,<]/.test(targetChar)) {
      return middleFingers.value
    } else if (/[4$rfv5%tgb6^]/.test(targetChar)) {
      return lIndexFinger.value
    } else if (/[7&yhnujm]/.test(targetChar)) {
      return rIndexFinger.value
    }
  }

  if (/ /.test(targetChar)) return thumbs.value
})
</script>

<template>
  <div class="keyboard">
    <div
      v-for="(obj, index) in keyboardArr.slice(2)"
      :key="index"
      :id="obj.code.toLowerCase()"
      :class="[
        {
          button:
            obj.value[langIndex].length === 1 || obj.value[langIndex].length > 2
        },
        {
          'button-marked-shift':
            (obj.code === 'ShiftLeft' && lShift) ||
            (obj.code === 'ShiftRight' && rShift)
        },
        {
          'button-marked-border':
            obj.value[langIndex] === targetChar.toLowerCase() ||
            (obj.value[langIndex].length === 2 &&
              obj.value[langIndex].includes(targetChar.toLowerCase()))
        },
        { 'button-double': obj.value[langIndex].length === 2 }
      ]">
      <div
        v-if="
          obj.value[langIndex].length === 1 || obj.value[langIndex].length > 2
        "
        :class="[
          {
            'button-marked-color':
              obj.value[langIndex] === targetChar.toLowerCase()
          }
        ]">
        {{ obj.value[langIndex] }}
      </div>

      <div
        v-if="obj.value[langIndex].length === 2"
        :class="[
          { 'button-marked-color': obj.value[langIndex][0] === targetChar }
        ]">
        {{ obj.value[langIndex][0] }}
      </div>

      <div
        v-if="obj.value[langIndex].length === 2"
        :class="[
          { 'button-marked-color': obj.value[langIndex][1] === targetChar }
        ]">
        {{ obj.value[langIndex][1] }}
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes hideCursor {
  0%,
  99% {
    cursor: default;
  }
  100% {
    cursor: none;
  }
}

.btn {
  width: 900px;
}

.keyboard {
  width: 971px;
  height: 328px;
  margin: 0 auto;
  user-select: none;
  background: v-bind(keyboardBackground);
  border-radius: 15px;
}

.keyboard:hover {
  cursor: none;
  animation: hideCursor 2500ms;
}

.button,
.button-double,
.button-marked {
  float: left;
  width: 62px;
  height: 62px;
  margin-top: 3px;
  margin-right: 3px;
  font-size: 23px;
  font-family: 'Consolas', monospace;
  text-align: center;
  text-transform: capitalize;
  background: v-bind(keyBackground);
  color: v-bind(keyColor);
  /* border: none; */
  border-radius: 15px;
}

.button > div {
  position: relative;
  top: 16px;
  height: 28px;
}

.button-double > div {
  height: 30px;
}

.button-double > div:first-child {
  margin-top: 1px;
}

.button-double > div:last-child {
  margin-bottom: 1px;
}

.button-marked-color {
  color: v-bind(boardColor);
}

.button-marked-border {
  box-shadow: inset 0 0 0 3px v-bind(boardColor);
}

.button-marked-shift {
  box-shadow: inset 0 0 0 3px v-bind(shiftColor);
  color: v-bind(shiftColor);
}

#keyf,
#keyj {
  text-decoration: v-bind(keyUnderline);
}

#backquote,
#tab,
#capslock,
#shiftleft,
#controlleft {
  margin-left: 3px;
}

#backspace {
  width: 120px;
}

#tab {
  width: 91px;
}

#backslash {
  width: 91px;
}

#capslock {
  width: 109px;
}

#enter {
  width: 138px;
}

#shiftleft {
  width: 141px;
}

#shiftright {
  width: 171px;
}

#controlleft,
#controlright,
#metaleft,
#altleft,
#altright,
#metaright,
#contextmenu {
  width: 77px;
}

#space {
  width: 405px;
}
</style>

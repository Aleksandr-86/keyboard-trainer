<script setup>
import { computed, ref } from '@vue/reactivity'
import store from '../services/store'
import { isUpCase } from '../services/helpers.js'
// import CharMeter from './CharMeter.vue'

const props = defineProps({
  eventKeydown: {},
  targetChar: String,
  lang: String
})

const buttonObj = {
  backquote: ['ё', '~`'],
  digit1: ['!1', '!1'],
  digit2: ['"2', '@2'],
  digit3: ['№3', '#3'],
  digit4: [';4', '$4'],
  digit5: ['%5', '%5'],
  digit6: [':6', '^6'],
  digit7: ['?7', '&7'],
  digit8: ['*8', '*8'],
  digit9: ['(9', '(9'],
  digit0: [')0', ')0'],
  minus: ['_-', '_-'],
  equal: ['+=', '+='],
  backspace: ['backspace', 'backspace'],

  tab: ['tab', 'tab'],
  keyq: ['й', 'q'],
  keyw: ['ц', 'w'],
  keye: ['у', 'e'],
  keyr: ['к', 'r'],
  keyt: ['е', 't'],
  keyy: ['н', 'y'],
  keyu: ['г', 'u'],
  keyi: ['ш', 'i'],
  keyo: ['щ', 'o'],
  keyp: ['з', 'p'],
  bracketleft: ['х', '{['],
  bracketright: ['ъ', '}]'],
  backslash: ['/\\', '|\\'],

  capslock: ['caps', 'caps'],
  keya: ['ф', 'a'],
  keys: ['ы', 's', 's'],
  keyd: ['в', 'd', 'd'],
  keyf: ['а', 'f', 'f'],
  keyg: ['п', 'g', 'g'],
  keyh: ['р', 'h', 'h'],
  keyj: ['о', 'j', 'j'],
  keyk: ['л', 'k', 'k'],
  keyl: ['д', 'l', 'l'],
  semicolon: ['ж', ':;'],
  quote: ['э', `"'`],
  enter: ['enter', 'enter'],

  shiftleft: ['shift', 'shift'],
  keyz: ['я', 'z'],
  keyx: ['ч', 'x'],
  keyc: ['с', 'c'],
  keyv: ['м', 'v'],
  keyb: ['и', 'b'],
  keyn: ['т', 'n'],
  keym: ['ь', 'm'],
  comma: ['б', '<,'],
  period: ['ю', '>.'],
  slash: [',.', '?/'],
  shiftright: ['shift', 'shift'],

  controlleft: ['ctrl', 'ctrl'],
  osleft: ['win', 'win'],
  altleft: ['alt', 'alt'],
  space: [' ', ' '],
  altright: ['alt', 'alt'],
  osright: ['win', 'win'],
  contextmenu: ['menu', 'menu'],
  controlright: ['ctrl', 'ctrl'],

  leftside: ['1', '2'],
  rightside: ['1', '2']
}

const langIndex = computed(() => {
  if (props.lang === 'russian') {
    return 0
  } else if (props.lang === 'english') {
    return 1
  }
})

// const keyCode = computed(
//   () => props.eventKeydown.code && props.eventKeydown.code.toLowerCase()
// )

const keyValue = computed(
  () => props.eventKeydown.key && props.eventKeydown.key.toLowerCase()
)

// const shift = computed(
//   () => props.eventKeydown.key && props.eventKeydown.shiftKey
// )

let lShift = computed(() => {
  if (store.storage.pointers) return

  let targetChar = props.targetChar
  const magenta = 'hsla(300, 80%, 40%, 1)'

  if (
    isUpCase(targetChar) &&
    /[нртгоьшлбщдюзжхэъyhnujmikolp]/.test(targetChar.toLowerCase())
  ) {
    return magenta
  } else if (props.lang === 'russian' && /[?*()_+,/]/.test(targetChar)) {
    return magenta
  } else if (props.lang === 'english' && /[&*()_+{}|:"<>?]/.test(targetChar)) {
    return magenta
  }
})

const rShiftBorder = computed(() => {
  if (store.storage.pointers) return

  let targetChar = props.targetChar
  const magenta = 'hsla(300, 80%, 40%, 1)'

  if (
    isUpCase(targetChar) &&
    /[ёйфяцычувскамепиqazwsxedcrfvtgb]/.test(targetChar.toLowerCase())
  ) {
    return magenta
  } else if (props.lang === 'russian' && /[!"№;%:]/.test(targetChar)) {
    return magenta
  } else if (props.lang === 'english' && /[~!@#$%^]/.test(targetChar)) {
    return magenta
  }
})

const rShiftColor = computed(() => {
  if (store.storage.pointers) return

  let targetChar = props.targetChar
  const magenta = 'hsla(300, 80%, 40%, 1)'

  if (
    isUpCase(targetChar) &&
    /[ёйфяцычувскамепиqazwsxedcrfvtgb]/.test(targetChar.toLowerCase())
  ) {
    return magenta
  } else if (props.lang === 'russian' && /[!"№;%:]/.test(targetChar)) {
    return magenta
  } else if (props.lang === 'english' && /[~!@#$%^]/.test(targetChar)) {
    return magenta
  } else {
    return 'hsl(0, 0%, 70%)'
  }
})

const boardColor = computed(() => {
  if (store.storage.pointers) return

  let targetChar = store.data.fragmentArr[store.data.indexArr].toLowerCase()

  if (props.lang === 'russian') {
    if (/[ё1!йфя0)зж.,\-_хэ=+ъ\\/]/.test(targetChar)) {
      return 'hsla(300, 80%, 40%, 1)'
    } else if (/[2"цыч9(щдю]/.test(targetChar)) {
      return 'hsla(180, 100%, 35%, 1)'
    } else if (/[3№увс8*шлб]/.test(targetChar)) {
      return 'hsla(120, 80%, 30%, 1)'
    } else if (/[4;кам5%епи6:]/.test(targetChar)) {
      return 'hsla(240, 80%, 50%, 1)'
    } else if (/[7?нртгоь]/.test(targetChar)) {
      return 'hsla(0, 75%, 50%, 1)'
    }
  } else if (props.lang === 'english') {
    if (/[`~1!qaz0)p;:/?\-_\[{'"=+\]}\\|]/.test(targetChar)) {
      return 'hsla(300, 60%, 40%, 1)'
    } else if (/[2@wsx9(ol.>]/.test(targetChar)) {
      return 'hsla(60, 80%, 35%, 1)'
    } else if (/[3#edc8*ik,<]/.test(targetChar)) {
      return 'hsla(120, 80%, 30%, 1)'
    } else if (/[4$rfv5%tgb6^]/.test(targetChar)) {
      return 'hsla(240, 70%, 55%, 1)'
    } else if (/[7&yhnujm]/.test(targetChar)) {
      return 'hsla(0, 75%, 50%, 1)'
    }
  }

  if (/ /.test(targetChar)) {
    // return 'hsla(0, 0%, 0%, 0.4)'
    return 'hsl(0, 0%, 70%)'
  }
})
</script>

<template>
  <button class="btn">
    langIndex: {{ langIndex }}, targetChar: _{{ targetChar }}_, keyCode:
    {{ props.eventKeydown.code }}, keyValue: _{{ keyValue }}_
  </button>
  <div class="keyboard">
    <div
      v-for="(value, id, index) in buttonObj"
      :class="[
        {
          // 'button-marked': value[langIndex].includes(targetChar.toLowerCase())
          'button-marked':
            value[langIndex] === targetChar.toLowerCase() ||
            (value[langIndex].length === 2 &&
              value[langIndex].includes(targetChar.toLowerCase()))
        },
        {
          button:
            (value[langIndex].length === 1 || value[langIndex].length > 2) &&
            index !== 61 &&
            index !== 62
        },
        { 'button-double': value[langIndex].length === 2 }
      ]"
      :id="id">
      <div
        v-if="value[langIndex].length === 1 || value[langIndex].length > 2"
        :class="[
          { 'board-color': value[langIndex] === targetChar.toLowerCase() }
        ]">
        {{ value[langIndex] }}
      </div>

      <div
        v-if="value[langIndex].length === 2"
        :class="[{ 'board-color': value[langIndex][0] === targetChar }]">
        {{ value[langIndex][0] }}
      </div>

      <div
        v-if="value[langIndex].length === 2"
        :class="[{ 'board-color': value[langIndex][1] === targetChar }]">
        {{ value[langIndex][1] }}
      </div>
    </div>
  </div>
</template>

<style>
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
  width: 945px;
  height: 318px;
  margin: 0 auto;
  user-select: none;
  /* background: rgb(170, 170, 170); */
  background: hsl(0, 0%, 15%);
  border-radius: 15px;
}

.keyboard:hover {
  cursor: none;
  animation: hideCursor 2500ms;
}

.button,
.button-double,
.button-marked {
  /* display: inline-block; */
  float: left;
  width: 60px;
  height: 60px;
  margin-top: 3px;
  margin-right: 3px;
  font-size: 23px;
  font-family: 'Consolas', monospace;
  text-align: center;
  text-transform: capitalize;
  /* color: black;
  background: hsl(0, 0%, 80%); */
  color: hsl(0, 0%, 70%);
  background: hsl(0, 0%, 0%);
  /* border: none; */
  border-radius: 15px;
}

.button > div {
  position: relative;
  /* background-color: greenyellow; */
  top: 16px;
  height: 28px;
}

.button-double > div {
  /* background-color: aqua; */
  margin-top: 2px;
  height: 27px;
}

.board-color {
  color: v-bind(boardColor);
}

@keyframes fadeGreenColor {
  0% {
    background-color: hsla(120, 80%, 65%);
  }
  100% {
    background: hsl(0, 0%, 80%);
  }
}

.button-marked {
  box-shadow: inset 0 0 0 3px v-bind(boardColor);
}

.button-correct {
  background-color: hsla(120, 80%, 65%, 1);
}

.button-wrong {
  background-color: hsla(0, 100%, 75%, 1);
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
  width: 90px;
}

#backslash {
  width: 90px;
}

#capslock {
  width: 107px;
}

#enter {
  width: 136px;
}

#shiftleft {
  width: 138px;
  box-shadow: inset 0 0 0 3px v-bind(lShift);
  /* color: v-bind(lShift); */
}

#shiftright {
  width: 168px;
  box-shadow: inset 0 0 0 3px v-bind(rShiftBorder);
  color: v-bind(rShiftColor);
}

#controlleft,
#osleft,
#altleft,
#altright,
#osright,
#contextmenu {
  width: 75px;
}

#space {
  width: 393px;
}

#controlright {
  width: 75px;
}
</style>

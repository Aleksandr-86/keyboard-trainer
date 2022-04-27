<script setup>
import { computed, ref } from '@vue/reactivity'
import store from '../services/store'
import { isUpCase } from '../services/helpers.js'
// import CharMeter from './CharMeter.vue'

const props = defineProps({
  keyCode: String,
  keyValue: String,
  targetChar: String,
  lang: String
})

const buttonObj = {
  backquote: ['ё', 'ё', '`', '~'],
  digit1: ['1', '!', '1', '!'],
  digit2: ['2', '"', '2', '@'],
  digit3: ['3', '№', '3', '#'],
  digit4: ['4', ';', '4', '$'],
  digit5: ['5', '%', '5', '%'],
  digit6: ['6', ':', '6', '^'],
  digit7: ['7', '?', '7', '&'],
  digit8: ['8', '*', '8', '*'],
  digit9: ['9', '(', '9', '('],
  digit0: ['0', ')', '0', ')'],
  minus: ['-', '_', '-', '_'],
  equal: ['=', '+', '=', '+'],
  backspace: ['backspace', 'backspace', 'backspace', 'backspace'],

  tab: ['tab', 'tab', 'tab', 'tab'],
  keyq: ['й', 'й', 'q', 'q'],
  keyw: ['ц', 'ц', 'w', 'w'],
  keye: ['у', 'у', 'e', 'e'],
  keyr: ['к', 'к', 'r', 'r'],
  keyt: ['е', 'е', 't', 't'],
  keyy: ['н', 'н', 'y', 'y'],
  keyu: ['г', 'г', 'u', 'u'],
  keyi: ['ш', 'ш', 'i', 'i'],
  keyo: ['щ', 'щ', 'o', 'o'],
  keyp: ['з', 'з', 'p', 'p'],
  bracketleft: ['х', 'х', '[', '{'],
  bracketright: ['ъ', 'ъ', ']', '}'],
  backslash: ['\\', '/', '\\', '|'],

  capslock: ['Caps', 'Caps', 'Caps', 'Caps'],
  keya: ['ф', 'ф', 'a', 'a'],
  keys: ['ы', 'ы', 's', 's'],
  keyd: ['в', 'в', 'd', 'd'],
  keyf: ['а', 'а', 'f', 'f'],
  keyg: ['п', 'п', 'g', 'g'],
  keyh: ['р', 'р', 'h', 'h'],
  keyj: ['о', 'о', 'j', 'j'],
  keyk: ['л', 'л', 'k', 'k'],
  keyl: ['д', 'д', 'l', 'l'],
  semicolon: ['ж', 'ж', ';', ':'],
  quote: ['э', 'э', "'", '"'],
  enter: ['Enter', 'Enter', 'Enter', 'Enter'],

  shiftleft: ['Shift', 'Shift', 'Shift', 'Shift'],
  keyz: ['я', 'я', 'z', 'z'],
  keyx: ['ч', 'ч', 'x', 'x'],
  keyc: ['с', 'с', 'c', 'c'],
  keyv: ['м', 'м', 'v', 'v'],
  keyb: ['и', 'и', 'b', 'b'],
  keyn: ['т', 'т', 'n', 'n'],
  keym: ['ь', 'ь', 'm', 'm'],
  comma: ['б', 'б', ',', '<'],
  period: ['ю', 'ю', '.', '>'],
  slash: ['.', ',', '/', '?'],
  shiftright: ['Shift', 'Shift', 'Shift', 'Shift'],

  controlleft: ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
  osleft: ['Win', 'Win', 'Win', 'Win'],
  altleft: ['Alt', 'Alt', 'Alt', 'Alt'],
  space: [' ', ' ', ' ', ' '],
  altright: ['Alt', 'Alt', 'Alt', 'Alt'],
  osright: ['Win', 'Win', 'Win', 'Win'],
  contextmenu: ['Menu', 'Menu', 'Menu', 'Menu'],
  controlright: ['Ctrl', 'Ctrl', 'Ctrl', 'Ctrl']
}

const langIndex = computed(() => {
  if (props.lang === 'russian-basic') {
    return 0
  } else if (props.lang === 'russian-extended') {
    return 1
  } else if (props.lang === 'english-basic') {
    return 2
  } else if (props.lang === 'english-extended') {
    return 3
  }
})

const keyCode = computed(() => props.keyCode && props.keyCode.toLowerCase())

let lShift = computed(() => {
  let targetChar = props.targetChar

  if (
    isUpCase(targetChar) &&
    /[нртгоьшлбщдюзжхэъyhnujmikolp]/.test(targetChar.toLowerCase())
  ) {
    return 'hsla(25, 85%, 45%, 1)'
  } else if (
    props.lang === 'russian-extended' &&
    /[?*()_+,/]/.test(targetChar)
  ) {
    return 'hsla(25, 85%, 45%, 1)'
  } else if (
    props.lang === 'english-extended' &&
    /[&*()_+{}|:"<>?]/.test(targetChar)
  ) {
    return 'hsla(25, 85%, 45%, 1)'
  } else {
    return 'transparent'
  }
})

let rShift = computed(() => {
  let targetChar = props.targetChar

  if (
    isUpCase(targetChar) &&
    /[ёйфяцычувскамепиqazwsxedcrfvtgb]/.test(targetChar.toLowerCase())
  ) {
    return 'hsla(25, 85%, 45%, 1)'
  } else if (props.lang === 'russian-extended' && /[!"№;%:]/.test(targetChar)) {
    return 'hsla(25, 85%, 45%, 1)'
  } else if (
    props.lang === 'english-extended' &&
    /[~!@#$%^]/.test(targetChar)
  ) {
    return 'hsla(25, 85%, 45%, 1)'
  } else {
    return 'transparent'
  }
})

const boardColor = computed(() => {
  if (store.storage.pointers) return

  let targetChar = store.data.fragmentArr[store.data.indexArr].toLowerCase()

  if (props.lang === 'russian-basic' || props.lang === 'russian-extended') {
    if (/[ё1!йфя0)зж.,\-_хэ=+ъ\\/]/.test(targetChar)) {
      return 'hsla(25, 85%, 45%, 1)'
    } else if (/[2"цыч9(щдю]/.test(targetChar)) {
      return 'hsla(240, 100%, 50%, 1)'
    } else if (/[3№увс8*шлб]/.test(targetChar)) {
      return 'hsla(120, 80%, 30%, 1)'
    } else if (/[4;кам5%епи6:7?нртгоь]/.test(targetChar)) {
      return 'hsla(285, 70%, 55%, 1)'
    }
  } else if (
    props.lang === 'english-basic' ||
    props.lang === 'english-extended'
  ) {
    if (/[`~1!qaz0)p;:/?\-_\[{'"=+\]}\\|]/.test(targetChar)) {
      return 'hsla(25, 85%, 45%, 1)'
    } else if (/[2@wsx9(ol.>]/.test(targetChar)) {
      return 'hsla(240, 100%, 50%, 1)'
    } else if (/[3#edc8*ik,<]/.test(targetChar)) {
      return 'hsla(120, 80%, 30%, 1)'
    } else if (/[4$rfv5%tgb6^7&yhnujm]/.test(targetChar)) {
      return 'hsla(285, 70%, 55%, 1)'
    }
  }

  if (/ /.test(targetChar)) {
    return 'black'
  }
})

const keyboardDivision = computed(() => {
  if (store.storage.pointers) {
    return '0px'
  } else {
    return '11px'
  }
})
</script>

<template>
  <button class="btn">
    langIndex: {{ langIndex }}, targetChar: _{{ targetChar }}_, keyCode:
    {{ keyCode }}
  </button>
  <div class="keyboard">
    <div
      v-for="(item, id) in buttonObj"
      class="button-up"
      :class="[
        {
          'button-dn2': item[langIndex] === targetChar.toLowerCase()
        }

        // {
        //   'button-orange-pointer': 'keya, semicolon'.includes(id)
        // },
        // {
        //   'button-green-pointer': 'keys, keyl'.includes(id)
        // },
        // {
        //   'button-blue-pointer': 'keyd, keyk'.includes(id)
        // },
        // {
        //   'button-violet-pointer': 'keyf, keyj'.includes(id)
        // }
      ]"
      :id="id">
      {{ item[langIndex] }}
    </div>
  </div>
</template>

<style>
.btn {
  width: 900px;
}

.keyboard {
  width: calc(v-bind(keyboardDivision) + 945px);
  height: 318px;
  margin: 0 auto;
  user-select: none;
  background: rgb(170, 170, 170);
  border-radius: 15px;
  /* transition: all visibility 300ms, opacity 300ms; */
}

.button-up,
.button-dn1,
.button-dn2,
.button-dn3 {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-top: 3px;
  margin-right: 3px;
  font-size: 23px;
  font-family: 'Consolas', monospace;
  text-align: center;
  text-transform: capitalize;
  color: black;
  background: rgb(200, 200, 200);
  /* border: none; */
  border-radius: 15px;
}

.button-up:after,
.button-dn1:after,
.button-dn2:after,
.button-dn3:after {
  content: '';
  height: 63px;
  display: inline-block;
  vertical-align: middle;
}

.button-grey-board {
  /* box-shadow: inset 0 0 10px 3px hsla(0, 0%, 40%); */
  box-shadow: inset 0 0 0 3px hsla(0, 0%, 40%);
}

.button-orange-pointer {
  box-shadow: inset 0 0 0 3px hsla(25, 85%, 45%, 1);
}

.button-green-pointer {
  box-shadow: inset 0 0 0 3px hsla(240, 100%, 50%, 1);
}

.button-blue-pointer {
  box-shadow: inset 0 0 0 3px hsla(120, 80%, 30%, 1);
}

.button-violet-pointer {
  /* box-shadow: inset 0 0 0 3px hsla(282, 100%, 41%, 0.2); */
  box-shadow: inset 0 0 0 3px hsla(270, 100%, 55%, 1);
}

.button-dn1 {
  /* box-shadow: 0 0 30px 15px hsla(120, 90%, 70%, 0.7),
    inset 0 0 45px hsla(120, 90%, 70%, 0.7); */
  /* background-color: hsl(120, 100%, 65%); */
  /* z-index: 1; */
  box-shadow: inset 0 0 50px hsl(120, 100%, 60%);
}

.button-dn2 {
  /* box-shadow: 0 0 30px 15px hsla(180, 90%, 50%, 0.7),
    inset 0 0 30px hsla(180, 90%, 50%, 0.7); */
  /* z-index: 1; */
  /* box-shadow: inset 0 0 50px hsl(180, 90%, 50%); */
  /* box-shadow: inset 0 0 0 3px v-bind(boardColor),
    inset 0 0 50px hsl(180, 90%, 50%); */
  box-shadow: inset 0 0 0 3px v-bind(boardColor);
  /* box-shadow: inset 0 0 10px 3px v-bind(boardColor); */
}

.button-dn3 {
  box-shadow: inset 0 0 0 3px hsl(120, 100%, 33%);
}

.row1,
.row2,
.row3,
.row4,
.row5 {
  display: flex;
  width: inherit;
}

.row1 div:first-child,
.row2 div:first-child,
.row3 div:first-child,
.row4 div:first-child,
.row5 div:first-child {
  margin-left: 3px;
}

#digit6,
#keyt,
#keyg,
#keyb {
  margin-right: calc(v-bind(keyboardDivision) + 3px);
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
}

#shiftright {
  width: 168px;
  box-shadow: inset 0 0 0 3px v-bind(rShift);
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
  width: calc(v-bind(keyboardDivision) + 393px);
}

#controlright {
  width: 75px;
}
</style>

<script setup>
import { computed, ref } from '@vue/reactivity'
import store from '../services/store'
import CharMeter from './CharMeter.vue'

const props = defineProps({
  keyCode: String,
  keyValue: String,
  targetKey: String,
  lang: String
})

const buttonObj = {
  backquote: ['Ё', '`'],
  digit1: ['1', '1'],
  digit2: ['2', '2'],
  digit3: ['3', '3'],
  digit4: ['4', '4'],
  digit5: ['5', '5'],
  digit6: ['6', '6'],
  digit7: ['7', '7'],
  digit8: ['8', '8'],
  digit9: ['9', '9'],
  digit0: ['0', '0'],
  minus: ['-', '-'],
  equal: ['=', '='],
  backspace: ['Backspace', 'Backspace'],

  tab: ['Tab', 'Tab'],
  keyq: ['Й', 'Q'],
  keyw: ['Ц', 'W'],
  keye: ['У', 'E'],
  keyr: ['К', 'R'],
  keyt: ['Е', 'T'],
  keyy: ['Н', 'Y'],
  keyu: ['Г', 'U'],
  keyi: ['Ш', 'I'],
  keyo: ['Щ', 'O'],
  keyp: ['З', 'P'],
  bracketleft: ['Х', '['],
  bracketright: ['Ъ', ']'],
  backslash: ['\\', '\\'],

  capslock: ['Caps', 'Caps'],
  keya: ['Ф', 'A'],
  keys: ['Ы', 'S'],
  keyd: ['В', 'D'],
  keyf: ['А', 'F'],
  keyg: ['П', 'G'],
  keyh: ['Р', 'H'],
  keyj: ['О', 'J'],
  keyk: ['Л', 'K'],
  keyl: ['Д', 'L'],
  semicolon: ['Ж', ';'],
  quote: ['Э', "'"],
  enter: ['Enter', 'Enter'],

  shiftleft: ['Shift', 'Shift'],
  keyz: ['Я', 'Z'],
  keyx: ['Ч', 'X'],
  keyc: ['С', 'C'],
  keyv: ['М', 'V'],
  keyb: ['И', 'B'],
  keyn: ['Т', 'N'],
  keym: ['Ь', 'M'],
  comma: ['Б', ','],
  period: ['Ю', '.'],
  slash: ['.', '/'],
  shiftright: ['Shift', 'Shift'],

  controlleft: ['Ctrl', 'Ctrl'],
  osleft: ['Win', 'Win'],
  altleft: ['Alt', 'Alt'],
  space: [' ', ' '],
  altright: ['Alt', 'Alt'],
  osright: ['Win', 'Win'],
  contextmenu: ['Menu', 'Menu'],
  controlright: ['Ctrl', 'Ctrl']
}

const langIndex = computed(() => {
  if (props.lang === 'english') {
    return 1
  } else {
    return 0
  }
})

const keyCode = computed(() => props.keyCode && props.keyCode.toLowerCase())

const boardColor = computed(() => {
  const targetChar = store.data.fragmentArr[store.data.indexArr].toLowerCase()

  if (props.lang === 'russian') {
    if (/[ё1йфя0зж.\-хэ=ъ\\]/.test(targetChar)) {
      return 'green'
    } else if (/[2цыч9щдю]/.test(targetChar)) {
      return 'blue'
    } else if (/[3увс8шлб]/.test(targetChar)) {
      return 'darkorange'
    } else if (/[4кам5епи67нртгоь]/.test(targetChar)) {
      return 'darkviolet'
    }
  } else if (props.lang === 'english') {
    if (/[`1qaz~!0p;/\-\['=\]\\]/.test(targetChar)) {
      return 'green'
    } else if (/[2wsx9ol.]/.test(targetChar)) {
      return 'blue'
    } else if (/[3edc8ik,]/.test(targetChar)) {
      return 'darkorange'
    } else if (/[4rfv5tgb67yhnujm]/.test(targetChar)) {
      return 'darkviolet'
    }
  }

  if (/ /.test(targetChar)) {
    return 'black'
  }
})

// console.warn(buttonObj[props.keyCode][2])
// console.warn(buttonObj['digit3'])
</script>

<template>
  <button class="btn">{{ keyValue }},{{ keyCode }}, _{{ targetKey }}_</button>
  <div class="keyboard">
    <div
      v-for="(item, id) in buttonObj"
      class="button-up"
      :class="[
        // { 'button-dn1': id === keyCode },
        {
          'button-dn2':
            item[langIndex].toLowerCase() === targetKey.toLowerCase()
        }
      ]"
      :id="id">
      {{ item[langIndex] }}
    </div>
  </div>
</template>

<style>
.btn {
  width: 300px;
}

.keyboard {
  /* width: 945px; */
  width: 956px;
  height: 318px;
  margin: 0 auto;
  user-select: none;
  background: rgb(170, 170, 170);
  border-radius: 15px;

  /* transition: all visibility 300ms, opacity 300ms; */
}

.button-up,
.button-dn1,
.button-dn2 {
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-top: 3px;
  margin-right: 3px;
  font-size: 23px;
  font-family: 'Consolas', monospace;
  text-align: center;

  color: black;
  background: rgb(200, 200, 200);
  /* border: none; */
  border-radius: 15px;
}

.button-up:after,
.button-dn1:after,
.button-dn2:after {
  content: '';
  height: 63px;
  display: inline-block;
  vertical-align: middle;
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
}

/* .button-dn1:after,
.button-dn2:after {
  height: 68px;
} */

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
  margin-right: 14px;
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
}

#shiftright {
  width: 168px;
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
  width: 404px;
}

#controlright {
  width: 75px;
}
</style>

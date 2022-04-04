<script setup>
import { computed } from '@vue/reactivity'

const props = defineProps({
  keyDown: String,
  keyUp: String,
  lang: String
})

const buttonObj = {
  row1: {
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
    backspace: ['Backspace', 'Backspace']
  },

  row2: {
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
    backslash: ['\\', '\\']
  },

  row3: {
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
    enter: ['Enter', 'Enter']
  },

  row4: {
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
    shiftright: ['Shift', 'Shift']
  },

  row5: {
    controlleft: ['Ctrl', 'Ctrl'],
    osleft: ['Win', 'Win'],
    altleft: ['Alt', 'Alt'],
    space: [' ', ' '],
    altright: ['Alt', 'Alt'],
    osright: ['Win', 'Win'],
    contextmenu: ['Menu', 'Menu'],
    controlright: ['Ctrl', 'Ctrl']
  }
}

const langIndex = computed(() => {
  if (props.lang === 'rus') {
    return 0
  } else if (props.lang === 'eng') {
    return 1
  }
})

const keyDown = computed(() => props.keyDown && props.keyDown.toLowerCase())
</script>

<template>
  <div class="keyboard">
    <div v-for="n in 5" :class="['row' + n]">
      <div
        v-for="(item, id) in buttonObj['row' + n]"
        class="button-up"
        :id="id">
        {{ item[langIndex] }}
      </div>
    </div>
  </div>
</template>

<style>
.keyboard {
  width: 945px;
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
  font-size: 21px;
  font-family: 'Consolas', monospace;
  text-align: center;

  color: black;
  background: rgb(200, 200, 200);
  border: none;
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
  box-shadow: 0 0 30px 15px hsla(180, 90%, 50%, 0.7),
    inset 0 0 45px hsla(180, 90%, 50%, 0.7);
  z-index: 1;
}

.button-dn2 {
  box-shadow: 0 0 30px 15px rgb(0, 255, 255, 0.5),
    inset 0 0 30px rgb(0, 255, 255, 0.5);
}

.button-dn1:after,
.button-dn2:after {
  height: 68px;
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
  width: 393px;
}

#controlright {
  width: 75px;
}
</style>

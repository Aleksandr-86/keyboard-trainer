<script setup>
import { computed } from '@vue/reactivity'
import { reactive, ref } from 'vue'
import store from '/src/services/store.js'
import Button from './Button.vue'

const props = defineProps({
  keyDown: {},
  keyUp: {}
})

const pressed = computed(() => props.keyDown && props.keyDown.toLowerCase())

const arr = ['digit1', 'digit2', 'digit3']
</script>

<template>
  <div class="keyboard">
    <!-- <KeyboardButton :cod="pressed" :key="str" /> -->
    <!-- <Button :code="pressed" ky="digit1" text="1" /> -->

    <div class="row1">
      <Button :code="pressed" id="backquote" text="Ё" />

      <Button v-for="item in arr" :code="pressed" id="backquote" :text="item" />

      <div class="button-up" id="digit5">5</div>
      <div class="button-up" id="digit6">6</div>
      <div class="button-up" id="digit7">7</div>
      <div class="button-up" id="digit8">8</div>
      <div class="button-up" id="digit9">9</div>
      <div class="button-up" id="digit0">0</div>
      <div class="button-up" id="minus">-</div>
      <div class="button-up" id="equal">=</div>
      <div class="button-up" id="backspace">Backspace</div>
    </div>

    <div class="row2">
      <div class="button-up" id="tab">Tab</div>
      <div class="button-up" id="keyq">Й</div>
      <div class="button-up" id="keyw">Ц</div>
      <div class="button-up" id="keye">У</div>
      <div class="button-up" id="keyr">К</div>
      <div class="button-up" id="keyt">Е</div>
      <div class="button-up" id="keyy">Н</div>
      <div class="button-up" id="keyu">Г</div>
      <div class="button-up" id="keyi">Ш</div>
      <div class="button-up" id="keyo">Щ</div>
      <div class="button-up" id="keyp">З</div>
      <div class="button-up" id="bracketleft">Х</div>
      <div class="button-up" id="bracketright">Ъ</div>
      <div class="button-up" id="backslash">\</div>
    </div>

    <div class="row3">
      <div class="button-up" id="capslock">Caps</div>
      <div class="button-up" id="keya">Ф</div>
      <div class="button-up" id="keys">Ы</div>
      <div class="button-up" id="keyd">В</div>
      <div class="button-up" id="keyf">А</div>
      <div class="button-up" id="keyg">П</div>
      <div class="button-up" id="keyh">Р</div>
      <div class="button-up" id="keyj">О</div>
      <div class="button-up" id="keyk">Л</div>
      <div class="button-up" id="keyl">Д</div>
      <div class="button-up" id="semicolon">Ж</div>
      <div class="button-up" id="quote">Э</div>
      <div class="button-up" id="enter">Enter</div>
    </div>

    <div class="row4">
      <div class="button-up" id="shiftleft">Shift</div>
      <div class="button-up" id="keyz">Я</div>
      <div class="button-up" id="keyx">Ч</div>
      <div class="button-up" id="keyc">С</div>
      <div class="button-up" id="keyv">М</div>
      <div class="button-up" id="keyb">И</div>
      <div class="button-up" id="keyn">Т</div>
      <div class="button-up" id="keym">Ь</div>
      <div class="button-up" id="comma">Б</div>
      <div class="button-up" id="period">Ю</div>
      <div class="button-up" id="slash">.</div>
      <div class="button-up" id="shiftright">Shift</div>
    </div>

    <div class="row5">
      <div class="button-up" id="controlleft">Ctrl</div>
      <div class="button-up" id="osleft">Win</div>
      <div class="button-up" id="altleft">Alt</div>
      <div class="button-up" id="space"></div>
      <div class="button-up" id="altright">Alt</div>
      <div class="button-up" id="osright">Win</div>
      <div class="button-up" id="contextmenu">Menu</div>
      <div class="button-up" id="controlright">Ctrl</div>
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

span {
  /* text-transform: lowercase; */
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

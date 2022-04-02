<script setup>
import { reactive } from 'vue'
import store from '/src/services/store.js'
import FingerPointers from './FingerPointers.vue'
import Keyboard from './Keyboard.vue'

const events = reactive({
  keyDn: Object,
  keyUp: Object
})

const layoutLang = 'eng'

document.body.addEventListener('keydown', (e) => (events.keyDn = e))
document.body.addEventListener('keyup', (e) => (events.keyUp = e))
</script>

<template>
  <FingerPointers
    v-if="store.state.pointers && store.state.work"
    :key-down="events.keyDn.key"
    :lang="layoutLang"
  />

  <!-- <div>{{ store.event.keyDown.key }}</div> -->
  <div class="field" id="field">
    <div class="line" id="line1"></div>
    <div class="line" id="line2"></div>
    <div class="line" id="line3"></div>
    <div class="line" id="line4"></div>
    <div class="line" id="line5"></div>
  </div>

  <Keyboard v-if="store.state.keyboard && store.state.work" />
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
  background-color: rgb(40, 190, 100);
  width: 80px;
  height: 80px;
}

.field {
  /* display: flex;
  flex-wrap: wrap;
  align-content: flex-start; */

  --field-bar-width: 0;
  --field-bar-hue: 0;
  width: 1440px;
  height: 385px;
  margin: 10px auto 50px;
  backdrop-filter: blur(200px);
  user-select: none;
  cursor: none;
  /* transition: visibility 3000ms, opacity 3000ms; */
  background-color: pink;
}

.hidden {
  background-color: red;
}

.field::before {
  position: absolute;
  content: '';
  width: var(--field-bar-width);
  height: 14px;
  left: -7px;
  bottom: -7px;
  background: hsl(var(--field-bar-hue), 80%, 50%);
  transform-origin: 0 50%;
  transform: rotate(270deg);
}

.field:hover {
  animation: hideCursor 3s;
}

.line {
  width: inherit;
  height: 77px;
}

.char {
  float: left;
  width: 36px;
  height: 77px;
  font-family: 'Consolas', monospace;
  font-size: 65px;
  background: rgba(50, 50, 50, 0.75);
  color: rgb(165, 165, 165);
}

.char-caret {
  position: relative;
  z-index: -1;
}

.char-caret:after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 39px;
  height: 5px;
  background: rgba(30, 30, 30, 0.7);
  filter: drop-shadow(3px 2px 2px yellowgreen) brightness(250%);
}

.char-correct {
  color: rgb(40, 190, 100);
  filter: drop-shadow(3px 2px 2px) brightness(95%);
}

.char-wrong {
  color: rgb(255, 50, 50);
  filter: drop-shadow(3px 2px 2px) brightness(95%);
}

.char-neutral-inactive {
  color: rgb(100, 100, 180);
}

.char-neutral-active {
  color: rgb(100, 100, 180);
  filter: drop-shadow(3px 2px 2px) brightness(95%);
}
</style>

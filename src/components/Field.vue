<script setup>
// import { ref } from 'vue'
import { useStrPreparer } from '/src/services/str-preparer.js'

const someString = 'Ихтиандр решил испугать их еще больше: он оскалил зубы'

console.log(useStrPreparer(someString))
</script>

<template>
  <div class="field" id="field">
    <div class="line" id="line1"></div>
    <div class="line" id="line2"></div>
    <div class="line" id="line3"></div>
    <div class="line" id="line4"></div>
    <div class="line" id="line5"></div>
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

.field {
  --field-bar-width: 0;
  --field-bar-hue: 0;
  width: 1440px;
  height: 385px;
  margin: 10px auto 50px;
  backdrop-filter: blur(200px);
  user-select: none;
  cursor: none;
  transition: visibility 300ms, opacity 300ms;
  background-color: pink;
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
  height: inherit;
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

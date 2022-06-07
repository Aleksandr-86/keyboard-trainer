<script setup>
import { computed } from '@vue/reactivity'
import { playAudio } from '../services/helpers.js'
import clickSound from '/src/assets/sounds/click-sound.mp3'
import { storage } from '../store/storage.js'

const props = defineProps({
  obj: String,
  prop: String,
  max: String,
  step: String,
  disabled: Boolean
})

const opacity = computed(() => {
  if (props.disabled) {
    return 0.5
  } else {
    return 1
  }
})

const cursor = computed(() => {
  if (props.disabled) {
    return 'not-allowed'
  } else {
    return 'pointer'
  }
})

function mouseUp() {
  if (storage.main.speaker) playAudio(clickSound, storage.main.volume)
}
</script>

<template>
  <div class="slider-container">
    <div class="slider">
      <input
        v-model="storage[props.obj][props.prop]"
        @mouseup="mouseUp"
        type="range"
        class="slider-input"
        min="0"
        :max="props.max"
        :step="props.step"
        :disabled="props.disabled" />

      <label class="slider-label">{{ storage[props.obj][props.prop] }}</label>
    </div>
  </div>
</template>

<style>
.slider-container {
  opacity: v-bind(opacity);
}

.slider {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 29px;
}

.slider-input {
  -webkit-appearance: none;
  top: 0;
  left: 0;
  width: 397px;
  height: 18px;
  background: hsl(0, 0%, 83%);
  border-radius: 5px;
  outline: none;
  cursor: v-bind(cursor);
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 25px;
  background: hsl(0, 0%, 83%);
  border-radius: 5px;
  cursor: v-bind(cursor);
}

.slider-input::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: hsl(122, 39%, 49%);
  border-radius: 50%;
  cursor: v-bind(cursor);
}

.slider-label {
  width: 45px;
  margin-left: 5px;
  color: hsl(0, 0%, 83%);
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}
</style>

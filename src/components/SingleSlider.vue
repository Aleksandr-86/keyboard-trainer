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

<style scoped>
.slider-container {
  opacity: v-bind(opacity);
}

.slider {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 29px;
  /* margin-left: 4px; */
}

.slider-input {
  /* position: absolute; */
  top: 0;
  left: 0;
  -webkit-appearance: none;
  width: 397px;
  height: 18px;
  border-radius: 5px;
  background: hsl(0, 0%, 83%);
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  cursor: v-bind(cursor);
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 25px;
  border-radius: 5px;
  background: hsl(0, 0%, 83%);
  cursor: v-bind(cursor);
}

.slider-input::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: hsl(122, 39%, 49%);
  cursor: v-bind(cursor);
}

.slider-label {
  margin-left: 5px;
  color: hsl(0, 0%, 83%);
  width: 45px;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}
</style>

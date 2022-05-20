<script setup>
import store from '../services/store'

const props = defineProps({
  obj: String,
  prop: String,
  max: String,
  step: String
})
</script>

<template>
  <div class="slider-container">
    <div class="slider">
      <input
        v-model="store.storage[props.obj][props.prop]"
        type="range"
        class="slider-input"
        min="0"
        :max="props.max"
        :step="props.step" />

      <label class="slider-label">{{
        store.storage[props.obj][props.prop]
      }}</label>
    </div>
  </div>
</template>

<style scoped>
.slider-title {
  text-align: left;
  height: 29px;
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
  /* opacity: 0.7; */
  /* -webkit-transition: 0.2s;
  transition: opacity 0.2s; */
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 25px;
  border-radius: 5px;
  /* background: hsl(v-bind(hue), 100%, 50%); */
  /* filter: invert(1); */
  background: hsl(0, 0%, 83%);
  cursor: pointer;
}

.slider-input::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: hsl(122, 39%, 49%);
  cursor: pointer;
}

.slider-label {
  margin-left: 5px;
  color: hsl(0, 0%, 83%);
  width: 45px;
}
</style>

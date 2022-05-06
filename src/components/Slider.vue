<script setup>
import { onMounted, reactive } from 'vue'

const hsla = reactive({
  hue: 0,
  saturation: 0,
  lightness: 0,
  alpha: 0
})
// const output = document.querySelector('#demo')

// console.warn(vol)
// console.warn(o)
// output.innerHTML = slider.value

// slider.oninput = function () {
//   output.innerHTML = this.value
// }
onMounted(() => {
  const hue = document.body.querySelector('#hue')
})

const fn = function () {
  hsla.hue = hue.valueAsNumber
  console.warn(hsla.hue)
}
</script>

<template>
  <div class="slider-container">
    <input
      @click="fn"
      type="range"
      class="slider"
      id="hue"
      min="0"
      max="360"
      step="1"
      value="20" />
    <label for="hue">{{ hsla.hue }}</label>
  </div>
</template>

<style scoped>
.slider-container {
  width: 380px;
  background-color: grey;
  margin-top: 10px;
}

.slider {
  -webkit-appearance: none;
  /* width: 100%; */
  width: 300px;
  margin-right: 35px;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

label {
  /* margin-left: 15px; */
  color: black;
  width: 45px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}
</style>

<script setup>
import { onMounted, reactive, computed } from 'vue'

const hsla = reactive({
  hue: 0,
  saturation: 0,
  lightness: 0,
  alpha: 0
})

const inputHue = function () {
  hsla.hue = sliderhue.valueAsNumber
}

onMounted(() => {
  hsla.hue = 355
})
</script>

<template>
  <div class="slider-container">
    <div class="slider-container-description">Левый указательный палец</div>
    <div class="slider-description">Оттенок</div>
    <div class="slider">
      <input
        @input="inputHue"
        type="range"
        class="slider-input"
        id="sliderhue"
        min="0"
        max="360" />

      <label class="slider-label" for="hue">{{ hsla.hue }}</label>
    </div>
  </div>
</template>

<style scoped>
.slider-description {
  text-align: left;
}

.slider-container {
  width: 380px;
  background-color: grey;
  margin-top: 10px;
}

.slider-container-description {
  text-align: left;
  margin-bottom: 5px;
  background-color: red;
}

.slider {
  display: flex;
  /* float: left; */
  justify-content: flex-start;
  align-items: center;
}

.slider-input {
  -webkit-appearance: none;
  /* width: 100%; */
  width: 330px;
  height: 12px;
  border-radius: 5px;
  background: hsl(0, 0%, 83%);
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider-input:hover {
  opacity: 1;
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.slider-input::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.slider-label {
  margin-left: 5px;
  color: black;
  width: 45px;
}
</style>

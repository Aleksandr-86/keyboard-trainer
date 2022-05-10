<script setup>
import { onMounted, reactive, computed, watch } from 'vue'
import store from '../services/store'

const props = defineProps({
  title: String,
  property: String,
  num: String
})

const hsla = reactive({
  hue: Number,
  saturation: Number,
  lightness: Number,
  alpha: Number
})

const color = computed(
  () =>
    `hsla(${hsla.hue}, ${hsla.saturation}%, ${hsla.lightness}%, ${hsla.alpha})`
)

watch(color, newValue => (store.colors[props.property][props.num] = newValue))

const getNumbersFromString = function (str) {
  return str.match(/[0-9]+/g)
}

onMounted(() => {
  const colorNum = getNumbersFromString(store.colors[props.property][props.num])

  hsla.hue = colorNum[0]
  hue.value = colorNum[0]
  hsla.saturation = colorNum[1]
  saturation.value = colorNum[1]
  hsla.lightness = colorNum[2]
  lightness.value = colorNum[2]
  hsla.alpha = colorNum[3]
  alpha.value = colorNum[3]
})
</script>

<template>
  <div class="slider-container">
    <div class="slider-container-description">{{ props.title }}</div>
    <div>{{ color }}</div>
    <div>{{ props.color }}</div>

    <div class="slider-description">Оттенок</div>
    <div class="slider">
      <input
        v-model="hsla.hue"
        type="range"
        class="slider-input"
        id="hue"
        min="0"
        max="360" />
      <label class="slider-label" for="hue">{{ hsla.hue }}</label>
    </div>

    <div class="slider-description">Насыщенность</div>
    <div class="slider">
      <input
        v-model="hsla.saturation"
        type="range"
        class="slider-input"
        id="saturation"
        min="0"
        max="100" />
      <label class="slider-label" for="saturation">{{ hsla.saturation }}</label>
    </div>

    <div class="slider-description">Яркость</div>
    <div class="slider">
      <input
        v-model="hsla.lightness"
        type="range"
        class="slider-input"
        id="lightness"
        min="0"
        max="100" />
      <label class="slider-label" for="lightness">{{ hsla.lightness }}</label>
    </div>

    <div class="slider-description">Прозрачность</div>
    <div class="slider">
      <input
        v-model="hsla.alpha"
        type="range"
        class="slider-input"
        id="alpha"
        min="0"
        max="1"
        step="0.01" />
      <label class="slider-label" for="alpha">{{ hsla.alpha }}</label>
    </div>
  </div>
</template>

<style scoped>
.slider-description {
  text-align: left;
}

.slider-container {
  width: 380px;
  /* background-color: grey; */
  background-color: v-bind(color);
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

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
  alpha: Number,
  flag: false
})

const color = computed(
  () =>
    `hsla(${hsla.hue}, ${hsla.saturation}%, ${hsla.lightness}%, ${hsla.alpha})`
)

watch(color, newValue => (store.colors[props.property][props.num] = newValue))

const getNumbersFromString = function (str) {
  return str.match(/[0-9]+/g)
}

const toggleSlider = function () {
  hsla.flag = !hsla.flag
}

onMounted(() => {
  const colorNum = getNumbersFromString(store.colors[props.property][props.num])
  let i = 0
  for (const propertyName in hsla) {
    hsla[propertyName] = colorNum[i]
    ;[propertyName].value = colorNum[i]
    i++
  }
})
</script>

<template>
  <div class="slider-container">
    <div class="slider-title-container">
      <div class="slider-title">{{ props.title }}</div>
      <div @click="toggleSlider" class="slider-sample"></div>
    </div>

    <transition-group name="hide">
      <div v-if="hsla.flag">
        <div class="slider-description">Оттенок</div>
        <div class="slider">
          <input
            v-model="hsla.hue"
            type="range"
            class="slider-input"
            id="hue"
            min="0"
            max="360"
            key="2" />
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
          <label class="slider-label" for="saturation">{{
            hsla.saturation
          }}</label>
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
          <label class="slider-label" for="lightness">{{
            hsla.lightness
          }}</label>
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
    </transition-group>
  </div>
</template>

<style scoped>
.hide-enter-active,
.hide-leave-active {
  transition: all 0.25s linear;
}

.hide-enter-to,
.hide-leave-from {
  max-height: 290px;
  opacity: 1;
}

.hide-enter-from,
.hide-leave-to {
  max-height: 29px;
  opacity: 0;
}

.slider-container {
  width: 385px;
  /* background-color: grey; */
  margin-top: 10px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 2px;
  overflow: hidden;
}

.slider-title-container {
  display: flex;
  justify-content: flex-start;
}

.slider-title {
  text-align: left;
  vertical-align: center;
  height: 29px;
  margin-bottom: 10px;
  /* background-color: red; */
}

.slider-sample {
  margin-left: 20px;
  width: 30px;
  height: 29px;
  border-radius: 50%;
  border: 1px solid hsl(0, 0%, 78%);
  background-color: v-bind(color);
}

.slider-description {
  text-align: left;
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

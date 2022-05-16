<script setup>
import { onMounted, reactive, computed, watch } from 'vue'
import store from '../services/store'

const props = defineProps({
  title: String
  // property: String,
  // num: String
})

// const hsla = reactive({
//   hue: Number,
//   saturation: Number,
//   lightness: Number,
//   alpha: Number,
//   flag: false
// })

const hue = computed(() => hsla.hue)

// const color = computed(
//   () =>
//     `hsla(${hsla.hue}, ${hsla.saturation}%, ${hsla.lightness}%, ${hsla.alpha})`
// )

// watch(color, newValue => (store.colors[props.property][props.num] = newValue))

// const getNumbersFromString = function (str) {
//   return str.match(/[0-9.]+/g)
// }

// const toggleSlider = () => (hsla.flag = !hsla.flag)

// const border = computed(() => {
//   if (hsla.flag) {
//     return '1px solid hsl(0, 0%, 78%)'
//   } else {
//     return '1px solid transparent'
//   }
// })

onMounted(() => {
  // const colorsArr = getNumbersFromString(
  //   store.colors[props.property][props.num]
  // )
  // hsla.hue = colorsArr[0]
  // hsla.saturation = colorsArr[1]
  // hsla.lightness = colorsArr[2]
  // hsla.alpha = colorsArr[3]
})
</script>

<template>
  <div class="slider-container">
    <div class="slider-title-container">
      <div class="slider-title">d</div>
    </div>

    <div class="slider-description">тон</div>
    <div class="slider">
      <div class="slider-input-container">
        <input
          type="range"
          class="slider-input"
          id="slider"
          min="0"
          max="360" />
      </div>
      <label class="slider-label" for="slider">x</label>
    </div>
  </div>
</template>

<style scoped>
.slider-title-container {
  display: flex;
  /* height: 24px; */
  height: 100%;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 5px; */
  /* border-bottom: v-bind(border);
  padding-bottom: 5px; */
  padding: 1px 1px 1px 2px;
}

.slider-title-container:hover {
  background: hsl(40, 40%, 25%);
  border-radius: 7px;
}

.slider-title {
  /* text-align: left; */
  height: 29px;
}

.slider-description {
  height: 29px;
  text-align: left;
  margin-left: 4px;
}

.slider {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 29px;
  margin-left: 4px;
}

.slider-input-container {
  position: relative;
}

.slider-input {
  position: absolute;
  top: 0;
  left: 0;
  -webkit-appearance: none;
  width: 384px;
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

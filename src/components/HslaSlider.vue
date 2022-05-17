<script setup>
import { onMounted, reactive, computed, watch } from 'vue'
import store from '../services/store'

const props = defineProps({
  title: String,
  property: String
})

const hsla = reactive({
  hue: Number,
  saturation: Number,
  lightness: Number,
  alpha: Number,
  flag: false
})

const hue = computed(() => hsla.hue)
const saturation = computed(() => `${hsla.saturation}%`)
const lightness = computed(() => `${hsla.lightness}%`)
const alpha = computed(() => hsla.alpha)

const color = computed(
  () =>
    `hsla(${hsla.hue}, ${hsla.saturation}%, ${hsla.lightness}%, ${hsla.alpha})`
)

watch(color, newValue => {
  const paramsArr = props.property.split('.')
  store.storage[paramsArr[0]][paramsArr[1]] = newValue
})

const getNumbersFromString = function (str) {
  return str.match(/[0-9.]+/g)
}

const toggleSlider = () => (hsla.flag = !hsla.flag)

const border = computed(() => {
  if (hsla.flag) {
    return '1px solid hsl(0, 0%, 78%)'
  } else {
    return '1px solid transparent'
  }
})

onMounted(() => {
  const paramsArr = props.property.split('.')
  console.warn(paramsArr)
  const colorsArr = getNumbersFromString(
    store.storage[paramsArr[0]][paramsArr[1]]
  )
  hsla.hue = colorsArr[0]
  hsla.saturation = colorsArr[1]
  hsla.lightness = colorsArr[2]
  hsla.alpha = colorsArr[3]
})
</script>

<template>
  <div v-click-outside="() => (hsla.flag = false)" class="slider-container">
    <!-- <div class="slider-container"> -->
    <div @click="toggleSlider" class="slider-title-container">
      <div class="slider-title">{{ props.title }}</div>
      <div class="slider-sample"></div>
    </div>
    <div class="slider-line"></div>

    <transition-group name="hide-slider">
      <div v-if="hsla.flag">
        <div class="slider-description">тон</div>
        <div class="slider">
          <div class="slider-input-container">
            <input
              v-model="hsla.hue"
              type="range"
              class="slider-input"
              id="hue"
              min="0"
              max="360" />
            <div class="slider-chess-background"></div>
          </div>
          <label class="slider-label" for="hue">{{ hsla.hue }}</label>
        </div>

        <div class="slider-description">насыщенность</div>
        <div class="slider">
          <div class="slider-input-container">
            <input
              v-model="hsla.saturation"
              type="range"
              class="slider-input"
              id="saturation"
              min="0"
              max="100" />
            <div class="slider-chess-background"></div>
          </div>
          <label class="slider-label" for="saturation">{{
            hsla.saturation
          }}</label>
        </div>

        <div class="slider-description">светлота</div>
        <div class="slider">
          <div class="slider-input-container">
            <input
              v-model="hsla.lightness"
              type="range"
              class="slider-input"
              id="lightness"
              min="0"
              max="100" />
            <div class="slider-chess-background"></div>
          </div>
          <label class="slider-label" for="lightness">{{
            hsla.lightness
          }}</label>
        </div>

        <div class="slider-description">прозрачность</div>
        <div class="slider">
          <div class="slider-input-container">
            <input
              v-model="hsla.alpha"
              type="range"
              class="slider-input"
              id="alpha"
              min="0"
              max="1"
              step="0.01" />
            <div class="slider-chess-background"></div>
          </div>
          <label class="slider-label" for="alpha">{{ hsla.alpha }}</label>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.hide-slider-enter-active,
.hide-slider-leave-active {
  transition: all 0.25s linear;
}

.hide-slider-enter-to,
.hide-slider-leave-from {
  max-height: 290px;
  opacity: 1;
}

.hide-slider-enter-from,
.hide-slider-leave-to {
  max-height: 29px;
  opacity: 0;
}

.slider-container {
  width: 438px;
  border: v-bind(border);
  border-radius: 7px;
  padding: 5px 5px 5px 6px;
  overflow: hidden;
}

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

.slider-sample {
  /* margin-left: 20px; */
  width: 33px;
  height: 33px;
  border: 1px solid hsl(0, 0%, 83%);
  border-radius: 7px;
  background-color: v-bind(color);
}

.slider-line {
  width: 433px;
  margin-left: 4px;
  margin-top: 5px;
  /* border-bottom: 1px solid hsl(0, 0%, 78%); */
  border-bottom: v-bind(border);
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

.slider-chess-background {
  width: 384px;
  height: 18px;
  background: no-repeat url('/src/images/icons/chess-board.svg');
  border-radius: 5px;
  z-index: -1;
}

#hue {
  /* background-color: hsla(0, v-bind(saturation), 50%); */
  background: linear-gradient(
    to right,
    hsla(0, 100%, 50%, 1),
    hsla(30, 100%, 50%, 1),
    hsla(60, 100%, 50%, 1),
    hsla(90, 100%, 50%, 1),
    hsla(120, 100%, 50%, 1),
    hsla(150, 100%, 50%, 1),
    hsla(180, 100%, 50%, 1),
    hsla(210, 100%, 50%, 1),
    hsla(240, 100%, 50%, 1),
    hsla(270, 100%, 50%, 1),
    hsla(300, 100%, 50%, 1),
    hsla(330, 100%, 50%, 1),
    hsla(360, 100%, 50%, 1)
  );
}

#saturation {
  background: linear-gradient(
    to right,
    hsla(v-bind(hue), 0%, v-bind(lightness), v-bind(alpha)),
    hsla(v-bind(hue), 10%, v-bind(lightness), v-bind(alpha)),
    hsla(v-bind(hue), 20%, v-bind(lightness), v-bind(alpha)),
    hsla(v-bind(hue), 30%, v-bind(lightness), v-bind(alpha)),
    hsla(v-bind(hue), 40%, v-bind(lightness), v-bind(alpha)),
    hsla(v-bind(hue), 50%, v-bind(lightness), v-bind(alpha)),
    hsla(v-bind(hue), 60%, v-bind(lightness), v-bind(alpha)),
    hsla(v-bind(hue), 70%, v-bind(lightness), v-bind(alpha)),
    hsla(v-bind(hue), 80%, v-bind(lightness), v-bind(alpha)),
    hsla(v-bind(hue), 90%, v-bind(lightness), v-bind(alpha)),
    hsla(v-bind(hue), 100%, v-bind(lightness), v-bind(alpha))
  );
}

#lightness {
  background: linear-gradient(
    to right,
    hsla(v-bind(hue), v-bind(saturation), 0%, v-bind(alpha)),
    hsla(v-bind(hue), v-bind(saturation), 10%, v-bind(alpha)),
    hsla(v-bind(hue), v-bind(saturation), 20%, v-bind(alpha)),
    hsla(v-bind(hue), v-bind(saturation), 30%, v-bind(alpha)),
    hsla(v-bind(hue), v-bind(saturation), 40%, v-bind(alpha)),
    hsla(v-bind(hue), v-bind(saturation), 50%, v-bind(alpha)),
    hsla(v-bind(hue), v-bind(saturation), 60%, v-bind(alpha)),
    hsla(v-bind(hue), v-bind(saturation), 70%, v-bind(alpha)),
    hsla(v-bind(hue), v-bind(saturation), 80%, v-bind(alpha)),
    hsla(v-bind(hue), v-bind(saturation), 90%, v-bind(alpha)),
    hsla(v-bind(hue), v-bind(saturation), 100%, v-bind(alpha))
  );
}

#alpha {
  background: linear-gradient(
    to right,
    hsla(v-bind(hue), v-bind(saturation), v-bind(lightness), 0%),
    hsla(v-bind(hue), v-bind(saturation), v-bind(lightness), 10%),
    hsla(v-bind(hue), v-bind(saturation), v-bind(lightness), 20%),
    hsla(v-bind(hue), v-bind(saturation), v-bind(lightness), 30%),
    hsla(v-bind(hue), v-bind(saturation), v-bind(lightness), 40%),
    hsla(v-bind(hue), v-bind(saturation), v-bind(lightness), 50%),
    hsla(v-bind(hue), v-bind(saturation), v-bind(lightness), 60%),
    hsla(v-bind(hue), v-bind(saturation), v-bind(lightness), 70%),
    hsla(v-bind(hue), v-bind(saturation), v-bind(lightness), 80%),
    hsla(v-bind(hue), v-bind(saturation), v-bind(lightness), 90%),
    hsla(v-bind(hue), v-bind(saturation), v-bind(lightness), 100%)
  );
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

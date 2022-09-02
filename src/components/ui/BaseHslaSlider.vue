<script setup>
import { computed, onMounted, reactive, watch } from 'vue'
import { storage } from '@/store/storage.js'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  obj: {
    type: String,
    required: true
  },
  prop: {
    type: String,
    required: true
  }
})

const hsla = reactive({
  hue: Number,
  saturation: Number,
  lightness: Number,
  alpha: Number,
  flag: false
})

const saturationBackground = computed(() => {
  let outcome = 'linear-gradient(to right'
  for (let i = 0; i < 110; i += 10) {
    outcome += `, hsla(${hsla.hue}, ${i}%, ${hsla.lightness}%, ${hsla.alpha})`
  }

  return outcome
})

const lightnessBackground = computed(() => {
  let outcome = 'linear-gradient(to right'
  for (let i = 0; i < 110; i += 10) {
    outcome += `, hsla(${hsla.hue}, ${hsla.saturation}%, ${i}%, ${hsla.alpha})`
  }

  return outcome
})

const alphaBackground = computed(() => {
  let outcome = 'linear-gradient(to right'
  for (let i = 0; i < 110; i += 10) {
    outcome += `, hsla(${hsla.hue}, ${hsla.saturation}%, ${hsla.lightness}%, ${i}%)`
  }

  return outcome
})

const backColor = computed(
  () =>
    `hsla(${hsla.hue}, ${hsla.saturation}%, ${hsla.lightness}%, ${hsla.alpha})`
)

watch(backColor, newValue => {
  storage[props.obj][props.prop] = newValue
})

const thumbBackColor = computed(() => `hsl(${hsla.hue}, 100%, 50%)`)

const borderColor = computed(() => {
  if (hsla.flag) {
    return '1px solid hsl(0, 0%, 78%)'
  } else {
    return '1px solid transparent'
  }
})

const getNumbersFromString = str => str.match(/[0-9.]+/g)

const toggleSlider = () => (hsla.flag = !hsla.flag)

const saveToStorage = function () {
  localStorage[props.obj] = JSON.stringify(storage[props.obj])
}

onMounted(() => {
  const colorsArr = getNumbersFromString(storage[props.obj][props.prop])
  hsla.hue = colorsArr[0]
  hsla.saturation = colorsArr[1]
  hsla.lightness = colorsArr[2]
  hsla.alpha = colorsArr[3]
})
</script>

<template>
  <div v-click-outside="() => (hsla.flag = false)" class="hsla-slider">
    <div @click="toggleSlider" class="hsla-slider__title-container">
      <div class="hsla-slider__title">{{ props.title }}</div>
      <div class="hsla-slider__sample"></div>
    </div>
    <div class="hsla-slider__line"></div>

    <TransitionGroup name="hsla-slider">
      <div v-if="hsla.flag">
        <div class="hsla-slider__value-description">тон</div>
        <div class="hsla-slider__container">
          <div class="hsla-slider__input-container">
            <input
              v-model="hsla.hue"
              type="range"
              id="hue"
              class="hsla-slider__input"
              min="0"
              max="360"
              @mouseup="saveToStorage" />
            <div class="hsla-slider__chess-background"></div>
          </div>
          <label class="hsla-slider__slider-label" for="hue">{{
            hsla.hue
          }}</label>
        </div>

        <div class="hsla-slider__value-description">насыщенность</div>
        <div class="hsla-slider__container">
          <div class="hsla-slider__input-container">
            <input
              v-model="hsla.saturation"
              type="range"
              id="saturation"
              class="hsla-slider__input"
              min="0"
              max="100"
              @mouseup="saveToStorage" />
            <div class="hsla-slider__chess-background"></div>
          </div>
          <label class="hsla-slider__slider-label" for="saturation">{{
            hsla.saturation
          }}</label>
        </div>

        <div class="hsla-slider__value-description">светлота</div>
        <div class="hsla-slider__container">
          <div class="hsla-slider__input-container">
            <input
              v-model="hsla.lightness"
              type="range"
              id="lightness"
              class="hsla-slider__input"
              min="0"
              max="100"
              @mouseup="saveToStorage" />
            <div class="hsla-slider__chess-background"></div>
          </div>
          <label class="hsla-slider__slider-label" for="lightness">{{
            hsla.lightness
          }}</label>
        </div>

        <div class="hsla-slider__value-description">прозрачность</div>
        <div class="hsla-slider__container">
          <div class="hsla-slider__input-container">
            <input
              v-model="hsla.alpha"
              type="range"
              id="alpha"
              class="hsla-slider__input"
              min="0"
              max="1"
              step="0.01"
              @mouseup="saveToStorage" />
            <div class="hsla-slider__chess-background"></div>
          </div>
          <label class="hsla-slider__slider-label" for="alpha">{{
            hsla.alpha
          }}</label>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss">
/* групповое правило перехода hsla-slider */
.hsla-slider {
  &-enter-active,
  &-leave-active {
    transition: all 0.25s linear;
  }

  &-enter-to,
  &-leave-from {
    max-height: 290px;
    opacity: 1;
  }

  &-enter-from,
  &-leave-to {
    max-height: 29px;
    opacity: 0;
  }
}

/* прочие правила */
.hsla-slider {
  width: 438px;
  padding: 5px 5px 5px 6px;
  border: v-bind(borderColor);
  border-radius: 7px;
  overflow: hidden;

  &__title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 1px 1px 1px 2px;
    cursor: pointer;
  }

  &__title-container:hover {
    background: hsl(120, 20%, 25%);
    border-radius: 7px;
  }

  &__title {
    height: 29px;
  }

  &__sample {
    width: 33px;
    height: 33px;
    border: 1px solid hsl(0, 0%, 83%);
    border-radius: 7px;
    background-color: v-bind(backColor);
  }

  &__line {
    width: 433px;
    margin-top: 5px;
    margin-left: 4px;
    border-bottom: v-bind(borderColor);
  }

  &__value-description {
    height: 29px;
    margin-left: 4px;
    text-align: left;
  }

  &__container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 29px;
    margin-left: 4px;
  }

  &__input-container {
    position: relative;
  }

  &__input {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-appearance: none;
    width: 384px;
    height: 18px;
    background: hsl(0, 0%, 83%);
    border-radius: 5px;
    outline: none;
    cursor: pointer;
  }

  &__chess-background {
    z-index: -1;
    width: 384px;
    height: 18px;
    background: no-repeat url('/src/assets/backgrounds/chess-board.svg');
    border-radius: 5px;
  }

  &__input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 25px;
    background-color: v-bind(thumbBackColor);
    border-radius: 5px;
    filter: invert(1);
    cursor: pointer;
  }

  &__input::-moz-range-thumb {
    width: 15px;
    height: 25px;
    background-color: v-bind(thumbBackColor);
    border-radius: 5px;
    filter: invert(1);
    cursor: pointer;
  }

  &__slider-label {
    width: 45px;
    margin-left: 5px;
    color: hsl(0, 0%, 83%);
  }
}

#hue {
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
  background: v-bind(saturationBackground);
}

#lightness {
  background: v-bind(lightnessBackground);
}

#alpha {
  background: v-bind(alphaBackground);
}
</style>

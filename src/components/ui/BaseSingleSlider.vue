<script setup>
import { computed } from '@vue/reactivity'
import { storage } from '@/store/storage.js'
import click from '@/assets/sounds/click.mp3'
import { playAudio } from '@/services/helpers.js'

const props = defineProps({
  obj: {
    type: String,
    required: true
  },
  prop: {
    type: String,
    required: true
  },
  max: {
    type: String,
    required: true
  },
  step: {
    type: String,
    required: true
  },
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
  if (storage.main.speaker) playAudio(click, storage.main.volume)
}
</script>

<template>
  <div class="single-slider__container">
    <div class="single-slider">
      <input
        v-model="storage[props.obj][props.prop]"
        @mouseup="mouseUp"
        type="range"
        class="single-slider__input"
        min="0"
        :max="props.max"
        :step="props.step"
        :disabled="props.disabled" />

      <label class="single-slider__label">{{
        storage[props.obj][props.prop]
      }}</label>
    </div>
  </div>
</template>

<style lang="scss">
.single-slider {
  &__container {
    opacity: v-bind(opacity);
  }

  & {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 29px;
  }

  &__input {
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

  &__input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 25px;
    background: hsl(120, 100%, 35%);
    border-radius: 5px;
    cursor: v-bind(cursor);
  }

  &__input::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: hsl(120, 100%, 35%);
    border-radius: 50%;
    cursor: v-bind(cursor);
  }

  &__label {
    width: 45px;
    margin-left: 5px;
    color: hsl(0, 0%, 83%);
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }
}
</style>

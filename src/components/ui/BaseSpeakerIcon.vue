<script setup>
import { computed } from '@vue/reactivity'
import { storage } from '@/store/storage.js'
import click from '@/assets/sounds/click.mp3'
import { playAudio } from '@/services/helpers.js'

const strokeColor = computed(() => {
  if (storage.main.speaker) {
    return 'green'
  } else {
    return 'black'
  }
})

function toggleSpeaker() {
  storage.main.speaker = !storage.main.speaker
  if (storage.main.speaker) playAudio(click, storage.main.volume)
  localStorage.main = JSON.stringify(storage.main)
}
</script>
<template>
  <div @click="toggleSpeaker" class="speaker__container">
    <svg width="44" height="44">
      <path
        stroke-width="2"
        d="M 1 14 L 13 14 L 25 2 L 25 42 L 13 30 L 1 30 Z"
        fill="none" />
      <path stroke-width="2" d="M 13 14 L 13 30" />
      <circle
        r="23"
        cx="18"
        cy="22"
        stroke-width="2px"
        stroke-dasharray="36.1283 108.3849"
        stroke-dashoffset="307.5"
        fill="none" />
      <circle
        r="16"
        cx="18"
        cy="22"
        stroke-width="2px"
        stroke-dasharray="25.1327 75.3982"
        stroke-dashoffset="12.5"
        fill="none" />
    </svg>
  </div>
</template>

<style>
.speaker__container {
  width: 44px;
  height: 44px;
  cursor: pointer;
}

svg {
  stroke: v-bind(strokeColor);
}
</style>

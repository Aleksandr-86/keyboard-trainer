<script setup>
import { computed } from '@vue/reactivity'
import store from '/src/services/store.js'

const strokeColor = computed(() => {
  if (store.storage.main.speaker) {
    return 'green'
  } else {
    return 'black'
  }
})

function toggleSpeaker() {
  store.storage.main.speaker = !store.storage.main.speaker
  localStorage.main = JSON.stringify(store.storage.main)
}
</script>
<template>
  <div @click="toggleSpeaker" class="speaker-container">
    <svg width="44" height="44">
      <path
        stroke-width="2"
        d="M1,14 L13,14 L25,2 L25,42 L13,30 L1,30 Z1,14"
        fill="none" />
      <path stroke-width="2" d="M13,14 L13,30" />
    </svg>
  </div>
</template>

<style scoped>
.speaker-container {
  position: fixed;
  width: 44px;
  height: 44px;
  /* background-color: aqua; */
}

svg {
  stroke: v-bind(strokeColor);
}
</style>

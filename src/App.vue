<script setup>
import { onMounted, computed } from 'vue'
import { arrBackgrounds } from '@/services/background-list.js'
import NavigationBar from '@/components/NavigationBar.vue'
import SettingsMenu from '@/components/SettingsMenu.vue'
import Field from '@/components/Field.vue'
import OverallStats from '@/components/OverallStats.vue'
import click from '@/assets/sounds/click.mp3'
import ring from '@/assets/sounds/ring.mp3'
import { data } from '@/store/data.js'
import { state } from '@/store/state.js'
import { storage } from '@/store/storage.js'

function getUrl(name) {
  return new URL(`/src/assets/backgrounds/normal/${name}.jpg`, import.meta.url)
    .href
}

const backgroundPath = computed(() => {
  return `url(${getUrl(arrBackgrounds[storage.main.background].name)})`
})

onMounted(() => {
  if (localStorage.main) {
    const obj = JSON.parse(localStorage.main)
    data.backgroundPreview = obj.background
  }

  // loading values from  local storage to the reactive object
  for (const key in storage) {
    if (localStorage[key]) {
      const obj = JSON.parse(localStorage[key])
      for (const property in obj) {
        storage[key][property] = obj[property]
      }
    }
  }
})
</script>

<template>
  <div class="app-background"></div>
  <audio :src="click" preload="auto"></audio>
  <audio :src="ring" preload="auto"></audio>

  <NavigationBar />
  <Transition name="move-x">
    <SettingsMenu v-if="state.settings" />
  </Transition>
  <Transition name="opacity">
    <Field v-if="state.work" />
  </Transition>
  <Transition name="opacity">
    <OverallStats v-if="state.overallStats" />
  </Transition>
</template>

<style>
/* transition */
.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.1s linear;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}

/* transition move-x */
.move-x-enter-active,
.move-x-leave-active {
  transition: transform 0.2s linear, opacity 0.2s linear;
}

.move-x-enter-from,
.move-x-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.move-x-enter-to,
.move-x-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

/* application */
* {
  margin: 0;
  padding: 0;
  /* box-sizing: border-box; */
}

html {
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.app-background {
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background: no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-image: v-bind(backgroundPath);
  -webkit-transition: background-image 0.5s linear;
  -moz-transition: background-image 0.5s linear;
  -o-transition: background-image 0.5s linear;
  transition: background-image 0.5s linear;
}
</style>
